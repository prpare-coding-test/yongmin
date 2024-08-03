/**
 * 트리와 쿼리
 * 
첫 번째 줄에서 노드의 수 n, 루트 노드 r, 쿼리 수 q를 읽어옵니다.
두 번째 줄부터 n-1개의 간선 정보를 읽어와서 그래프를 인접 리스트 형태로 만듭니다.
마지막 q줄에서 쿼리 정보를 읽어옵니다.
DFS를 통한 서브트리 크기 계산:

subtreeSizes 배열은 각 노드의 서브트리 크기를 저장합니다.
visited 배열은 각 노드의 방문 여부를 저장합니다.
DFS를 사용하여 각 노드의 서브트리 크기를 계산합니다. 루트 노드 r부터 시작하여 재귀적으로 방문합니다.
쿼리 처리:

미리 계산된 subtreeSizes 배열을 사용하여 각 쿼리에 대해 서브트리 크기를 빠르게 반환합니다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, r, q] = input[0].split(' ').map(Number);

const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 1; i < n; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

const queries = [];
for (let i = n; i < n + q; i++) {
  queries.push(Number(input[i]));
}

const subtreeSizes = Array(n + 1).fill(0);
const visited = Array(n + 1).fill(false);

function dfs(node) {
  visited[node] = true;
  subtreeSizes[node] = 1;

  for (const neighbor of graph[node]) {
    if (!visited[neighbor]) {
      subtreeSizes[node] += dfs(neighbor);
    }
  }

  return subtreeSizes[node];
}

dfs(r);

const results = queries.map((query) => subtreeSizes[query]);
console.log(results.join('\n'));
