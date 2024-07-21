/**
 * 숨바꼭질
 * 
 * 모든 경우의 수를 봐야 하는 문제이다.
 * 곱하기 2, +1, -1 의 경우의 수를 전계해 나가고
 * k 를 찾을 때 까지 반복해야 한다.
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