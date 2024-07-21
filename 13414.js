/**
 * 수강신청
 *
 * 잘 생각해보면 신청한 사람이 또 신청하면 후순위로 밀린다고 한다.
 * 이말은 먼저 나오더라도 뒤에 나오게 되면 앞에 있는 학번을 삭제해야 함을 뜻한다.
 *
 * 다행히도 js의 set은 그 순서를 유지하면서 중복된 것들을 지워준다.
 * 그래서 뒤에 나온 것이 살아 있어야 하기 떄문에
 * 입력값을 한번 뒤집어서 Set에 넣고 중복을 제거한다.
 * 그 후 배열을 다시 뒤집어 원상태로 만들고 K 만큼만 출력하면 된다.
 * 끝 easy
 */

const [KL, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

const [K, L] = KL.split(' ').map(Number);

console.log([...new Set(input.reverse())].reverse().slice(0, K).join('\n'));
