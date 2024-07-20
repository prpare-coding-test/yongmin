/**
 * 회에 있는 사람
 * 
 * map 을 활용해서 key : value 로 사람이 들어오고 나오고를 체크했다.
 * 들어왓다면 키값을 추가하고 나갔다면 키를 삭제했다.
 * 마지막에 남아있는 키값들을 내림차순으로 정렬하여 출력했다.
 */

const [N, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

let check = new Map();

for (let i = 0; i < N; i++) {
  [name, tag] = input[i].split(' ');
  tag === 'enter' ? check.set(name, 1) : check.delete(name);
}

console.log([...check.keys()].sort().reverse().join('\n'));
