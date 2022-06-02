export const calculateSum = (arr, bun) => {
  let sum = 0;
  arr.forEach(element => {
    sum = sum + element.price
  });
  if (!bun) {
    return sum;
  } else {
    sum = bun.price * 2 + sum;
  }
  return sum;
}