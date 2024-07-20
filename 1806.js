/**
 * 부분합
 * 
 * 부분합은 누적합으로 구할 수 있다.
 * 누적합이란. 
 * 예를들어 1,3,7,2,5 라는 수열이 있다고 가정하자.
 * 0으로 시작하여 각 항목들을 더해나가면 그것이 누적합이 된다.
 * 0, 1, 4, 11, 13, 18 이렇게 누적합을 구할 수 있다.
 * 여기서 3 ~ 2 까지의 구간의 합을 구하고자 하면
 * 누적합의 13에서 1을 빼면 된다.
 * 이렇게 하면 매번 3 + 7 + 2 를 할 필요가 없다.
 * 지금은 3개라서 크게 와닿지 않치만 수열의 길이가 100,000이라면 
 * 시간초과를 면하지 못할 것이다.
 * 
 * 문제를 해결하면서 두번 틀렸다.
 * 1. 합을 만드는 것이 불가능 할때 0을 출력하는 것을 누락했다.
 * 2. 누적합을 담는 리스트가 0이 채워진 상태로 시작하기 떄문에 while문의 범위를 +1 했었어야 했다.
 */

const [NS, input] = require('fs').readFileSync(0).toString().trim().split('\n');

const [N, S] = NS.split(' ').map(Number);
let li = input.split(' ').map(Number);
let arr = [0];

for (i of li) {
  arr.push(arr[arr.length - 1] + i);
}
let [s, e] = [0, 0];
let answer = Infinity;
while (s <= e && e < N + 1) {
  const cur = arr[e] - arr[s];
  if (cur < S) {
    e++;
  } else {
    answer = Math.min(answer, e - s);
    s++;
  }
}

console.log(answer === Infinity ? 0 : answer);
