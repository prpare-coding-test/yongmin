/**
 * 안전 영역
 * 
 * 재밌었다. 오랜만에 내힘으로 끝까지 푼 문제였다.
 * 그래서 재밌었던 듯...
 * 
 * 그래도 한번 틀렸었다. 비가 안오는 경우를 고려하지 않아서 틀렸었다.
 * 
 * 과정은 0에서 부터 무한대로 늘려가며 높이를 증가했고 안전구역이 없을 때 브레이크해주었다.
 * 
 * bfs를 사용해서 board를 순회하며 서로이어진 안전구역을 찾았고, 연속된 구역이 종료되면
 * 1을 리턴해 protect에 더해주었다.
 */

let [N, ...input] = require('fs').readFileSync(0).toString().trim().split('\n');
N = +N;
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function bfs(i, j) {
  let q = [[i, j]];
  check[i][j] = true;
  while (q.length) {
    const [y, x] = q.shift();
    for (let k = 0; k < 4; k++) {
      const [nx, ny] = [x + dx[k], y + dy[k]];
      if (
        0 <= nx &&
        nx < N &&
        0 <= ny &&
        ny < N &&
        !check[ny][nx] &&
        board[ny][nx] > h
      ) {
        check[ny][nx] = true;
        q.push([ny, nx]);
      }
    }
  }
  return 1;
}

let board = input.map((e) => e.split(' ').map(Number));
let check = Array.from(Array(N), () => Array(N).fill(false));
let max = 0;

let h = -1;
while (true) {
  h++;
  let protect = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!check[i][j] && board[i][j] > h) {
        protect += bfs(i, j);
      }
    }
  }

  max = Math.max(max, protect);
  check = Array.from(Array(N), () => Array(+N).fill(false));
  if (!protect) break;
}

console.log(max);
