<div align='center'>

<img src='./logo.png' width='500px'/>

A tiny 📦 , fast 🚀 shuffle of javascript implement for array or string.

![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![license](https://badgen.net/github/license/ZxBing0066/zlib)
![mini zipped size](https://img.shields.io/bundlephobia/minzip/@zlib/shuffle)
![dependents](https://badgen.net/npm/dependents/@zlib/shuffle)
![coverage](https://badgen.net/badge/coverage/100%25/green)
![tree-shaking support](https://badgen.net/bundlephobia/tree-shaking/@zlib/shuffle)
[![npm version](https://badgen.net/npm/v/@zlib/shuffle)](https://www.npmjs.com/package/@zlib/shuffle)

</div>

<hr/>

<div align='right'>

[English / [中文](README.zh-cn.md)]

</div>

## ✨ Features

-   🚀 Run fast
-   🌕 Support array or string
-   📦 Tiny and tree shaking support
-   🌎 Support web, Node and service worker with esm, cjs amd umd

## 🎬 Quick Start

### Install

```js
npm i @zlib/shuffle
```

### Usage

```ts
import shuffle from '@zlib/shuffle';

console.log(shuffle(new Array(10).fill(null).map((v, i) => i)));
```

## 🎨 Options

### Interface

```ts
declare function shuffle(
    target: string,
    option?: {
        fix?: true;
    }
): string;
declare function shuffle<T = any>(
    target: T[],
    option?: {
        pure?: boolean;
    }
): T[];
```

### Option

#### fix for string shuffle

For string shuffle, use `fix` to fix split for some special unicode char like `📦 🚀 `.

But if your string have some more special char like `👩🏾‍🔧`, you should use some lib to transform the string to an array
before shuffle.

#### pure for array shuffle

By default, shuffle will clone an array for do shuffle, but if you wan't this, just set `pure` to `false`.

## 📊 Distribution

This is a chart about do shuffle 10000 times for an array from 0 ～ 19. The x axis means the element in the array, the y
axis means how much times the number appear to the index.

All elements's times that appear to each index are around 500 (10000/20), which means they are even distribution.

![distribution-chart](./shuffle-distribution-chart.png)
