/**
 * 트리 순회
 * 
 * 트리를 입력받아 전위, 중위, 후위 순회한 결과값을 출력하면 되는 문제이다.
 * 트리에 종류가 많지만 이번 문제는 '이진 트리' 형태를 띈다고 한다.
 * 
 * 이진 트리는 부모노드가 있고 자식 노드가 최대 2개인 트리이다.
 * @@@ 참고 @@@ 부모를 제외한 모든 노드의 자식이 2개 이면 '완전 이진 트리' 이다.
 * 하여 자식이 3개인 경우는 없으니 
 * 각각의 탐색 순서에 맞게 재귀를 작성해 주면 된다.
 * 함수를 시작하면 끝지점을 만날 때까지 재귀를 돌아야 한다.
 */

const [N, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

let node = new Map();
for (let i = 0; i < N; i++) {
  [leaf, left, right] = input[i].split(' ');
  node.set(leaf, [left, right]);
}

let answer = [];
function 전(v) {
  if (v === '.') return;
  answer.push(v);
  전(node.get(v)[0]);
  전(node.get(v)[1]);
}
전('A');
console.log(answer.join(''));
answer = [];

function 중(v) {
  if (v === '.') return;
  중(node.get(v)[0]);
  answer.push(v);
  중(node.get(v)[1]);
}
중('A');
console.log(answer.join(''));
answer = [];

function 후(v) {
  if (v === '.') return;
  후(node.get(v)[0]);
  후(node.get(v)[1]);
  answer.push(v);
}

후('A');
console.log(answer.join(''));
