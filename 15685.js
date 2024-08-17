/**
 * 드래곤 커브
 *
 * 문제를 이해하는데 시간이 오래걸렸다.
 * 이상한 문제를 잘 만들어 내는 백준 선생님인 것 같다.
 *
 * 2번째 출력이 11이라길래 왜인지 한참 찾았다.
 * 1 * 1 의 4개의 꼭지점이 드래곤 커브에 속하면 +1 하는 것이었다.
 *
 * 세대만큼 반복해서 커브를 돌아 플래그를 찍어주는 점화식을 도출하는데 시간이 많이 걸렸다.
 * 어려웠다.
 *
 * 이후 맵을 돌면서 각 4개의 좌표가 불이 들어왔는지 확인하고 count 를 증가시켜 주었다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = parseInt(input[0]);
const directions = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];
const map = Array.from(Array(101), () => Array(101).fill(false));

// 드래곤 커브 그리기
input.slice(1).forEach((line) => {
  const [x, y, d, g] = line.split(' ').map(Number);

  // 0세대 초기화
  const curves = [[x, y]];
  let [nx, ny] = [x + directions[d][0], y + directions[d][1]];
  curves.push([nx, ny]);
  map[y][x] = true;
  map[ny][nx] = true;

  // g세대까지 그리기
  for (let gen = 1; gen <= g; gen++) {
    const length = curves.length;
    const [ex, ey] = curves[length - 1];
    for (let i = length - 2; i >= 0; i--) {
      const [cx, cy] = curves[i];
      const [dx, dy] = [ex - cy + ey, ey + cx - ex];
      curves.push([dx, dy]);
      map[dy][dx] = true;
    }
  }
});

// 정사각형 세기
let count = 0;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (map[i][j] && map[i][j + 1] && map[i + 1][j] && map[i + 1][j + 1]) {
      count++;
    }
  }
}

console.log(count);
