/**
 * 사다리 조작
 * 
 * 구현 문제였다. 처음에 사다리 열을 그리는 과정을 어떻게 처리해야할지 많이 고민했다.
 * 선을 점으로 표현해야 하기 떄문이었다.
 * 
 * 보통 시작하는 부분에 플래그를 올리기 떄문에 그렇게 진행했다.
 * 해당 문제는 백트래킹으로 올바른 답이 나올 때 까지 계속 반복해야 한다.
 * 중간에 최소값을 찾으면 리턴해 버려서 틀렸었다.
 * 
 * 중간에 나온 값이 최소가 아닐 수 있다.
 * 
 * 재밌었다. 다음에 이런문제 나오면 꼭 해결할 것이다! 파이링
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, H] = input[0].split(' ').map(Number);
const ladder = Array.from({ length: H + 1 }, () => Array(N + 1).fill(false));

for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  ladder[a][b] = true;
}

function isCorrect() {
  for (let i = 1; i <= N; i++) {
    let pos = i;
    for (let j = 1; j <= H; j++) {
      if (ladder[j][pos]) pos++;
      else if (ladder[j][pos - 1]) pos--;
    }
    if (pos !== i) return false;
  }
  return true;
}

function dfs(count, x, y) {
  if (count > 3) return Infinity;
  if (isCorrect()) return count;

  let min = Infinity;

  for (let i = x; i <= H; i++) {
    for (let j = i === x ? y : 1; j < N; j++) {
      if (!ladder[i][j] && !ladder[i][j - 1] && !ladder[i][j + 1]) {
        ladder[i][j] = true;
        min = Math.min(min, dfs(count + 1, i, j));
        ladder[i][j] = false;
      }
    }
  }

  return min;
}

const result = dfs(0, 1, 1);
console.log(result > 3 ? -1 : result);
