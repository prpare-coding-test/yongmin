/**
 * 세 용액
 * 
 * 투포인터인데 mid 값이 있는 쓰리포인터 문제이다.
 * 처음 보는 문제여서 투포인터까지는 생각했는데 mid 값을 어떻게 결정해야 할지 
 * 한참 고민했다.
 * 
 * 결국 중간값을 어떻게 선별해야할지 생각이 나지 않았다.
 * 다른 사람들의 풀이를 보니 거의 완탐인데 투포인터 같은 완탐이였다.
 * 고정값을 하나 정해놓고 (n번 반복함)
 * 투포인터를 사용해서 최솟값이 나오면 값을 갱신해준다.
 * 
 * 다음에 이런문제 나오면 풀 수 있을 것 같다. 흐흐
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = parseInt(input[0], 10);
const arr = input[1]
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

let closestSum = Infinity;
let result = [];

for (let i = 0; i < N - 2; i++) {
  let left = i + 1;
  let right = N - 1;

  while (left < right) {
    const sum = arr[i] + arr[left] + arr[right];

    if (Math.abs(sum) < Math.abs(closestSum)) {
      closestSum = sum;
      result = [arr[i], arr[left], arr[right]];
    }

    if (sum < 0) {
      left++;
    } else if (sum > 0) {
      right--;
    } else {
      // sum이 0인 경우가 가장 좋은 경우이므로 바로 결과를 반환합니다.
      console.log(arr[i], arr[left], arr[right]);
      return;
    }
  }
}

console.log(result.join(' '));
