/**
 * 구현하는게 힘들었다. 나중에 꼬여서 찾다가 못찾아서 걍 가저옴..이런 줴엔장
 * 그치만 개념은 맞게 생각했다.
 *
 * dfs 로 문제를 해결하기에 좋은 것처럼 보였다. (그게 맞음)
 * 우선 5번 수행하기 때문에 depth를 5로 지정하여 5가 되면 최대 값을 찾게 했다.
 * 이때 수행하고자 하는 배열을 복사해 주어야 한다.
 * *** 참고
 *  js는 2차원 배열 복사하려면 전개해서 각 행별로 복사해 주어야 한다.
 * ***
 * push 함수는 왼오상하 로 구분했다.
 * 0을 제외하고 순차적으로 tmp에 넣어준다.
 * tmp의 마지막 값과 현재 넣으려는 값이 숫자가 같으면
 * 마지막 값을 pop해서 뺴고 *2 한 값을 다시 temp 에 넣는다.
 *
 * 순회가 끝나면 그 행 또는 열에 temp 에 있던 값들을 순차적으로 넣어준다.
 * *** 이때! 왼오상하 순서 잘 맞춰서 넣어줘야함!
 *
 * 이 과정을 재귀로 모든 경우를 확인한다.
 */

let input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const N = Number(input.shift());
const board = input.map((i) => i.split(' ').map(Number));

function pushLeft(newBoard) {
  for (let i = 0; i < N; i++) {
    const tmp = [];
    for (let j = 0; j < N; j++) {
      if (newBoard[i][j] === 0) continue;

      if (newBoard[i][j] === tmp[tmp.length - 1]) {
        tmp.push(-tmp.pop() * 2);
      } else {
        tmp.push(newBoard[i][j]);
      }
      newBoard[i][j] = 0;
    }

    for (let j = 0; j < tmp.length; j++) {
      newBoard[i][j] = Math.abs(tmp[j]);
    }
  }
  return newBoard;
}

function pushRight(newBoard) {
  for (let i = 0; i < N; i++) {
    const tmp = [];
    for (let j = N - 1; j >= 0; j--) {
      if (newBoard[i][j] === 0) continue;

      if (newBoard[i][j] === tmp[tmp.length - 1]) {
        tmp.push(-tmp.pop() * 2);
      } else {
        tmp.push(newBoard[i][j]);
      }
      newBoard[i][j] = 0;
    }

    for (let j = 0; j < tmp.length; j++) {
      newBoard[i][N - j - 1] = Math.abs(tmp[j]);
    }
  }
  return newBoard;
}

function pushUp(array) {
  for (let j = 0; j < N; j++) {
    const tmp = [];
    for (let i = 0; i < N; i++) {
      if (array[i][j] === 0) continue;

      if (array[i][j] === tmp[tmp.length - 1]) {
        tmp.push(-2 * tmp.pop());
        array[i][j] = 0;
      } else {
        tmp.push(array[i][j]);
        array[i][j] = 0;
      }
    }
    for (let i = 0; i < tmp.length; i++) {
      array[i][j] = Math.abs(tmp[i]);
    }
  }
  return array;
}
function pushDown(array) {
  for (let j = 0; j < N; j++) {
    const tmp = [];
    for (let i = N - 1; i >= 0; i--) {
      if (array[i][j] === 0) continue;

      if (array[i][j] === tmp[tmp.length - 1]) {
        tmp.push(-2 * tmp.pop());
        array[i][j] = 0;
      } else {
        tmp.push(array[i][j]);
        array[i][j] = 0;
      }
    }
    for (let i = 0; i < tmp.length; i++) {
      array[N - i - 1][j] = Math.abs(tmp[i]);
    }
  }
  return array;
}

let result = 0;
function recursion(n, array) {
  if (n === 5) {
    result = Math.max(result, ...[].concat(...array));
    return;
  }
  recursion(n + 1, pushLeft(array.map((a) => [...a])));
  recursion(n + 1, pushRight(array.map((a) => [...a])));
  recursion(n + 1, pushUp(array.map((a) => [...a])));
  recursion(n + 1, pushDown(array.map((a) => [...a])));
}

recursion(0, board);

console.log(result);
