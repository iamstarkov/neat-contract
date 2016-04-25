import test from 'ava';
import { neatContract, neatContractAsync } from './index';

test('basic', t =>
  t.is(neatContract('unicorns'), 'unicorns'));

test('empty input', t => t.throws(() => { neatContract(); }, TypeError));
test('invalid input', t => t.throws(() => { neatContract(2); }, TypeError));

test('async :: basic', async t => t.is(
  await neatContractAsync('unicorns'),
  'unicorns'));

test('async :: empty input', t => t.throws(neatContractAsync(), TypeError));
test('async :: invalid input', t => t.throws(neatContractAsync(2), TypeError));
