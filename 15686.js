/**
 * 우선 해당 문제는 여러가지 방식으로 고려를 했었다.
 * 가장 먼저 고민한 것은 치킨을 기준으로 순회를 해야하나 집을 기준으로 순회를 해야하나 고민했었다.
 * dfs 재귀를 별로 좋아하지 않아서 bfs로 해결하고 싶었다.
 * 하지만 문제를 너무 어렵게 생각해서 인지 해결해야 할 목적지를 잃은 느낌이었다.
 *
 * 과정은 이러하다.
 * 탐색을 시작하는 치킨은 0으로 바꾼다.
 * 치킨을 기준으로 1을 만나면 해당 자리에 거리를 넣어 기록한다.
 * 모든 장소를 탐색하고 보드에 남아있는 거리들을 더한다.
 *
 * 위의 생각들은 정말 쓸데없는 생각이다.
 * 왜냐하면 찾고자 하는 경로상에 방해물이 없을 뿐이거니와
 * x,y 축의 절대값으로 거리를 확인할 수 있기 때문에
 * 불필요한 순회를 할 필요가 없다.
 *
 * 저 과정을 하고 있엇던 시간이 아깝다. 치킨집의 좌표마다 check 2차원 배열을 다시 생성했었고, cnt를 대입하고 다시 초기화 해줬어야 했다. 해당 board도 복사해서 실행했어야 했다. 레전드 불필요...
 *
 * ================================================
 * 여담은 여기까지로 하고 하단에 풀이방식에 대해 이야기 하겠다.
 *
 * 1. 입력을 받는다.
 * 2. 행을 돌면서 치킨집과 집들의 좌표를 각각 배열에 저장한다.
 * 3.
 * dfs 재귀를 돌게 되는데 최대 m 만큼 depth를 설정하고,
 * 탐험할 집을 index로 넣게 된다.
 * index를 1 늘려서 새로운 재귀를 넣어, 모든 치킨집을 탐색하게 한다
 * index가 전체 치킨집의 길이보다 같아 지면, 이 또한 재귀를 빠져나온다.
 *
 * 4. 위 재귀안에 결과값을 min 값으로 비교하여 갱신해 준다.
 * ================================================
 *
 * 쓸데없는 생각에 사로잡혀서 시간이 많이 걸렸다. js로 백준을 푸는 것이 처음이라 입력 받는 법, node js로 컴파일 하는 것 또한 해보았는데 재밌엇다. 스껄~!!
 * 여담으로 해당 문제는 1년전 python 으로 해결했던 문제이다. 푸는 방식에 대해서는 어렴풋이 기억을 하고 있었는데 헷갈렸는지 이상한 길로 돌아가서 더 오래 걸렸던 것 같다.
 */

// 1. 입력받기
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map((e) => parseInt(e));

let board = [];
let chicken = [];
let home = [];
let result = Infinity;
// 2. 치킨집과 집들의 좌표 각각 저장
for (let i = 1; i <= n; i++) {
  let row = input[i].split(' ').map((e) => +e);
  for (let j = 0; j < n; j++) {
    if (row[j] === 1) home.push([i - 1, j]);
    else if (row[j] === 2) chicken.push([i - 1, j]);
  }
  board.push(row);
}

// 4.
const calcul_distanse = (left_chicken) => {
  let totalChickenLength = 0;
  for (let i = 0; i < home.length; i++) {
    let chickenLength = Infinity;
    for (let j = 0; j < left_chicken.length; j++) {
      chickenLength = Math.min(
        chickenLength,
        Math.abs(home[i][0] - left_chicken[j][0]) +
          Math.abs(home[i][1] - left_chicken[j][1])
      );
    }
    totalChickenLength += chickenLength;
  }
  return totalChickenLength;
};
// 3.
const dfs = (depth, idx, left_chicken) => {
  if (depth === m) {
    result = Math.min(result, calcul_distanse(left_chicken));
    return;
  }
  if (idx === chicken.length) return;

  left_chicken.push(chicken[idx]);
  dfs(depth + 1, idx + 1, left_chicken);
  left_chicken.pop();

  dfs(depth, idx + 1, left_chicken);
};

dfs(0, 0, []);

console.log(result);
