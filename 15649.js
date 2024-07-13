/**
 * dfs의 감을 찾기에 좋았던 문제 같다.
 * 처음에는 visited 배열도 만들고 했지만,
 * 문제에서 1 ~ N 의 배열이라고 주어져 있다. 이말은 즉
 * 연속해서 숫자가 주어진다는 말로도 표현할 수 있다.
 *
 * 그래서 1 ~ N 의 배열을 arr 에 추가하기 이전에
 * arr에 해당 수가 존재 하는지 확인하는 과정을 추가했다.
 * M이 8이 최대 이기 때문에 한번 찾는데 최대 M 만큼 들게 된다.
 * 하지만 이 과정을 계속해서 반복하기 떄문에 M이 커지면 좋지 않은 방식이라고 생각한다.
 *
 * 코드 풀이 *
 * - (1)입력받기
 * - (2)재귀함수
 * - (2.1)탈출조건 => depth 가 M이 되면 arr에 있는 것 output으로 push
 * - (2.2)반복문 1 ~ N 만큼 돌면서 해당 값이 없으면 i 추가하기
 * - (2.3)추가된 arr를 가지고 다시 재귀 (depth + 1)
 * - (2.4)재귀스택을 벗어나면 넣었던 i 빼주기
 * - (3)반복문 다시 진행
 *
 */

// * - (1)입력받기

const [N, M] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const output = [];

// * - (2)재귀함수
function f(arr, index) {
  // * - (2.1)탈출조건 => depth 가 M이 되면 arr에 있는 것 output으로 push
  if (index === M) {
    output.push(arr.join(' '));
  } else {
    // * - (2.2)반복문 1 ~ N 만큼 돌면서 해당 값이 없으면 i 추가하기
    for (let i = 1; i <= N; i++) {
      if (arr.indexOf(i) === -1) {
        // * - (2.3)추가된 arr를 가지고 다시 재귀 (depth + 1)
        arr.push(i);
        f(arr, index + 1);
        // * - (2.4)재귀스택을 벗어나면 넣었던 i 빼주기
        arr.pop();
      }
    }
  }
}

f([], 0);

console.log(output.join('\n'));
