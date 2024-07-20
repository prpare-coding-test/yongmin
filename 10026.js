/**
 * 적록색약
 *
 * 간단히 설명하면 빨파초 로 나누어 지는 구역 수와
 * (빨파)와 초로 나누어 지는 구역의 수를 출력하면 되는 문제다.
 *
 * 각각의 좌표에 들어가는 색을 입력받고, 적록색약을 위한 R => G 으로 바꾸어서 저장한다.
 * 입력을 다 받으면 맵을 돌면서 숫자가 아닌 지점이 나오면 함수를 들어가게 했다.
 * bfs 를 선호해 마찬가지로 bfs로 풀었다.
 * 여기서 현재 내가 탐색하는 색을 인자로 넘겨 주어야 알맞은 구역을 확인 할 수 있다.
 * 탐색했다면 1로 변경하여 체크했다. (아무 숫자나 상관없음)
 * answer를 [0, 0]으로 만들어 index 0은 일반인, 1은 적록색약의 구역을 저장했다.
 *
 */

const [N, ...input] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n');

let board = new Array();
let board1 = new Array();
for (let i = 0; i < N; i++) {
  board.push(input[i].split(''));
  board1.push(input[i].replaceAll('R', 'G').split(''));
}

function bfs(map, color, y, x) {
  let q = [[y, x]];
  map[y][x] = 1;
  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];

  while (q.length) {
    [y, x] = q.shift();
    for (let i = 0; i < 4; i++) {
      [ny, nx] = [y + dy[i], x + dx[i]];
      if (0 <= ny && ny < N && 0 <= nx && nx < N && map[ny][nx] === color) {
        q.push([ny, nx]);
        map[ny][nx] = 1;
      }
    }
  }
  return 1;
}

let answer = [0, 0];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (isNaN(board[i][j])) answer[0] += bfs(board, board[i][j], i, j);
    if (isNaN(board1[i][j])) answer[1] += bfs(board1, board1[i][j], i, j);
  }
}

console.log(answer.join(' '));
