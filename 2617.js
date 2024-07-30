/**
 * 구슬 찾기
 * 이 문제를 통해 그래프 탐색 기술을 배울 수 있다. 특히 깊이 우선 탐색(DFS)와 플로이드–워셜 알고리즘의 활용할 수 있다.
 * 무거운 것을 찾으면 그것보다 가벼운 것이 있으면 현재 것 또한 무겁고 가볍다.
 * 여기서 heavy와 light 배열을 사용하여 각 구슬이 더 무거운 다른 구슬들과 더 가벼운 다른 구슬들을 저장한다.
 * DFS를 사용하여 각 구슬에서 도달할 수 있는 모든 노드를 탐색합니다. 이 과정에서 몇 개의 노드에 도달할 수 있는지를 나타내는 count 값을 구합니다.
 */
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const heavy = Array.from({ length: N + 1 }, () => []);
const light = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  heavy[a].push(b);
  light[b].push(a);
}

function dfs(start, graph) {
  const stack = [start];
  const visited = new Array(N + 1).fill(false);
  visited[start] = true;
  let count = 0;

  while (stack.length) {
    const node = stack.pop();

    for (const next of graph[node]) {
      if (!visited[next]) {
        visited[next] = true;
        stack.push(next);
        count++;
      }
    }
  }

  return count;
}

let answer = 0;
const half = Math.floor(N / 2);

for (let i = 1; i <= N; i++) {
  const heavyCount = dfs(i, heavy);
  const lightCount = dfs(i, light);

  if (heavyCount > half || lightCount > half) {
    answer++;
  }
}

console.log(answer);
