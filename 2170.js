/**
 * 선 긋기
 * 
 * 문제를 너무 어렵게 생각했다.
 * 도화지라고 나오고 x, y 좌표라고 해서
 * 피타고라스의 정의를 써서 답을 해결하는 줄 알았다.
 * 예제를 아무리 해봐도 5가 나오지 않아서 이거 뭐지..??했다. ㅋㅋㅋㅋㅋ
 * 
 * 이 문제는 스케줄링? 과 관련된 문제이다.
 * s, e 를 정하고 겹치는 부분이 있으면 e 를 늘려주고, 
 * 겹치지 않으면 길이를 계산해서 더해주면 된다.
 * 
 * 이런 문제 자주 나온다. 시간, 분으로 나오고 치환해야 하는 문제도 있다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = parseInt(input[0], 10);
const lines = input.slice(1).map((line) => line.split(' ').map(Number));

// 선분을 시작점을 기준으로 오름차순, 시작점이 같으면 끝점을 기준으로 오름차순 정렬
lines.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

let start = lines[0][0];
let end = lines[0][1];
let totalLength = 0;

for (let i = 1; i < N; i++) {
  const [nextStart, nextEnd] = lines[i];

  if (nextStart <= end) {
    // 현재 선분이 이전 선분과 겹칠 경우, 끝점을 연장
    end = Math.max(end, nextEnd);
  } else {
    // 겹치지 않을 경우, 이전 선분의 길이를 더하고 새로운 선분을 시작
    totalLength += end - start;
    start = nextStart;
    end = nextEnd;
  }
}

// 마지막으로 남은 선분의 길이 더하기
totalLength += end - start;

console.log(totalLength);
