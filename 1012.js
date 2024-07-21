/**
 * 유기농 배추
 * 
 * bfs 나 dfs 둘다 해결이 가능하나
 * bfs 로 문제 푸는 것을 더 선호하기에 bfs로 해결했다.
 * 
 * 보드를 돌면서 1이 나오게 되면 인접한 1을 모두 찾고
 * bfs 함수의 순회가 종료되면 주면에 남아있는 1이 없다는 뜻이기 때문에
 * return 으로 1을 넘겨주고 그 값을 밖에서 answer 에 추가 시켰다.
 * visited 배열을 만들어도 되지만, 방문했던 곳은 2로 만들어 방문 표시를 했다.
 * 사실 1을 제외한 어떤 수를 넣어도 방식은 동일하다. 
 */

let [T, ...input] = require('fs').readFileSync(0).toString().trim().split('\n');

while (T--) {
  function bfs(i, j) {
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    let q = [[i, j]];
    board[i][j] = 2;
    while (q.length) {
      [y, x] = q.shift();
      for (let k = 0; k < 4; k++) {
        [ny, nx] = [y + dy[k], x + dx[k]];
        if (0 <= ny && ny < N && 0 <= nx && nx < M && board[ny][nx] === 1) {
          q.push([ny, nx]);
          board[ny][nx] = 2;
        }
      }
    }
    return 1;
  }

  [M, N, K] = input.shift().split(' ').map(Number);
  let board = Array.from(Array(N), () => Array(M).fill(0));
  for (let i = 0; i < K; i++) {
    [x, y] = input.shift().split(' ').map(Number);
    board[y][x] = 1;
  }
  let answer = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 1) answer += bfs(i, j);
    }
  }
  console.log(answer);
}
