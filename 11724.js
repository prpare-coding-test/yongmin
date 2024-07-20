/**
 * 이번 문제는 dfs의 기본이 되는 문제 같아 보였다.
 * 
 * 우선 각 노드들이 연결된 상태를 담을 2차원 배열을 생성한다.
 * 순회를 하며 각 요소를 연결 해준다.
 * 1번째 인덱스에 2,3,4 가 들어 있다면 이는 1번 노드와 2,3,4 노드가
 * 서로 연결되어 있는 것을 말한다.
 * 사전 작업을 완료하고 방문하지 않은 노드라면 dfs를 순회하면서
 * 연결되어있는 노드를 모두 탐색하고, visited 를 체크해준다.
 * dfs 의 재귀가 탈출 되었다는 것은 연결된 노드들을 모두 거친 뒤 빠져 나오기 때문에
 * answer 를 1 증가 시켜 준다.
 * 해당 순회를 1부터 n 까지 반복하고 answer를 출력하면 되는 문제~!!
 * 
 * @@@@@ 참고 @@@@@
 * node를 만드는데 시간이 조금 걸렸다.
 * 이유는 2차원 배열의 주소값이 복사되어서 다른 인덱스에 push 를 해도 모두 저장되는 것이다.
 * ex) node[0].push(1) => node[0] = [1], node[1] = [1] ...
 * node 생성을 new Array연산으로 진행하였는데 앞으로는
 * 배열을 반환하는 Array.from 함수를 사용해야겠다.
 * 
 */

const input = require('fs').readFileSync(0).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((e) => +e);

let node = Array.from(Array(n + 1), () => []);
let visited = new Array(n + 1).fill(false);
let answer = 0;

for (let i = 0; i < m; i++) {
  [a, b] = input[i + 1].split(' ').map((e) => +e);
  node[a].push(b);
  node[b].push(a);
}

function dfs(visited, v) {
  visited[v] = true;
  for (i of node[v]) {
    if (!visited[i]) {
      dfs(visited, i);
    }
  }
}

for (let i = 1; i <= n; i++) {
  if (!visited[i]) {
    dfs(visited, i);
    answer++;
  }
}
console.log(answer);
