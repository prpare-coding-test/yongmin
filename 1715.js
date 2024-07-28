/**
 * 카드 정렬하기
 * 
 * 문제 해결 방법은 
 * 가장 작은 수 두개를 뽑아 더하고 다시 넣는다.
 * 이 과정을 1개가 남았을 떄까지만 반복하면 된다.
 * 
 * 처음에는 que 를 사용해서 앞에서 두개 뺀것을 뒤에 넣고 이걸 반복해야겠다 생각했지만.
 * 그 수가 꼭 크다는 것은 절대적이지 않아서 최소힙으로 해결해야겠다 생각했다.
 * 그렇게 하니 금방 해결했다. 큐큐
 */

const [N, ...cards] = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

class MinHeap {
  constructor(props) {
    this.value = [];
  }

  size() {
    return this.value.length;
  }

  swap(i1, i2) {
    [this.value[i1], this.value[i2]] = [this.value[i2], this.value[i1]];
  }

  add(val) {
    this.value.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.size() - 1;
    let parentIdx = Math.floor((idx - 1) / 2);

    while (this.value[parentIdx] && this.value[idx] < this.value[parentIdx]) {
      this.swap(idx, parentIdx);
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }

  poll() {
    if (this.size() === 1) {
      return this.value.pop();
    }

    const value = this.value[0];
    this.value[0] = this.value.pop();
    this.bubbleDown();
    return value;
  }

  bubbleDown() {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;

    while (
      (this.value[leftIdx] && this.value[leftIdx] < this.value[index]) ||
      (this.value[rightIdx] && this.value[rightIdx] < this.value[index])
    ) {
      let smallerIdx = leftIdx;
      if (this.value[rightIdx] && this.value[rightIdx] < this.value[smallerIdx])
        smallerIdx = rightIdx;
      this.swap(index, smallerIdx);
      index = smallerIdx;
      leftIdx = index * 2 + 1;
      rightIdx = index * 2 + 2;
    }
  }
}

let heap = new MinHeap();
for (let i = 0; i < N; i++) {
  heap.add(cards[i]);
}

let l = heap.size();
let answer = 0;
while (l > 1) {
  let temp = heap.poll() + heap.poll();
  heap.add(temp);
  answer += temp;
  l--;
}
console.log(answer);
