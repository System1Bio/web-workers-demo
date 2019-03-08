export function makeBigArray() {
  const start = Date.now();

  const NUM_ELEMENTS = 50000000;
  const arr = new Array(NUM_ELEMENTS);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i;
  }

  console.log(
    'Took',
    (Date.now() - start) / 1000,
    'seconds to make the big array.',
  );

  return arr;
}
