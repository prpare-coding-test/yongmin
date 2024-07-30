/**
 * 주사위 굴리기
 * 
 * 주사위의 초기 상태를 정의합니다.
 * 지도와 명령어를 입력받아 초기화합니다.
 * 주어진 명령어에 따라 주사위를 굴리는 rollDice 함수를 정의합니다.
 * 명령어를 하나씩 처리하며 주사위를 굴리고, 지도와 주사위의 바닥면 값을 복사합니다.
 * 주사위의 상단 값을 출력합니다.

먼저, 주사위의 초기 상태를 다음과 같이 정의합니다.

상단: 1
하단: 6
전면: 2
후면: 5
왼쪽: 4
오른쪽: 3

* 동쪽으로 굴릴 때:

상단 -> 오른쪽
오른쪽 -> 하단
하단 -> 왼쪽
왼쪽 -> 상단
서쪽으로 굴릴 때:

상단 -> 왼쪽
왼쪽 -> 하단
하단 -> 오른쪽
오른쪽 -> 상단
북쪽으로 굴릴 때:

상단 -> 전면
전면 -> 하단
하단 -> 후면
후면 -> 상단
남쪽으로 굴릴 때:

상단 -> 후면
후면 -> 하단
하단 -> 전면
전면 -> 상단

 */

const input = require('fs').readFileSync(0).toString().trim().split('\n');

let [N, M, x, y, K] = input.shift().split(' ').map(Number);
let i = 0;

let board = [];
for (; i < N; i++) board.push(input[i].split(' ').map(Number));
let commands = input[N].split(' ').map(Number);

let dice = new Array(6).fill(0);

let directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

// 주사위 굴리는 함수 정의
function rollDice(dice, direction) {
  let [a, b, c, d, e, f] = dice;
  switch (direction) {
    case 1: // 동쪽
      return [d, b, a, f, e, c];
    case 2: // 서쪽
      return [c, b, f, a, e, d];
    case 3: // 북쪽
      return [e, a, c, d, f, b];
    case 4: // 남쪽
      return [b, f, c, d, a, e];
    default:
      return dice;
  }
}

commands.forEach((command) => {
  let [dx, dy] = directions[command - 1];
  let nx = x + dx;
  let ny = y + dy;

  // 지도를 벗어나면 해당 명령 무시
  if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
    return;
  }

  // 주사위 굴리기
  dice = rollDice(dice, command);
  x = nx;
  y = ny;

  // 바닥 확인 및 복사
  if (board[x][y] === 0) {
    board[x][y] = dice[5]; // 바닥 면은 dice[5]
  } else {
    dice[5] = board[x][y];
    board[x][y] = 0;
  }

  // 상단 출력
  console.log(dice[0]);
});
