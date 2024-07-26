/**
 * 토마토
 *
 * 3차원 배열 탐색 문제이다. BFS 를 선호해서 로직은 금방 작성했다.
 * 하지만 1번의 시간초과와 1번의 참조에러로 고생했다.
 *
 * 시간초과는 2차원 board를 3차원으로 만드는 과정에서 발생하였다.
 * 처음에는 공간을 다 만들고 하나하나 체크하면서 board 를 넣어 주었다.
 * 이것이 조금 오래 걸린 것 같다. 그리고 한가지 더 shift() 연산자로 값을 앞에서
 * 뺴주었는데 shift 연산의 시간은 1처럼 보이겠지만, 사실 앞에서 하나빼고 뒤에 것들을
 * 앞으로 하나씩 당겨주어야 하기 때문에 N이다.
 * 그래서 idx 를 늘려주면서 값을 참조했다.
 * 행과 열을 한번에 넣어주었더니 시간초과는 해결되었다.
 *
 * 하지만 참조오류가 나오게 되었는데 찾아도 찾아도 보이지 않았다.
 * gpt 형에게 물어보니 cnt 에서 참조오류가 발생할 수 도 있다고 말했다.
 *
 * 기존에 cnt 는 선언하진 않고 전개해서 가지고 있었는데 그것이 문제 였던 것 같다.
 * ex) [nz, ny, nx, cnt] = q[idx++]
 * cnt 변수를  while 밖으로 보내니 참조에러가 해결되었다.
 */

const fs = require('fs');
const [MNH, ...input] = fs.readFileSync(0).toString().trim().split('\n');

const [M, N, H] = MNH.split(' ').map(Number);

let board = [];
let q = [];
let line = 0;

for (let i = 0; i < H; i++) {
  let layer = [];
  for (let j = 0; j < N; j++) {
    let row = input[line++].split(' ').map(Number);
    layer.push(row);
    for (let k = 0; k < M; k++) {
      if (row[k] === 1) q.push([i, j, k, 0]);
    }
  }
  board.push(layer);
}

const dz = [1, -1, 0, 0, 0, 0];
const dy = [0, 0, 1, -1, 0, 0];
const dx = [0, 0, 0, 0, 1, -1];

function bfs() {
  let idx = 0;
  let cnt = 0; // cnt 변수를 bfs 함수 내부에서 선언하고 반환
  while (idx < q.length) {
    let [z, y, x, currentCnt] = q[idx++];
    cnt = currentCnt; // 현재 cnt 업데이트
    for (let i = 0; i < 6; i++) {
      let nz = z + dz[i],
        ny = y + dy[i],
        nx = x + dx[i];
      if (
        0 <= nz &&
        nz < H &&
        0 <= ny &&
        ny < N &&
        0 <= nx &&
        nx < M &&
        board[nz][ny][nx] === 0
      ) {
        board[nz][ny][nx] = 1;
        q.push([nz, ny, nx, cnt + 1]);
      }
    }
  }
  return cnt; // 최종 cnt 값을 반환
}

let answer = bfs();

for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j].includes(0)) {
      answer = -1;
      break;
    }
  }
  if (answer === -1) break;
}

console.log(answer);

// const fs = require('fs');
// const [MNH, ...input] = fs.readFileSync(0).toString().trim().split('\n');

// const [M, N, H] = MNH.split(' ').map(Number);

// // 정수 1은 익은 토마토, 정수 0 은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.
// let board = [];
// let q = [];
// let line = 0;

// for (let i = 0; i < H; i++) {
//   let layer = [];
//   for (let j = 0; j < N; j++) {
//     let row = input[line++].split(' ').map(Number);
//     layer.push(row);
//     for (let k = 0; k < M; k++) {
//       if (row[k] === 1) q.push([i, j, k, 0]);
//     }
//   }
//   board.push(layer);
// }

// const dz = [1, -1, 0, 0, 0, 0];
// const dy = [0, 0, 1, -1, 0, 0];
// const dx = [0, 0, 0, 0, 1, -1];

// function bfs() {
//   let idx = 0;
//   while (idx < q.length) {
//     [z, y, x, cnt] = q[idx++];
//     for (let i = 0; i < 6; i++) {
//       let nz = z + dz[i],
//         ny = y + dy[i],
//         nx = x + dx[i];
//       if (
//         0 <= nz &&
//         nz < H &&
//         0 <= ny &&
//         ny < N &&
//         0 <= nx &&
//         nx < M &&
//         board[nz][ny][nx] === 0
//       ) {
//         board[nz][ny][nx] = 1;
//         q.push([nz, ny, nx, cnt + 1]);
//       }
//     }
//   }
//   return cnt;
// }

// let answer = bfs();

// for (let i = 0; i < H; i++) {
//   for (let j = 0; j < N; j++) {
//     if (board[i][j].includes(0)) {
//       answer = -1;
//       break;
//     }
//   }
//   if (answer === -1) break;
// }

// console.log(answer);
