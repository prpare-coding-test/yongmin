/**
 * 멀티탭 스케줄링
 *
 * 왜 골드 1인지 사실 잘 모르겠다.
 * 그렇게 어려운 문제는 아닌거 같은데..
 *
 * 무튼 상식적으로 하면된다.
 * 자리가 남았으면 꽂고
 * 뽑아야 하면 가장 늦게 나오거나 나오지 않는 친구를 뽑아주면 된다.
 *
 * 10달전에 풀어봐서 알고 있기 떄문에 그런 건지도 모르겠다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const devices = input[1].split(' ').map(Number);

let plugs = new Set(); // 멀티탭에 꽂혀 있는 기기들
let unplugs = 0; // 뽑아야 하는 횟수

for (let i = 0; i < K; i++) {
  const currentDevice = devices[i];

  if (plugs.has(currentDevice)) {
    continue; // 이미 꽂혀 있으면 다음으로 넘어감
  }

  if (plugs.size < N) {
    plugs.add(currentDevice); // 여유 공간이 있으면 그냥 꽂음
    continue;
  }

  // 뽑아야 할 경우, 가장 나중에 사용되거나 더 이상 사용되지 않는 기기를 찾음
  let lastUsed = -1;
  let deviceToUnplug = null;

  for (let plug of plugs) {
    const nextUse = devices.slice(i + 1).indexOf(plug);

    if (nextUse === -1) {
      // 이후 사용되지 않는 기기
      deviceToUnplug = plug;
      break;
    }

    if (nextUse > lastUsed) {
      lastUsed = nextUse;
      deviceToUnplug = plug;
    }
  }

  plugs.delete(deviceToUnplug);
  plugs.add(currentDevice);
  unplugs++;
}

console.log(unplugs);
