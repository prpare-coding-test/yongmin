/**
 * 보물
 *
 * 배열 A 와 B를 곱해서 가장 작은 수를 만드는 문제이다.
 * 두 수를 곱해서 가장 작은 수를 만들려면
 * 가장 큰수는 가장 작은 수와 곱하면 된다.
 * 끝.
 */

const [N, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

let A = input[0]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);
let B = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => b - a);

console.log(A.reduce((a, c, i) => a + c * B[i], 0));
