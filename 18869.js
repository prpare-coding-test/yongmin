/**
 * 멀티버스 Ⅱ
 *
 * 문제 유형은 잘 모르겠다.
 * 한번 틀렸는데
 * 처음에는 문자열로 치환한 다음 Map 객체를 사용해서 짝수가 되면 1을 추가해줬다.
 *
 * 왜인지 모르겠는데 틀렸다고 나온다. 어떤 히든케이스가 있는지 모르겠다.
 *
 * gpt한테 물어보니 이상한 말을한다. 납득이 안된다.
 * gpt가 수정한 코드는 맞는다고 나온다. 신기하다.
 *
 * 뭐가 틀린지 모르겠어서 백준 질문게시판에 올려놓았다. 답글이 빨리 달렸으면 좋겠다.
 */

// 틀린 코드
// const fs = require('fs');
// const input = fs.readFileSync(0).toString().trim().split('\n');

// const [M, N] = input[0].split(' ').map(Number);
// const list = input.slice(1).map((line) =>
//   line
//     .split(' ')
//     .map((e, i) => [i, +e])
//     .sort((a, b) => a[1] - b[1])
// );

// let temp = list.map((line) => line.reduce((a, c) => a + c[0], ''));
// let table = new Map();
// let answer = 0;
// temp.forEach((e) => {
//   if (table.has(e)) {
//     table.set(e, table.get(e) + 1);
//     if (table.get(e) % 2 === 0) answer++;
//   } else {
//     table.set(e, 1);
//   }
// });

// console.log(answer);

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const universes = input.slice(1).map((line) => line.split(' ').map(Number));

function getRankArray(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const rankMap = new Map();

  sorted.forEach((value, index) => {
    if (!rankMap.has(value)) {
      rankMap.set(value, index);
    }
  });

  return arr.map((value) => rankMap.get(value));
}

let universeRanks = universes.map(getRankArray);
let count = 0;

for (let i = 0; i < M - 1; i++) {
  for (let j = i + 1; j < M; j++) {
    if (
      universeRanks[i].every((val, index) => val === universeRanks[j][index])
    ) {
      count++;
    }
  }
}

console.log(count);
