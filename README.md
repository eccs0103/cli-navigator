# cli-navigator

A chainable scene-navigation system for Node.js CLI apps. Wraps [`@clack/prompts`](https://github.com/bombshell-dev/clack) with a `Navigator → Frame → Menu → Transition` routing model that supports history-based back navigation and a clean continue/cancel handler pattern.

[Change log](./CHANGELOG.md)

## Install

```
npm install cli-navigator
```

## Quick start

```typescript
import "adaptive-extender/node";
import { Navigator, SingleSelectionMenu, Transition } from "cli-navigator";

const menu = new SingleSelectionMenu<string>();
menu.title = "Choose";
menu.atCase("Option A", "a");
menu.atCase("Option B", "b");
menu.onContinue((value) => {
    console.log(`Chose: ${value}`);
    return Transition.success("Done");
});

const navigator = new Navigator();
await navigator.launch("My App", menu);
```

## Navigator

Drives the scene loop. Owns a `History` of `Frame`s and runs them one at a time.

```typescript
const navigator = new Navigator();               // generic non-TTY notice
const navigator = new Navigator({ notice: "Run 'myapp config' in a terminal." }); // custom notice
await navigator.launch("App title", rootMenu);
```

### NavigatorOptions

| Field    | Type     | Default                                            | Description                                           |
| -------- | -------- | -------------------------------------------------- | ----------------------------------------------------- |
| `notice` | `string` | `"This command requires an interactive terminal."` | Message written to stderr when `stdout` is not a TTY. |

## Transition

Returned by menu `onContinue` / `onCancel` handlers to control what happens next.

| Factory                     | Effect                                     |
| --------------------------- | ------------------------------------------ |
| `Transition.reload`         | Stay on the current frame (re-render).     |
| `Transition.back`           | Go back one step in history.               |
| `Transition.to(menu, ctx?)` | Navigate forward to a new frame.           |
| `Transition.success(msg)`   | Terminate with an `outro` success message. |
| `Transition.fail(msg)`      | Terminate with a `cancel` failure message. |

## Menu

Abstract base class. Subclass to create custom menus, or use the four built-in concrete types below.

```typescript
menu.title = "Section title";
menu.onContinue((value, context) => Transition.to(nextMenu, context));
menu.onCancel(() => Transition.back);
```

### SingleSelectionMenu\<V, C\>

Renders a single-choice select prompt.

```typescript
const menu = new SingleSelectionMenu<string>();
menu.atCase("Label", "value");
menu.initial = "value";   // pre-select an option
```

### MultiSelectionMenu\<V, C\>

Renders a multi-choice select prompt.

```typescript
const menu = new MultiSelectionMenu<string>();
menu.atCase("Label", "value", true);  // third arg = initially selected
```

### InputNumberMenu\<C\>

Renders a text prompt validated as an integer in a range.

```typescript
const menu = new InputNumberMenu();
menu.title = "Enter a percentage";
menu.value = 50;      // default value shown in the prompt
menu.minimum = 1;
menu.maximum = 99;
menu.exclusive = false; // set true to exclude the upper bound
```

### InputCharacterMenu\<C\>

Renders a text prompt validated as exactly one character.

```typescript
const menu = new InputCharacterMenu();
menu.title = "Filled character";
menu.value = "█";
```
