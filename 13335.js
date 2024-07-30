/**
 * 트럭
 *
 * 시뮬레이션 문제이다. 보통 시뮬레이션 문제는 시간이나 횟수를 도출한다.
 * 문제에서 요구하는 과정을 코드로 구현하면 되는 문제가 대부분이고
 * 특별한 알고리즘 개념이 가미되면 문제의 난이도가 올라간다.
 *
 * 해당 문제는 다리를 건너는 문제였다.
 * 1초가 지남에 따라 해야할 행동들을 고려하여 작성한다.
 * 고려해야 할 것은 다음과 같다.
 * 1. 차량이 다리에 진입한다.
 * 2. 다리의 하중이 남아있다면, 다음 차량이 진입해도 되는지 확인 후 가능하면 진입한다.
 * 3. 다리의 길이 또한 고려한다.
 * 4. 1초가 흘러감에 따라 차량을 이동 시켜 준다.
 * 5. 모든 차량이 다리를 빠져나가면 시뮬레이션이 종료된다.
 *
 */

let [nwL, input] = require('fs').readFileSync(0).toString().trim().split('\n');
// 트럭 갯수, 다리 길이, 다리 하중
const [n, w, L] = nwL.split(' ').map(Number);
input = input.split(' ').map(Number);

let time = 1;
let bridge = [];
let bridge_w = 0;
let idx = 0;
while (true) {
  if (bridge_w + input[idx] <= L && bridge.length < w) {
    bridge_w += input[idx];
    bridge.push([input[idx++], w]);
  }
  bridge = bridge
    .map(([e, we]) => [e, we - 1])
    .filter(([e, we]) => {
      if (we > 0) return true;
      else {
        bridge_w -= e;
        return false;
      }
    });
  time++;
  if (input.length <= idx && bridge.length === 0) break;
}

console.log(time);
