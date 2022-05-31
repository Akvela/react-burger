export const calculateSum = (arr, bun) => {
  let sum = 0;
  if (!arr || !bun) {
    return sum = 0;
  }
  arr.forEach(element => {
    sum = sum + element.price
  });
  sum = bun.price * 2 + sum;
  return sum;
}