/**
 * 상범 빌딩
 * 
 * 빌딩은 여러 층으로 구성되어 있다. (3차원)
 * 시작점이 있고 탈출 지점까지 가는데 얼마나 걸리는지 최소 이동 횟수를 구한다.
 * 
 * 이 문제는 3차원 BFS로 볼 수 있다. 방향 그래프와 board의 초기 셋팅만 처리한다면 
 * 어렵지 않게 문제를 해결 할 수 있었다.
 * 
 * 3차원 배열 선언하는게 쪼꼼 버벅였다 데헷. (visited 배열)
 * 입력 받는 것도 중간에 공백이 있어서 쪼금 버벅였다. 
 * 
 * 이후로는 BFS인데 3차원이라 쉬웠다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const directions = [
  [1, 0, 0],
  [-1, 0, 0], // 상, 하 (층 이동)
  [0, 1, 0],
  [0, -1, 0], // 좌, 우
  [0, 0, 1],
  [0, 0, -1], // 앞, 뒤
];

const bfs = (L, R, C, building, start, end) => {
  const queue = [];
  const visited = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array(C).fill(false))
  );

  queue.push([...start, 0]); // [z, y, x, time]
  visited[start[0]][start[1]][start[2]] = true;

  while (queue.length > 0) {
    const [z, y, x, time] = queue.shift();

    if (z === end[0] && y === end[1] && x === end[2]) {
      return time;
    }

    for (const [dz, dy, dx] of directions) {
      const nz = z + dz;
      const ny = y + dy;
      const nx = x + dx;

      if (
        nz >= 0 &&
        nz < L &&
        ny >= 0 &&
        ny < R &&
        nx >= 0 &&
        nx < C &&
        !visited[nz][ny][nx] &&
        building[nz][ny][nx] !== '#'
      ) {
        visited[nz][ny][nx] = true;
        queue.push([nz, ny, nx, time + 1]);
      }
    }
  }

  return -1; // 탈출 불가
};

let idx = 0;
let output = '';

while (true) {
  const [L, R, C] = input[idx].split(' ').map(Number);
  if (L === 0 && R === 0 && C === 0) break;

  const building = [];
  let start = null;
  let end = null;

  for (let i = 0; i < L; i++) {
    const floor = [];
    for (let j = 0; j < R; j++) {
      const line = input[++idx].split('');
      floor.push(line);
      if (line.includes('S')) {
        start = [i, j, line.indexOf('S')];
      }
      if (line.includes('E')) {
        end = [i, j, line.indexOf('E')];
      }
    }
    building.push(floor);
    idx++; // 빈 줄을 건너뛰기
  }

  const result = bfs(L, R, C, building, start, end);
  if (result === -1) {
    output += 'Trapped!\n';
  } else {
    output += `Escaped in ${result} minute(s).\n`;
  }

  idx++;
}

console.log(output);
