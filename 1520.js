/**
 * 내리막 길
 * 
 * 예전에 푼문제여서 DP 문제라ㅔ는 것을 알고 잇었다.
 * DFS와 DP를 함께 사용하여 해결하는 문제이다.
 * 
 * 상하좌우를 탐색하면서 이동가능한 곳을 탐색한다.
 * DP에 경로의 경우의 수를 저장한다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [M, N] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.split(' ').map(Number));

// DP 배열 초기화
const dp = Array.from({ length: M }, () => Array(N).fill(-1));

// 방향 벡터: 위, 아래, 왼쪽, 오른쪽
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// DFS 함수 정의
function dfs(x, y) {
  // 목적지에 도달한 경우
  if (x === M - 1 && y === N - 1) {
    return 1;
  }

  // 이미 계산된 경우, 해당 값을 반환
  if (dp[x][y] !== -1) {
    return dp[x][y];
  }

  // 경로의 수 초기화
  dp[x][y] = 0;

  // 네 방향으로 이동
  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && ny >= 0 && nx < M && ny < N && map[nx][ny] < map[x][y]) {
      dp[x][y] += dfs(nx, ny);
    }
  }

  return dp[x][y];
}

// DFS 시작
console.log(dfs(0, 0));
