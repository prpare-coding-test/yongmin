/**
 * 로봇 청소기
 * 
 * 구현 / 시뮬레이션 문제 였다.
 * 하라는데로 코드를 작성하면 되고, 
 * 청소된 부분은 2로 청소했다고 표기해주는 것을 제외하고는 크게 코멘트 할게 없는 문제라고 생각된다.
 * 
 * 문제를 잘 보고 잘 구현하면 된다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let [r, c, d] = input[1].split(' ').map(Number);
const map = input.slice(2).map((line) => line.split(' ').map(Number));

const directions = [
  [-1, 0], // 북
  [0, 1], // 동
  [1, 0], // 남
  [0, -1], // 서
];

let cleaned = 0;

function clean() {
  if (map[r][c] === 0) {
    map[r][c] = 2;
    cleaned++;
  }

  for (let i = 0; i < 4; i++) {
    d = (d + 3) % 4; // 왼쪽 방향으로 회전
    const [dr, dc] = directions[d];
    const nr = r + dr;
    const nc = c + dc;

    if (map[nr][nc] === 0) {
      r = nr;
      c = nc;
      clean();
      return;
    }
  }

  const backDir = (d + 2) % 4;
  const [br, bc] = [r + directions[backDir][0], c + directions[backDir][1]];

  if (map[br][bc] !== 1) {
    r = br;
    c = bc;
    clean();
  }
}

clean();
console.log(cleaned);
