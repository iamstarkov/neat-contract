import test from 'ava';
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
