/**
 * 로프
 *
 * 로프를 사용해 가장 많이 들 수 있는 무게를 구하는 문제.
 * 로프가 2개면 2개가 무게를 분산해서 같이 든다는 말.
 * 10, 15 를 들 수 있는 로프가 2개 있다고 하면.
 * 10가 들수 있는 최대 무게는 10이다.
 * 15또한 10을 들 수 있기 때문에 10 * 2인 20이 최대 무게가 된다.
 *
 * 여기서 알 수 있듯이 가장 작은수 * 갯수 가 가장 큰 것을 알아내면 된다.
 * 하지만 주어진 수가 정렬된 상태로 나온다는 말이 없기에
 * 내림차순으로 정렬하여 진행한다.
 * 오름차순으로 정렬해도 해결 가능하다. 수식이 달라질 뿐,
 */

const [N, ...rope] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

let answer = Math.max(...rope.sort((a, b) => b - a));

for (let i = 1; i < N; i++) {
  const temp = rope[i] * (i + 1);
  if (answer < temp) answer = temp;
}

console.log(answer);
