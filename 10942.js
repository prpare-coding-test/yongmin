/**
 * 팰린드롬?
 *
 * 문제를 보고 DP 를 써야 하는 문제 같았다. 왜냐하면 수열의 크기가 2천이였고, 질문의 개수가 1,000,000 였다.
 * 이 질문을 받고 양끝에서 하나씩 줄여가면서 팰린드롬인지 확인하는 루프를 돌면
 * 시간초과가 날 것이 분명했다.
 *
 * dp를 어떻게 적용할 수 있을까 떠오르지 않는다. 시작과 끝점이 그때그때 다르기 떄문에 흠...
 * 2차원 배열로 접근해야하나? [n, n] 은 자기자신이기 떄문에 전부 1이고
 * [n, m] 은 n에서 시작해서 m까지 봤을 떄 팰린드롬인지 아닌지를 체크한다?
 *
 * 한번해봐야지, 구현하다보니 똑같은 말이었다. 전혀 DP가 아니었고 걍 저장해두는거였다.
 *
 * 해결법은 이랬다. 생각보다 당연한 말이라고 생각한다.
 * 첫번째 원소와 마지막 원소가 같고, 그사이에 수가 팰린드롬이면 참이다.
 */
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);
const M = parseInt(input[2]);
const queries = input.slice(3).map((line) => line.split(' ').map(Number));

// DP 배열 초기화
const dp = Array.from({ length: N }, () => Array(N).fill(0));

// 팰린드롬 여부 계산
for (let i = 0; i < N; i++) {
  dp[i][i] = 1; // 자기 자신은 팰린드롬
}

for (let i = 0; i < N - 1; i++) {
  if (arr[i] === arr[i + 1]) {
    dp[i][i + 1] = 1; // 인접한 두 수가 같은 경우
  }
}

for (let length = 3; length <= N; length++) {
  for (let i = 0; i <= N - length; i++) {
    const j = i + length - 1;
    if (arr[i] === arr[j] && dp[i + 1][j - 1] === 1) {
      dp[i][j] = 1;
    }
  }
}

// 쿼리 처리 및 출력
const results = [];
for (const [S, E] of queries) {
  results.push(dp[S - 1][E - 1]);
}

console.log(results.join('\n'));
