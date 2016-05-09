import test from 'ava';
import contract from './index';

test('basic', t => {
  t.is(contract('input', String, 'unicorns'), 'unicorns');
  t.throws(() => { contract('input', String, 2); }, TypeError);
  t.throws(
    () => { contract('input', String, 2); },
    '`input` should be an `String`, but got `Number`: 2'
  );
});

test('several types', t => {
  t.is(contract('input', [String, Array], 'unicorns'), 'unicorns');
  t.is(contract('input', [String, Array], ['unicorns'])[0], 'unicorns');
  t.throws(() => { contract('input', [String, Array], 2); }, TypeError);
  t.throws(
    () => { contract('input', [String, Array], 2); },
    '`input` should be an `String|Array`, but got `Number`: 2'
  );
});
