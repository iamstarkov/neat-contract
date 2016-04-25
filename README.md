# neat-contract

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> yet another one contract library, data flow focused

## Install

    npm install --save neat-contract

## Usage

```js
import { neatContract, neatContractAsync } from 'neat-contract';

neatContract('unicorns'); // unicorns
neatContractAsync('unicorns')
  .then(result => console.log(result)); // unicorns
```

## API

### neatContract(input, [options])

### neatContractAsync(input, [options])

Return a promise that resolves to `result`.

#### input

*Required*  
Type: `String`

Lorem ipsum.

#### options

##### foo

Type: `Boolean`  
Default: `false`

Lorem ipsum.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/neat-contract
[npm-image]: https://img.shields.io/npm/v/neat-contract.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/neat-contract
[travis-image]: https://img.shields.io/travis/iamstarkov/neat-contract.svg?style=flat-square&label=unix

[appveyor-url]: https://ci.appveyor.com/project/iamstarkov/neat-contract
[appveyor-image]: https://img.shields.io/appveyor/ci/iamstarkov/neat-contract.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/iamstarkov/neat-contract
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/neat-contract.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/neat-contract
[depstat-image]: https://david-dm.org/iamstarkov/neat-contract.svg?style=flat-square
