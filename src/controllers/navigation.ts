"use strict";

import "adaptive-extender/node";
import { type Menu } from "../models/menu.js";
import { Frame } from "../models/frame.js";
import { History } from "../models/history.js";
import { type Router } from "../models/router.js";
import { Console } from "../services/console.js";

//#region Navigator
export interface NavigatorOptions {
	notice: string;
}

export class Navigator implements Router {
	#console: Console;
	#history: History<Frame<any, any>>;
	#running: boolean = false;

	constructor();
	constructor(options: Partial<NavigatorOptions>);
	constructor(options: Partial<NavigatorOptions> = {}) {
		const { notice } = options;

		if (notice === undefined) {
			this.#console = new Console();
			return;
		}

		this.#console = new Console(notice);
	}

	back(): void {
		this.#history.back();
	}

	goto(frame: Frame<any, any>): void {
		this.#history.insert(frame);
	}

	terminate(success: boolean, message: string): void {
		const console = this.#console;
		success ? console.outro(message) : console.cancel(message);
		this.#running = false;
	}

	async #build<V, C>(title: string, menu: Menu<V, C>, context: C): Promise<void> {
		const console = this.#console;
		console.intro(title);
		const history = this.#history = new History(new Frame(menu, context));
		this.#running = true;
		while (this.#running) {
			const current = history.current;
			const transition = await current.build(console);
			transition.apply(this);
		}
	}

	async launch<V>(title: string, menu: Menu<V, void>, context: void): Promise<void>;
	async launch<V, C>(title: string, menu: Menu<V, C>, context: C): Promise<void>;
	async launch<V, C>(title: string, menu: Menu<V, C>, context: C): Promise<void> {
		await this.#console.session(() => this.#build(title, menu, context));
	}
}
//#endregion
