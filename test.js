import test from 'ava';
import R from 'ramda';
import contract from './index';

test('basic', t => t.is(
  contract('input', String, 'unicorns'),
  'unicorns'
));

test('curried', t => t.is(
  contract('input', String)('unicorns'),
  'unicorns'
));

test('throws', t => t.throws(() => { contract('input', String, 2); }, TypeError));

// sync data flow
const prefixEslintPlugin = R.pipe(
  contract('pluginName', String),
  R.concat('eslint-plugin-')
);

test('pipe', t => t.is(
  prefixEslintPlugin('import'),
  'eslint-plugin-import'
));
test('pipe throws', t => t.throws(() => { prefixEslintPlugin(2); }, TypeError));

// async data flow
const resolve = Promise.resolve.bind(Promise);
const prefixEslintPluginAsync = R.pipeP(resolve,
  contract('pluginName', String),
  R.concat('eslint-plugin-')
);

test('pipe async', async t => t.is(
  await prefixEslintPluginAsync('import'),
  'eslint-plugin-import'
));

test('pipe async rejects', t => t.throws(prefixEslintPluginAsync(2), TypeError));
