/**
 * 숨바꼭질
 */

const [n, k] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const find = (x) => {
  if (x <= n) return n - x;
  if (x === 1) return n + 1;
  return x & 1
    ? Math.min(find(x - 1), find(x + 1)) + 1
    : Math.min(1 + find(x >> 1), x - n);
};

console.log(find(+k));