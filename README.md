# prevent-overscrolling
Prevents scroll events from overflowing down to parent elements

## Features

* Prevents overscrolling on touch devices
* Prevents overscrolling via mouse wheel
* Prevents overscrolling via scroll bar

## Install
You can install via npm or yarn.

### npm
```bash
npm install --save prevent-overscrolling
```

### yarn
```bash
yarn add prevent-overscrolling
```

## Usage

### Importing
You can import using ES6 imports.
```javascript
import { PreventOverScrolling, EnableOverScrolling } from 'prevent-overscrolling';
```
### Example
```javascript
const myScrollableElement = document.querySelector('.MyScrollableElement');

ReEnableOverScrolling(myScrollableElement);
```
