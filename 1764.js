/**
 * 듣보잡
 *
 * 듣도 못한 사람들과
 * 보도 못한 사람들이 주어지고
 *
 * 중복된 사람이 있으면 그 수와 사람을 출력하면 된다.
 * 듣도 못한 사람을 key로 저장하고
 * 보도 못한사람이 해당 key에 존재 하면 answer 에 추가해 주는 방식으로 해결했다.
 * 
 * 사전순으로 출력하라고 하는 것을 틀리고 나서야 봤다. 크크
 */

const [NM, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

const [N, M] = NM.split(' ').map(Number);

let answer = [];
let check = new Map();
for (let i = 0; i < N; i++) check.set(input[i], true);
for (let i = 0; i < M; i++) {
  if (check.has(input[i + N])) answer.push(input[i + N]);
}

answer.sort();
answer.unshift(answer.length);

console.log(answer.join('\n'));
