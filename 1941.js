/**
 * 소문난 칠공주
 * 
 * 문제를 보니 백트랙킹으로 해결해야 될 것 같다고 생각했다.
 * 또한, 4명 이상의 S가 필요하니 depth와 S를 비교했을 떄 
 * 얼리리턴해주면 시간을 줄일 수 있겠다 생각했다.
 * 
 * 그런데 구현을 못했다. 백트래킹 왜케 어려운건데..ㅋㅋㅋㅋ
 * 다른 사람 풀이를 보니 2차원 배열을 1차원 배열로 해결하는 것이 좋아보여서 가져왓다.
 * 
 * 천제는 많고 나는 멍청이다.
 * 그래도 방향성은 맞으니 괜찮은가? 모르겠다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const grid = input.map((line) => line.split(''));
const selected = Array(25).fill(false);
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let answer = 0;

function isConnected(count, indexes) {
  const visited = Array(7).fill(false);
  let queue = [indexes[0]];
  visited[0] = true;
  let connectedCount = 1;

  while (queue.length) {
    const curr = queue.shift();
    const [x, y] = [Math.floor(curr / 5), curr % 5];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      const nextIndex = nx * 5 + ny;

      if (nx >= 0 && nx < 5 && ny >= 0 && ny < 5) {
        const index = indexes.indexOf(nextIndex);
        if (index !== -1 && !visited[index]) {
          visited[index] = true;
          queue.push(nextIndex);
          connectedCount++;
        }
      }
    }
  }

  return connectedCount === 7;
}

function dfs(depth, start, yCount, indexes) {
  if (yCount > 3) return;
  if (depth === 7) {
    if (isConnected(7, indexes)) {
      answer++;
    }
    return;
  }

  for (let i = start; i < 25; i++) {
    const x = Math.floor(i / 5);
    const y = i % 5;
    selected[i] = true;
    indexes.push(i);

    dfs(depth + 1, i + 1, yCount + (grid[x][y] === 'Y' ? 1 : 0), indexes);

    selected[i] = false;
    indexes.pop();
  }
}

dfs(0, 0, 0, []);
console.log(answer);
