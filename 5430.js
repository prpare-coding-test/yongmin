/**
 * AC
 *
 * 문제의 키포인트는 'R'이다. 'R'을 만났다고 배열 자체를 뒤집어 버리면 시간초과가 나버린다.
 * 그래서 flag 값을 두고 R을 만났을 때 뒤에 요소를 제거하거나 앞에 요소를 제거하면
 * 해결할 수 있다.
 */

let [T, ...input] = require('fs').readFileSync(0).toString().trim().split('\n');
let answer = [];
while (T--) {
  let command = input.shift();
  let N = +input.shift();
  let arr = input.shift().slice(1, -1).split(',').map(Number);
  if (!N) arr = [];
  let flag = false; // false 정방향, true 역방향
  let error = false;
  for (let c of command) {
    if (c === 'R') {
      flag = !flag;
    } else {
      if (!N) {
        answer.push('error');
        error = true;
        break;
      }
      flag ? arr.pop() : arr.shift();
      N--;
    }
  }
  if (!error) answer.push(flag ? `[${arr.reverse()}]` : `[${arr}]`);
}

console.log(answer.join('\n'));
