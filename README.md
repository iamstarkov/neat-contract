# neat-contract

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> yet another one contract library, data flow focused

If contract is satisfied, returns value, otherwise, throwing `TypeError` exception.
Well suited for promises as well.

## Install

    npm install --save neat-contract

## Usage

* [Basic](#basic)
* [Data-flow](#data-flow)
  * [Sync data-flow](#sync-data-flow)
  * [Async data-flow](#async-data-flow)
  * [Arrays in data-flow](#arrays-in-data-flow)

### Basic

```js
import contract from 'neat-contract';

contract('input', String, 'unicorns'); // 'unicorns'
contract('input', String, 2); // new TypeError('`input` should be an `String`, but got `Number`: 2')

// several types
contract('input', [String, Array], 'unicorns'); // 'unicorns'
contract('input', [String, Array], ['unicorns']); // ['unicorns']
contract('input', [String, Array], 2); // new TypeError('`input` should be an `String|Array`, but got `Number`: 2')

// curried
contract('input', String)('unicorns'); // 'unicorns'
contract('input', String)(2); // new TypeError('`input` should be an `String`, but got `Number`: 2')

// contracting array
contract(input, Array, ['unicorns', 'cats']); // ['unicorns', 'cats']
contract(input, Array, 2); // new TypeError('`input` should be an `Array`, but got `Number`: 2')
['unicorns', 'cats'].forEach(contract('input[item]', String)); // ['unicorns', 'cats']
['unicorns', 2].forEach(contract('input[item]', String)); // new TypeError('`input[item]` should be an `String`, but got `Number`: 2')
```

### Data-flow

#### Sync data-flow

```js
import R from 'ramda';
import contract from 'neat-contract';

// sync data flow
const prefixEslintPlugin = R.pipe(
  contract('pluginName', String), // contracting
  R.concat('eslint-plugin-')
);

prefixEslintPlugin('import'); // 'eslint-plugin-import'
prefixEslintPlugin(true);  // new TypeError('`pluginName` should be an `String`, but got `Boolean`: true')
prefixEslintPlugin(/reg/); // new TypeError('`pluginName` should be an `String`, but got `RegExp`: /reg/')
```

#### Async data-flow

```js
import R from 'ramda';
import contract from 'neat-contract';

// helpers
const toPromise = Promise.resolve.bind(Promise);
const _log = console.log.bind(console);
const _throw = err => { throw err; };

// async data flow
const prefixEslintPluginAsync = R.pipeP(toPromise,
  contract('pluginName', String), // contracting
  R.concat('eslint-plugin-')
);

prefixEslintPluginAsync('import').then(_log); // 'eslint-plugin-import'
prefixEslintPluginAsync(true).catch(_throw);  // new TypeError('`pluginName` should be an `String`, but got `Boolean`: true')
prefixEslintPluginAsync(/reg/).catch(_throw); // new TypeError('`pluginName` should be an `String`, but got `RegExp`: /reg/')
```

#### Arrays in data-flow

```js
import R from 'ramda';
import contract from 'neat-contract';

// contracting array
const prefixArrayOfEslintPlugins = R.pipe(
  R.pipe( // contracting in 2 steps
    contract('plugins', Array), // array itself
    R.map(contract('plugins[item]', String)) // each item of array
  ),
  R.map(R.concat('eslint-plugin-'))
);

prefixArrayOfEslintPlugins(['import', 'export']); // ['eslint-plugin-import', 'eslint-plugin-export']
prefixArrayOfEslintPlugins(2); // throw new TypeError('`plugins` should be an `Array`, but got `Number`: 2')
prefixArrayOfEslintPlugins(['unicorns', 2]); // throw new TypeError('`plugins[item]` should be an `String`, but got `Number`: 2')
```

Contracting arrays in asynchronous functions goes, the same way as in [async example from above](#async-data-flow).

## API

### contract(name, ctor, param)

    // contract :: String -> Constructor -> a -> a|throw new TypeError

#### name

*Required*  
Type: `String`

Parameter name.

#### ctor

*Required*  
Type: `Constructor`  
Example: `String`, `Number` or `Function`

Parameter Constructor for type check

#### param

*Required*  
Type: any  

Actual parameter itself to type check with `Constructor`.

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
