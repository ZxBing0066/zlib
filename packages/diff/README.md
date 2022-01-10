# @ZLIB/DIFF

A diff library for deep diff js/json object/array. With very fast diff speed (especially in array diff), tiny size (<
500b), 0 dependents, typescript support.

<center>

![ts](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![license](https://badgen.net/github/license/ZxBing0066/zlib)
![mini zipped size](https://img.shields.io/bundlephobia/minzip/@zlib/diff)
![dependents](https://badgen.net/npm/dependents/@zlib/diff)
![coverage](https://badgen.net/badge/coverage/100%25/green)
![tree-shaking support](https://badgen.net/bundlephobia/tree-shaking/@zlib/diff)
![npm version](https://badgen.net/npm/v/@zlib/diff)

</center>

## ✨ Features

-   🚀 Faster then other object diff libs, and the amazing array diff speed
-   🛡 Build with typescript, fully support types
-   🌐 Support all special type object deep diff
-   📦 Lightweight and tree shaking support
-   🌎 Support web, Node and workers

## 🎬 Quick start

1. Install

```sh
npm i @zlib/diff
```

2. Usage

Import the lib and call with your objects you want to do diff.

```js
import diff from '@zlib/diff';

console.log(diff({ foo: 'bar' }, { foo: 'bar', newKey: 'value' }));
```

## 🪞 Interface

Generic support.

```ts
interface Diff<T = any> {
    type: 'ADD' | 'REMOVE' | 'CHANGE';
    path: (string | number)[];
    old?: T;
    new?: T;
}
declare const diff: <T = any, TObj = Record<string, T> | T[]>(oldObj: TObj, newObj: TObj) => Diff<any>[];
```

## 🚀 Benchmark

-   With small object

| "name"                        | "ops"   | "margin" | "percentSlower" |
| ----------------------------- | ------- | -------- | --------------- |
| "diff"                        | 56562   | 0.56     | 98.88           |
| "deep-diff"                   | 433694  | 0.31     | 91.4            |
| "deep-object-diff"            | 1149395 | 0.35     | 77.2            |
| "jsdiff"                      | 57685   | 0.36     | 98.86           |
| "microdiff"                   | 4400020 | 0.4      | 12.73           |
| "microdiff-without-cyclesFix" | 4382206 | 0.39     | 13.08           |
| "zdiff"                       | 5041725 | 3.06     | 0               |

-   With big object

| "name"                        | "ops"     | "margin" | "percentSlower" |
| ----------------------------- | --------- | -------- | --------------- |
| "diff"                        | 0.09      | 2.27     | 100             |
| "deep-diff"                   | 3911.885  | 0.3      | 88.24           |
| "deep-object-diff"            | 35.305    | 0.31     | 99.89           |
| "jsdiff"                      | 0.089     | 0.53     | 100             |
| "microdiff"                   | 28992.708 | 0.51     | 12.82           |
| "microdiff-without-cyclesFix" | 29038.595 | 0.35     | 12.68           |
| "zdiff"                       | 33256.928 | 0.4      | 0               |

-   With big object(deep 4, property count 10)

| "name"                        | "ops"     | "margin" | "percentSlower" |
| ----------------------------- | --------- | -------- | --------------- |
| "diff"                        | 0.0201    | 1.32     | 100             |
| "deep-diff"                   | 364.4773  | 0.4      | 68.82           |
| "deep-object-diff"            | 360.8354  | 0.46     | 69.13           |
| "jsdiff"                      | 0.02      | 2.02     | 100             |
| "microdiff"                   | 902.0445  | 0.38     | 22.84           |
| "microdiff-without-cyclesFix" | 1021.0441 | 0.33     | 12.66           |
| "zdiff"                       | 1169.0366 | 0.33     | 0               |

-   With deeply nested object

| "name"                        | "ops"  | "margin" | "percentSlower" |
| ----------------------------- | ------ | -------- | --------------- |
| "diff"                        | 9192   | 0.35     | 99.03           |
| "deep-diff"                   | 163921 | 0.28     | 82.79           |
| "deep-object-diff"            | 330296 | 0.41     | 65.32           |
| "jsdiff"                      | 9050   | 0.32     | 99.05           |
| "microdiff"                   | 644867 | 0.35     | 32.3            |
| "microdiff-without-cyclesFix" | 817169 | 0.47     | 14.21           |
| "zdiff"                       | 952516 | 0.3      | 0               |

-   With simple array

| "name"                        | "ops"   | "margin" | "percentSlower" |
| ----------------------------- | ------- | -------- | --------------- |
| "diff"                        | 37656   | 0.37     | 98.71           |
| "deep-diff"                   | 337257  | 0.36     | 88.43           |
| "deep-object-diff"            | 278428  | 0.39     | 90.44           |
| "jsdiff"                      | 38266   | 0.28     | 98.69           |
| "microdiff"                   | 1610910 | 0.44     | 44.71           |
| "microdiff-without-cyclesFix" | 1585105 | 0.38     | 45.6            |
| "zdiff"                       | 2913708 | 0.37     | 0               |

-   With simple array(place short array as newObject)

| "name"                        | "ops"   | "margin" | "percentSlower" |
| ----------------------------- | ------- | -------- | --------------- |
| "diff"                        | 38656   | 0.31     | 98.54           |
| "deep-diff"                   | 340188  | 0.81     | 87.15           |
| "deep-object-diff"            | 289963  | 0.34     | 89.05           |
| "jsdiff"                      | 39385   | 0.93     | 98.51           |
| "microdiff"                   | 1784744 | 0.48     | 32.58           |
| "microdiff-without-cyclesFix" | 1786782 | 0.31     | 32.51           |
| "zdiff"                       | 2647332 | 0.37     | 0               |
