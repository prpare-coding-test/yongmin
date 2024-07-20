/**
 * DFS와 BFS
 * 
 * DFS는 하나의 노드를 탐색할때 해당 노드와 이어진 모든 노드를 순회하고 빠져나온다.
 * 그래서 DFS는 재귀문과 잘 어울리고,
 * 
 * BFS는 해당 노드와 이어진 노드를 탐색하고 다음 노드와 이어진 노드를 탐색한다.
 * 그래서 큐에 먼저 만나는 노드를 담으며 순회하는 것이 적절하다.
 * 
 */

const input = require('fs').readFileSync(0).toString().trim().split('\n');

const [N, M, V] = input[0].split(' ').map(Number);

let node = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
let visited = new Array(N + 1).fill(false);
let answer = [];

for (let i = 1; i <= M; i++) {
  [a, b] = input[i].split(' ').map(Number);
  node[a][b] = 1;
  node[b][a] = 1;
}

function dfs(visited, v) {
  visited[v] = true;
  answer.push(v);
  for (let i = 1; i < N + 1; i++) {
    if (!visited[i] && node[v][i]) dfs(visited, i);
  }
}

function bfs(visited, v) {
  let q = [];
  q.push(v);
  visited[v] = true;
  while (q.length) {
    v = q.shift();
    answer.push(v);
    for (let i = 1; i < N + 1; i++) {
      if (visited[i] === false && node[v][i] === 1) {
        q.push(i);
        visited[i] = 1;
      }
    }
  }
}

dfs(visited, V);
console.log(answer.join(' '));
answer = [];
visited = new Array(N + 1).fill(false);
bfs(visited, V);
console.log(answer.join(' '));
