/**
 * 나는야 포켓몬 마스터 이다솜
 *
 * 도감에 포켓몬과 포켓몬에 대응되는 번호를 함께 저장한다.
 * ex) 피카츄 => 1
 *     1 => 피카츄
 *
 * 이렇게 하면 이름으로도 찾을 수 있고, 번호로도 찾을 수 있다.
 *
 * 저장이 완료되면 해당 입력값 을 키로 get 해오면 됨!
 */

const [NM, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

const [N, M] = NM.split(' ').map(Number);

let dogam = new Map();
for (let i = 0; i < N; i++) {
  dogam.set(input[i], i + 1);
  dogam.set(i + 1 + '', input[i]);
}
for (let j = N; j < N + M; j++) {
  console.log(dogam.get(input[j]));
}
