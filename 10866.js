/**
 * 덱
 * 
 * js 는 array가 deque 이다.
 * 
 * 입력을 받고 각 커멘드에 맞는 행동을 해주면 된다.
 * 다른 언어와는 다르게 js 는 ' ' 공백으로 split을 하고 값을 대입해도
 * 컴파일 에러가 나지 않고 undefined 가 값에 할당 되어 편하게 문제를 해결했다.
 * 
 * 시간초과로 인해 2번 틀렸다. 
 * 1. deque가 비어있는지 그때그대 length 를 구해주고 판별했다.
 * 2. 출력을 그때그때 했다.
 * 
 * 두가지를 수정하지 해결되었다. 입출력에 대한 오버헤드가 크긴큰가보다.
 */

const [N, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

let deque = [];
let answer = [];
let l = 0;
for (let i = 0; i < N; i++) {
  [command, cnt] = input[i].split(' ');
  switch (command) {
    case 'push_front':
      deque.unshift(+cnt);
      l++;
      break;
    case 'push_back':
      deque.push(+cnt);
      l++;
      break;
    case 'pop_front':
      answer.push(l ? deque.shift() : -1);
      l--;
      l = l < 0 ? 0 : l;
      break;
    case 'pop_back':
      answer.push(l ? deque.pop() : -1);
      l--;
      l = l < 0 ? 0 : l;
      break;
    case 'size':
      answer.push(l);
      break;
    case 'empty':
      answer.push(l ? 0 : 1);
      break;
    case 'front':
      answer.push(l ? deque[0] : -1);
      break;
    case 'back':
      answer.push(l ? deque[l - 1] : -1);
      break;
  }
}
console.log(answer.join('\n'));
