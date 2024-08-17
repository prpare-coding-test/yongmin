/**
 * 가장 큰 정사각형
 * 
 * 피신때 진행했던 BSQ 문제이다. 오랜만에 문제를 보니 DP를 사용하면 되는 걸 알고있으면서
 * 점화식이 떠오르지 않았다. 이번 기회에 확실히 알게 된 것 같다.
 * 
 * 현재 위치가 1이라면 전, 위, 전위 를 확인하고 min 값에 + 1을 해주면 된다.
 * 수학의 세계는 신기하다.
 * 
 * for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (matrix[i][j] === 1) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1; // 첫 행이나 첫 열의 경우
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  // 최대 정사각형 크기 갱신
  maxSize = Math.max(maxSize, ...dp[i]);
}
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const matrix = input.slice(1).map((line) => line.split('').map(Number));

// DP 배열 초기화
const dp = Array.from({ length: n }, () => Array(m).fill(0));
let maxSize = 0;

// DP 배열 채우기
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (matrix[i][j] === 1) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1; // 첫 행이나 첫 열의 경우
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  // 최대 정사각형 크기 갱신
  maxSize = Math.max(maxSize, ...dp[i]);
}

// 정사각형의 크기 출력
console.log(maxSize * maxSize);
