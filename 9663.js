/**
 * 문제를 보고 예전 기억이 떠올랐다.
 * 
 * 1차원 배열로 index와 그 값으로 행열을 표시할 수 있고,
 * 퀸의 특성상 board에 + x 로 선을 그엇을 때의 위치는 놓을 수 없다.
 * 하지만 dfs 를 접목하게 되면 [0, 0] 좌표부터 시작하기 때문에 놓이지 않았던
 * 아래쪽은 신경쓸 필요가 없다.
 * 하여, 내가 놓을 자리가 가로,세로,대각선에 놓인 퀸이 있는지 확인하고 없다면 
 * 그자리에 퀸을 놓고 dfs를 해 나아가면 된다.
 */

const N = +require('fs').readFileSync(0).toString();

let answer = 0;
let row = Array.from({ length: N + 1 }, () => 0);

function check(L) {
  for (let i = 0; i < L; i++) {
    if (row[L] === row[i] || L - i === Math.abs(row[L] - row[i])) {
      return false;
    }
  }
  return true;
}

function DFS(L) {
  if (L === N) {
    answer++;
  } else {
    for (let i = 0; i < N; i++) {
      row[L] = i;
      if (check(L)) {
        DFS(L + 1);
      }
    }
  }
}

DFS(0);
console.log(answer);
