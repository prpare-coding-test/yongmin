/**
 * 바이러스
 * 
 * 다른 두 문제와 매우 유사한 문제이다.
 * DFS를 활용해 1번부터 탐색하여 방문한 노드 수를 출력하면 된다.
 * 변수를 따로 만들고 싶지 않아서 visited 에 true에 수를 세고
 * 자기자신을 제외한 수를 출력했다. 
 */

const input = require('fs').readFileSync(0).toString().trim().split('\n');

const N = +input[0];
const M = +input[1];
let node = Array.from(Array(N + 1), () => []);
let visited = new Array(N + 1).fill(false);
for (let i = 2; i < M + 2; i++) {
  [a, b] = input[i].split(' ').map(Number);
  node[a].push(b);
  node[b].push(a);
}

function dfs(v) {
  visited[v] = true;
  for (i of node[v]) {
    if (!visited[i]) dfs(i);
  }
}

dfs(1);
console.log(visited.filter((e) => e).length - 1);
