/**
 * 톱니바퀴
 *
 * 빡구현 문제였다. 로테이트 돌리는 걸 비트연산 해야하나 고민했었다.
 * 의미가 있나 싶었다. 그래서 포기하고, 객체를 만들어서 각 기어를 돌리는 것으로 대체했다.
 *
 * 2번째 인덱스와 6번째 인덱스를 비교해 돌아야 하는지 말아야 하는지를 판별했다.
 * rotateGear, processOrder 함수로 크게 두가지로 진행을 반복한다.
 *
 * rotateGear는 기어를 해당 방향으로 돌리는 함수다.
 * processOrder는 돌리기 시작하는 기어를 기준으로 왼쪽 오른쪽을 돌려야 하는지 말아야 하는지
 * 판별하는 함수이다. directions 에 돌려야 하는 방향을 저장하고
 * 연쇄가 끝나면 해당 방향으로 rotate를 해주었다.
 *
 * 루프가 끝나고 12시 방향을 더해주었따. 1번째 기어부터 4번째 기어까지 더하는 수가
 * 2의 n 승 이길래 pow 함수를 사용해 코드 길이를 조금 줄였다.
 * 가독성은 별로지만 멋좀 부려봤다. 
 * 
 * --- 한줄평
 * 시간이 너무 오래걸렸다. 이게 무슨 알고리즘이지 생각하는데 도저히 떠오르지 않았다.
 * 걍 구현이었다. 구현하는 것도 오래걸렸다. 머리속으로는 하고싶은게 있는데 손이 안따라준다. 
 * 쓰다보니 세줄이네.. 세줄평이다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\n');

class Gear {
  constructor(teeth) {
    this.teeth = teeth;
  }

  rotateClockwise() {
    this.teeth.unshift(this.teeth.pop());
  }

  rotateCounterClockwise() {
    this.teeth.push(this.teeth.shift());
  }
}

const gears = input.slice(0, 4).map((line) => new Gear(line.split('')));
const orders = input.slice(5).map((order) => order.split(' ').map(Number));

const rotateGear = (gearIndex, direction) => {
  if (direction === 1) {
    gears[gearIndex].rotateClockwise();
  } else {
    gears[gearIndex].rotateCounterClockwise();
  }
};

const processOrder = (startIdx, direction) => {
  const directions = Array(4).fill(0);
  directions[startIdx] = direction;

  for (let i = startIdx; i > 0; i--) {
    if (gears[i].teeth[6] !== gears[i - 1].teeth[2]) {
      directions[i - 1] = -directions[i];
    } else {
      break;
    }
  }

  for (let i = startIdx; i < 3; i++) {
    if (gears[i].teeth[2] !== gears[i + 1].teeth[6]) {
      directions[i + 1] = -directions[i];
    } else {
      break;
    }
  }

  directions.forEach((dir, idx) => {
    if (dir !== 0) {
      rotateGear(idx, dir);
    }
  });
};

orders.forEach(([idx, dir]) => {
  processOrder(idx - 1, dir);
});

const score = gears.reduce((sum, gear, index) => {
  if (gear.teeth[0] === '1') {
    return sum + Math.pow(2, index);
  }
  return sum;
}, 0);

console.log(score);
