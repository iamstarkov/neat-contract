import R from 'ramda';

// String -> Constructor -> a -> String
const errorText = (name, ctor, param) => {
  const expected = R.type(ctor());
  const got = R.type(param);
  return `\`${name}\` should be an \`${expected}\`, but got \`${got}\`: ${param}`;
};

// contract :: String -> Constructor -> a -> a|throw new TypeError
const contract = R.curry((name, ctor, param) => R.unless(
  R.is(ctor),
  () => { throw new TypeError(errorText(name, ctor, param)); }
)(param));

export default contract;
