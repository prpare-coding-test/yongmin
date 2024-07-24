/**
 * 회전하는 큐
 * 
 * 42 과제 중에 push_swap 할 때 적용했던 작은 아이디어와 유사하다고 생각했다.
 * 처음에는 index 를 가지고 현재위치와 끝위치를 조작해서 문제를 해결하려고 시도했으나
 * 생각 보다 구현이 안되고 고려해야 할 것이 많았다.
 * 로테이트를 돌다가 값을 빼야하는데 그럼 전체길이도 줄여줘야 하고
 * 현재 위치에서 찾고자 하는 위치의 거리의 점화식도 잘 생각이 나지 않았다.
 * 
 * 결국, 문제에서 주어진 방식으로 해결했다.
 * 뽑으려고 하는 수가 나올 때 까지 회전시키고 그 횟수를 카운트 했다.
 * 아쉽다. 구현력이 좀 더 좋았으면 좋겠다.
 */

const [[N, M], targets] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map((e) => e.split(' ').map(Number));

let answer = 0;
let arr = new Array(N).fill(1).map((e, i) => e + i);
for (let target of targets) {
  while (true) {
    if (arr[0] === target) {
      arr.shift();
      break;
    } else {
      if (arr.indexOf(target) < arr.length / 2) {
        while (arr[0] !== target) {
          arr.push(arr.shift());
          answer++;
        }
      } else {
        while (arr[0] !== target) {
          arr.unshift(arr.pop());
          answer++;
        }
      }
    }
  }
}

console.log(answer);
