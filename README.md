# three-point

[![Travis](https://img.shields.io/travis/angusfretwell/three-point.svg)](https://travis-ci.org/angusfretwell/three-point)
[![Code Climate](https://img.shields.io/codeclimate/github/angusfretwell/three-point.svg)](https://codeclimate.com/github/angusfretwell/three-point)
[![Codecov](https://img.shields.io/codecov/c/github/angusfretwell/three-point.svg)](https://codecov.io/github/angusfretwell/three-point)
[![NPM Version](http://img.shields.io/npm/v/three-point.svg)](https://www.npmjs.org/package/three-point)
[![NPM Downloads](https://img.shields.io/npm/dm/three-point.svg)](https://www.npmjs.org/package/three-point)

## Install

```bash
$ npm install --save three-point
```

## Usage

```js
import ThreePoint from 'three-point';

const confidence = 0.90;

const items = [{
  optimistic: 4,
  pessimistic: 16,
  likely: 8,
}, {
  optimistic: 2,
  pessimistic: 3,
  likely: 2.5,
}];

const estimate = new ThreePoint(items, confidence);

console.log(estimate.expected); // 11
console.log(estimate.pessimistic); // 14
console.log(estimate.optimistic); // 7.9
```

## License

The MIT License (MIT)

Copyright (c) 2016 Angus Fretwell
