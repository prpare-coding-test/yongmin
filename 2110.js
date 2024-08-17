/**
 * 공유기 설치
 *
 * 정렬후에 이분탐색으로 최소거리와 최대거리 사이에서 가능한 거리를 찾는다.
 * mid 값을 기준으로 이 거리 이상으로 공유기를 설치할 수 있는지를 확인한다.
 *
 * 첫번째 집에 공유기를 설치하고, 그 이후에는 mid 거리 이상 떨어진 집에만 공유기를 설치한다.
 * 설치한 공유기의 개수가 C개 이상이면 이 거리를 유지할 수 있고, 그렇지 않으면 거리를 줄여야 한다.
 */

const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const houses = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

let start = 1;
let end = houses[N - 1] - houses[0];
let answer = 0;

while (start <= end) {
  const mid = Math.floor((start + end) / 2);
  let count = 1; // 첫 집에 공유기 설치
  let lastInstalled = houses[0];

  for (let i = 1; i < N; i++) {
    if (houses[i] - lastInstalled >= mid) {
      count++;
      lastInstalled = houses[i];
    }
  }

  if (count >= C) {
    answer = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(answer);
