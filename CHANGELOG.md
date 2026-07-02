## 0.1.0 (02.07.2026)
*First release.*
- Added `Navigator` — drives a history-backed scene loop: `launch(title, menu)` starts the session, `back()` / `goto(frame)` / `terminate(success, message)` control navigation.
- Added `NavigatorOptions` — optional `{ notice }` string passed to `new Navigator(options)` to override the non-TTY message shown when the terminal is not interactive (defaults to `"This command requires an interactive terminal."`).
- Added `Transition` — abstract base with `Transition.reload`, `Transition.back`, `Transition.success(message)`, `Transition.fail(message)`, and `Transition.to(menu, context)` factory.
- Added `NavigationTransition`, `TerminationTransition`, and `PathTransition` — concrete transition types returned by menu handlers.
- Added `Menu<V, C>` — abstract base; `onContinue(handler)` and `onCancel(handler)` install typed callbacks.
- Added `SingleSelectionMenu<V, C>` — renders a `@clack/prompts` select; `atCase(label, value)` and `initial` setter.
- Added `MultiSelectionMenu<V, C>` — renders a `@clack/prompts` multiselect; `atCase(label, value, selected)`.
- Added `InputNumberMenu<C>` — text input validated as an integer in `[minimum, maximum]`; `exclusive` flag to exclude the upper bound.
- Added `InputCharacterMenu<C>` — text input validated as exactly one character.
- Added `Frame<V, C>` — pairs a `Menu` with its context; `build(console)` drives one step.
- Added `History<T>` — stack with forward/back cursor; `insert(item)` prunes forward history.
- Added `Console` — wraps `@clack/prompts` (`intro`, `outro`, `cancel`, `select`, `text`, `multiselect`, `isCancel`, `session`); `session(body)` guards for TTY and applies the Node.js #38663 raw-mode workaround on Windows.
- Added `ContinueHandler<V, C>` and `CancelHandler` — callback interfaces for menu event wiring.
- Added `Router` — interface implemented by `Navigator`; exposes `back()`, `goto(frame)`, `terminate(success, message)`.
