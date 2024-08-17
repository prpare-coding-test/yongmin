/**
 * 테트로미노
 * 
 * DFS로 최대값을 전부 찾고 
 * 예외 케이스인 'ㅗ' 의 모양을 4가지를 확인해 주었다.
 * 
 * 코드가 길어서 좀 지쳤던 문제였다.
 * 
 * 그래도 DFS활용해서 오랫만에 풀어서 기분이가 좋다. BFS로는 풀수가 없다. 
 * 특정한 모양을 만들어야 하기 때문~!
 * 
 * 처음에는 각각의 테트리스 모양의 좌표를 적어 놓고 루프를 돌렸는데 2퍼에서 바로 틀려버렸다.
 * 엄청 공들여 적었는데...이론상 괜찮아 보였는데 뭐가 틀렸는지 모르겠다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split(' ').map(Number));

let result = 0;
const dy = [-1, 1, 0, 0]; // 상하좌우
const dx = [0, 0, -1, 1]; // 상하좌우

function dfs(y, x, cnt, sum, visited) {
  if (cnt === 4) {
    result = Math.max(result, sum);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny >= 0 && ny < N && nx >= 0 && nx < M && !visited[ny][nx]) {
      visited[ny][nx] = true;
      dfs(ny, nx, cnt + 1, sum + board[ny][nx], visited);
      visited[ny][nx] = false;
    }
  }
}

function checkSpecialShape(y, x) {
  // ㅗ 모양의 4가지 경우를 처리
  if (y > 0 && y < N - 1 && x > 0) {
    const sum =
      board[y][x] + board[y - 1][x] + board[y + 1][x] + board[y][x - 1];
    result = Math.max(result, sum);
  }
  if (y > 0 && y < N - 1 && x < M - 1) {
    const sum =
      board[y][x] + board[y - 1][x] + board[y + 1][x] + board[y][x + 1];
    result = Math.max(result, sum);
  }
  if (y > 0 && x > 0 && x < M - 1) {
    const sum =
      board[y][x] + board[y - 1][x] + board[y][x - 1] + board[y][x + 1];
    result = Math.max(result, sum);
  }
  if (y < N - 1 && x > 0 && x < M - 1) {
    const sum =
      board[y][x] + board[y + 1][x] + board[y][x - 1] + board[y][x + 1];
    result = Math.max(result, sum);
  }
}

function solve() {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, 1, board[i][j], visited);
      visited[i][j] = false;
      checkSpecialShape(i, j);
    }
  }

  console.log(result);
}

solve();
