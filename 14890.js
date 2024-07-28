/**
 * 경사로
 * Step-by-Step 설명
첫 번째 행은 [3, 3, 3, 2, 1, 1]입니다.
초기화: possible = 1 (현재 같은 높이의 연속된 타일 개수)
두 번째 타일: 3 == 3, possible++ => possible = 2
세 번째 타일: 3 == 3, possible++ => possible = 3
네 번째 타일: 3 != 2
3 == 2 + 1 이므로, 경사로를 놓을 수 있는지 확인
possible >= L (2 이상) 이므로, 경사로 설치 가능
possible = 1 (새로운 높이에서 경사로를 놓기 시작하므로 초기화)
다섯 번째 타일: 2 != 1
2 == 1 + 1 이므로, 경사로를 놓을 수 있는지 확인
possible >= L (0 이상) 이므로, 경사로 설치 가능
possible = 1 - L => possible = -1 (앞으로 L 타일 만큼 연속된 낮은 타일이 있어야 함)
여섯 번째 타일: 1 == 1
possible++ => possible = 0 (경사로의 첫 타일)
경로가 유효하지 않으므로, possible < 0에서 멈추고 이 행은 경사로를 설치할 수 없는 것으로 판단
 */

const fs = require('fs');
const input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

function check(arr, N, L) {
  let answer = 0;

  for (let i = 0; i < N; i++) {
    const now = arr[i];
    let possible = 1;
    for (let j = 1; j < N; j++) {
      if (now[j - 1] == now[j]) possible++;
      else if (now[j - 1] + 1 == now[j] && possible >= L) possible = 1;
      else if (now[j - 1] == now[j] + 1 && possible >= 0) possible = 1 - L;
      else {
        possible = -1;
        break;
      }
    }
    if (possible >= 0) {
      answer++;
    }
  }
  return answer;
}

// 3, 3, 2, 1, 1, 1
// 1  2 - 1 - 1

function main(input) {
  const board = input.map((v) => v.split(' ').map(Number));
  const [N, L] = board.shift();
  let newBoard = Array.from(Array(N), () => Array(N));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      newBoard[j][i] = board[i][j];
    }
  }
  const res = check(board, N, L) + check(newBoard, N, L);
  console.log(res);
}

main(input);
