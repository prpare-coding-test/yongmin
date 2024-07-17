/**
 * 트리의 부모 찾기
 *
 * 루트가 없는 트리가 주어진다. 트리의 루트를 1이라고 정했을 때 각 노드의 부모를 구해라.
 *
 * 문제를 보면 루트가 없는 트리가 주어진다는 말은 각각이 연결되어 있지만 누구가 우선순위인지 모르는
 * 상태를 말한다. 최상위 노드가 1이므로 1부터 내려가면서 하향식으로 루트를 기록하면 되는 문제이다.
 *
 * 구하는 방법은 간단하다. 1번 노드에 연결되어 있는 노드들은 부모가 1인 노드들이다.
 * BFS와 DFS 두가지 방식으로 구할 수 있다. 방식은 같지만...
 * BFS는 큐를 사용해 현재 노드와 연결되어 있는 노드들의 부모를 현재의 나의 노드로 찍는다.
 * 다음 노드를 확인하고 이미 부모가 정해진 노드라면 패스한다.
 *
 * DFS는 현재 노드를 기준으로 재귀를 타게 되는 데, 자식 노드로 들어가기 전에 현재 노드를
 * 부모로 저장하고 재귀를 들어가면 된다.
 *
 * 두 방식 다 모든 순회가 종료되면 각 노드(index 번호 == node 번호)에
 * 기록한 부모노드 번호를 출력하여 해결하면 된다.
 *
 * @@@ 참고 @@@
 * 처음에 BFS로 풀고 제출했을 때 시간초과가 났다.
 * 다음은 DFS로 풀고 제출하니 똑같이 시간초과가 났다.
 * 최적화를 더이상 진행할 수 없어 보이는 데도 시간초과가 났다.
 *
 * 귀찮지만 어쩔수 없이 출력물을 for 문을 돌면서 했었는데
 * answer 에 개행과 함께 저장하여 마지막에 한번에 출력했더니
 * 해결 되었다.
 *
 * js는 python 보다 입출력에 오버헤드가 높은가 보다..
 */

const input = require('fs').readFileSync(0).toString().trim().split('\n');

const N = +input[0];

let node = Array.from(Array(N + 1), () => []);
let visited = new Array(N + 1).fill(0);

for (let i = 1; i < N; i++) {
  [a, b] = input[i].split(' ').map(Number);
  node[a].push(b);
  node[b].push(a);
}

// function bfs(v) {
//   let q = [];
//   q.push(v);
//   while (q.length) {
//     v = q.shift();
//     for (i of node[v]) {
//       if (!visited[i]) {
//         visited[i] = v;
//         q.push(i);
//       }
//     }
//   }
// }

// bfs(1);

function find(v) {
  for (i of node[v]) {
    if (!visited[i]) {
      visited[i] = v;
      find(i);
    }
  }
}

find(1);
let answer = '';
for (let i = 2; i <= N; i++) answer += visited[i] + '\n';
console.log(answer);
