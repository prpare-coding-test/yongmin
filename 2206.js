/**
 * 벽 부수고 이동하기
 *
 * 벽을 한번만 부술 수 있다. BFS를 탐색하면서 벽을 부수었는지를 체크하면서 진행한다는 것이 키 포인트이다.
 * BFS를 탐색하면서 visited[x][y][0] 은 벽을 부수지 않고 도달한 것이고 1은 벽을 부수고 도달했는지를 체크한다.
 *
 * 이동할 때 주의한 것은
 * 벽이 아닌 경우: 현재 상태를 유지하면서 이동하고
 * 벽인 경우: 벽을 부술 수 있다면 부수고 이동, 이후에는 해당 벽을 더이상 부술 수 없게 함
 *
 * 예전에 풀었던 문제여서 기억이 나버렸다. 그래서 재밌었던 듯
 * 
 * 시간초과가 나서 기존에 shift 연산에서 시간을 너무 잡아먹는 다고 생각했고
 * deque를 구현해서 사용했다. js 빡빡하다. BFS 여차하면 시간초과난다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((line) => line.split('').map(Number));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1], // 아래, 위, 오른쪽, 왼쪽
];

// deque 구현
class Deque {
  constructor() {
    this.data = [];
    this.front = 0;
    this.back = 0;
  }

  push(value) {
    this.data[this.back++] = value;
  }

  shift() {
    if (this.front === this.back) return undefined;
    const value = this.data[this.front];
    delete this.data[this.front++];
    return value;
  }

  isEmpty() {
    return this.front === this.back;
  }
}

const bfs = (N, M, map) => {
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(false))
  );

  const queue = new Deque();
  queue.push([0, 0, 0, 1]); // [x, y, 벽 부숨 여부 (0 or 1), 이동 횟수]
  visited[0][0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, broken, dist] = queue.shift();

    // 도착점에 도달한 경우
    if (x === N - 1 && y === M - 1) {
      return dist;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
        if (map[nx][ny] === 0 && !visited[nx][ny][broken]) {
          // 벽이 아닌 경우
          visited[nx][ny][broken] = true;
          queue.push([nx, ny, broken, dist + 1]);
        } else if (map[nx][ny] === 1 && broken === 0 && !visited[nx][ny][1]) {
          // 벽이지만 아직 부순 적이 없는 경우
          visited[nx][ny][1] = true;
          queue.push([nx, ny, 1, dist + 1]);
        }
      }
    }
  }

  return -1; // 도달할 수 없는 경우
};

console.log(bfs(N, M, map));
