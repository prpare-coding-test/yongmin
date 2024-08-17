/**
 * 회장뽑기
 * 
 * 플로이드-와샬 알고리즘으로 해결할 수 있다.
 * 다익스트라는 하나의 지점에서 다른 특점 지점까지의 최단 경로를 구하는 알고리즘이라면,
 * 플로이드-와샬은 모든 지점에서 다른 모든 지점까지의 최단 경로를 모두 구하는 알고리즘이다.
 * 
 * 점화식은
  dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j])
  이렇다.
 * 3중 포문을 돌려야 하기 때문에 코테에서 만약 N이 크다면 플로이드-와샬 알고리즘이 아니라는 것을 유추해 볼 수 있다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);

// 플로이드-와샬 알고리즘을 위한 거리 배열 초기화
const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

// 자기 자신으로의 거리는 0으로 초기화
for (let i = 1; i <= n; i++) {
  dist[i][i] = 0;
}

// 입력된 관계에 따라 거리 초기화
for (let i = 1; i < input.length - 1; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  dist[a][b] = 1;
  dist[b][a] = 1;
}

// 플로이드-와샬 알고리즘을 사용하여 모든 회원 간의 최단 거리 계산
for (let k = 1; k <= n; k++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    }
  }
}

// 각 회원의 점수를 계산
const scores = Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  scores[i] = Math.max(...dist[i].slice(1));
}

// 최소 점수 계산
const minScore = Math.min(...scores.slice(1));

// 최소 점수를 가진 회원들을 찾아내고, 그들의 수를 계산
const candidates = [];
for (let i = 1; i <= n; i++) {
  if (scores[i] === minScore) {
    candidates.push(i);
  }
}

// 결과 출력
console.log(minScore, candidates.length);
console.log(candidates.join(' '));
