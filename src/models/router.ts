"use strict";

import { type Frame } from "./frame.js";

//#region Router
export interface Router {
	back(): void;
	goto(frame: Frame<any, any>): void;
	terminate(success: boolean, message: string): void;
}
//#endregion
