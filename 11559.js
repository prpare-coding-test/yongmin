/**
 * Puyo Puyo
 *
 * 재밌게 풀었다.
 * 문제는 크게 두단계로 나눌 수 있다.
 * 1. 4개이상이 되어서 터지는 뿌요 체크하기
 * 2. 체크된 뿌요 터트리고 보드 밑으로 내리기.
 * 
 * 이 두가지를 1번이 없을 떄까지 반복하면 된다.
 * 각 항목 중 고민했던 것을 적어보자면,
 * 아직 4개가 되지 않았는데 board를 바꾸면 안되서 record라는 배열에
 * 채크된 좌표를 기록해 놓았다가 4개가 안된다 싶으면 visit을 다시 되돌려 놓았다.
 * 
 * 체크된 뿌요를 '.'으로 바꾸고 밑으로 어떻게 내릴지 고민을 많이했다. 했던 고민을 적어보면
 * 1. 각 행으로 배열을 다시 만들까 생각했다. 배열을 90도 돌려서 바닥이 오른쪽으로 가게끔
 * 2. board를 뒤집어 바닥이 아래가 아니라 위로 오게끔 하는 건 어떨까 생각했다.
 * 등등... 여러가지 고민을 했었다.
 */

let board = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((e) => e.split(''));
let visit = Array.from({ length: 12 }, () => new Array(6).fill(0));
let cnt = 0;
let flag = 0;

function search(i, j, c) {
  visit[i][j] = 1;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  let q = [[i, j]];
  let record = [[i, j]];
  let count = 1;
  while (q.length) {
    [y, x] = q.shift();
    for (let k = 0; k < 4; k++) {
      [ny, nx] = [y + dy[k], x + dx[k]];
      if (
        0 <= nx &&
        nx < 6 &&
        0 <= ny &&
        ny < 12 &&
        !visit[ny][nx] &&
        board[ny][nx] === c
      ) {
        q.push([ny, nx]);
        record.push([ny, nx]);
        visit[ny][nx] = 1;
        count++;
      }
    }
  }
  if (count < 4) {
    for ([yy, xx] of record) {
      visit[yy][xx] = 0;
    }
    return 0;
  }
  return 1;
}

function boom() {
  let check = Array.from({ length: 6 }, () => []);
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (visit[i][j]) {
        visit[i][j] = 0;
        board[i][j] = '.';
      } else {
        if (board[i][j] !== '.') check[j].push(board[i][j]);
      }
    }
  }
  check.map((e, i) => check[i].unshift(...'.'.repeat(12 - e.length).split('')));
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 12; j++) {
      board[j][i] = check[i][j];
    }
  }
}

while (true) {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if ((board[i][j] !== '.' || board[i][j] === undefined) && !visit[i][j]) {
        flag += search(i, j, board[i][j]);
      }
    }
  }
  boom();
  if (!flag) break;
  flag = 0;
  cnt++;
}

console.log(cnt);
