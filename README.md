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

```js
import contract from 'neat-contract';

contract('input', String, 'unicorns'); // 'unicorns'
contract('input', String, 2); // new TypeError('`input` should be an `String`, but got `Number`: 2')

// curried
contract('input', String)('unicorns'); // 'unicorns'
contract('input', String)(2); // new TypeError('`input` should be an `String`, but got `Number`: 2')
```

Useful in unary data-flow functions:

```js
import R from 'ramda';
import contract from 'neat-contract';


// sync data flow
const prefixEslintPlugin = R.pipe(
  contract('pluginName', String),
  R.concat('eslint-plugin-')
);

prefixEslintPlugin('import'); // 'eslint-plugin-import'
prefixEslintPlugin(true);  // new TypeError('`pluginName` should be an `String`, but got `Boolean`: true')
prefixEslintPlugin(/reg/); // new TypeError('`pluginName` should be an `String`, but got `Number`: /reg/')


// async data flow
const resolve = Promise.resolve.bind(Promise);
const prefixEslintPluginAsync = R.pipeP(resolve,
  contract('pluginName', String),
  R.concat('eslint-plugin-')
);

const log = result => console.log(result);
const err = result => console.error(result);
prefixEslintPluginAsync('import').then(log); // 'eslint-plugin-import'
prefixEslintPluginAsync(true).catch(err);  // new TypeError('`pluginName` should be an `String`, but got `Boolean`: true')
prefixEslintPluginAsync(/reg/).catch(err); // new TypeError('`pluginName` should be an `String`, but got `Number`: /reg/')
```

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
