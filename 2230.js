/**
 * 수 고르기
 * 
 * 처음에 예시가 M이 3일 경우 1 4, 1 5, 2 5 가 된다 길래 index가 3 이상 차이나야 하는 걸로 오해했다.
 * 그게 아니라 두 수의 차가 M이상이고 M과 가장 가까운 수를 구하는 문제였다.
 * 우선 절대성을 위해서 입력받은 수를 정렬하고 진행하는 것이 우선이다.
 * 투포인터로 진행하여 해결할 수 있는데,
 * 보통 합해서 특정 수를 찾는 것은 s, e 를 양끝으로 지정해 놓고 시작한다.
 * 이번문제는 두 수의 차를 구하는 문제이기 때문에 s, e를 0 과 1 로 두고 시작한다.
 * 차이가 작으면 끝점을 늘려 차를 증가시키고
 * 그렇지않다면 시작점을 늘려 차를 감소 시키며 진행하면 된다.
 */

const [NM, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

const [N, M] = NM.split(' ').map(Number);
let li = input.map(Number);

let [s, e] = [0, 1];
li.sort((a, b) => a - b);
let answer = Infinity;
while (s <= e && e < N) {
  const num = Math.abs(li[e] - li[s]);
  if (num < M) {
    e++;
  } else {
    answer = Math.min(answer, num);
    s++;
  }
  if (num === M) break;
}

console.log(answer);
