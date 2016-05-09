import R from 'ramda';

// throwTypeError :: String -> fn throw new TypeError
const throwTypeError = msg => { throw new TypeError(msg); };

// expected :: Constructor|[Constructor] -> String
const expected = R.pipe(
  R.unless(R.is(Array), R.of),
  R.map(R.pipe(R.call, R.type)),
  R.join('|')
);

// isAnyOfCtors :: Constructor|[Constructor] -> (fn -> a -> Boolean)
const isAnyOfCtors = R.pipe(
  R.unless(R.is(Array), R.of),
  R.map(R.is),
  R.anyPass
);

// text :: String -> Constructor|[Constructor] -> a -> String
const text = (name, ctors, param) =>
  `\`${name}\` should be an \`${expected(ctors)}\`, but got \`${R.type(param)}\`: ${param}`;

// contract :: String -> Constructor|[Constructor] -> a -> a|throw new TypeError
const contract = R.curry((name, ctors, param) => R.unless(
  isAnyOfCtors(ctors),
  () => throwTypeError(text(name, ctors, param))
)(param));

export default contract;
