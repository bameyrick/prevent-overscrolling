# prevent-overscrolling

Prevents scroll events from overflowing down to parent elements

[![GitHub release](https://img.shields.io/github/release/bameyrick/prevent-overscrolling.svg)](https://github.com/bameyrick/prevent-overscrolling/releases)
[![Build Status](https://travis-ci.com/bameyrick/prevent-overscrolling.svg?branch=master)](https://travis-ci.com/bameyrick/prevent-overscrolling)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b5c1d10ce6a04866bda5f6c96a7f5c02)](https://www.codacy.com/gh/bameyrick/prevent-overscrolling)

## Features

- Prevents overscrolling on touch devices
- Prevents overscrolling via mouse wheel
- Prevents overscrolling via scroll bar

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
