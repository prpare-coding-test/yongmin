/**
 * List of Unique Numbers
 * 
두 개의 포인터 (left와 right)를 사용하여 현재 부분 수열의 범위를 나타냅니다.
현재 윈도우 내 고유한 원소를 추적하기 위해 집합을 사용합니다.
고유한 연속 부분 수열의 개수를 추적합니다.

right 포인터를 확장하여 새로운 요소를 윈도우에 포함시킵니다.
만약 새로운 요소가 이미 집합에 존재한다면, left 포인터를 이동시켜 윈도우를 축소하여 고유한 원소를 유지합니다.

윈도우가 확장될 때마다 현재 윈도우의 길이를 부분 수열의 개수에 더합니다.
 */

function countUniqueSubsequences(n, arr) {
  let left = 0;
  let uniqueElements = new Set();
  let count = 0;

  for (let right = 0; right < n; right++) {
    while (uniqueElements.has(arr[right])) {
      uniqueElements.delete(arr[left]);
      left++;
    }
    uniqueElements.add(arr[right]);
    count += right - left + 1;
  }

  return count;
}

// 입력 처리
const input = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = +input[0]
const arr = input[1].split(' ').map(Number);

console.log(countUniqueSubsequences(n, arr));
