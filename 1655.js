/**
 * 가운데를 말해요
 *
 * 문제를 보자마자 우선순위 큐를 활용해서 풀어야 하는 문제구나 생각했다.
 * 하지만 최소/최대 힙만 알고 있는 지라 중간 값을 어떻게 0번째에 둘 수 있는가에 대해서 생각해 보았다.
 * 
 * 모르겠다. 구글링 했다. 해답의 아이디어는 이러했다.
 * 최대 힙과 최소 힙을 둘다 사용한다.
 * 
 * 최대 힙 (left_heap): 작은 수의 절반을 저장합니다
 * 최소 힙 (right_heap): 큰 수의 절반을 저장합니다.
 * 
새로운 수가 최대 힙의 루트보다 작으면 최대 힙에 삽입, 그렇지 않으면 최소 힙에 삽입합니다.

힙의 균형 조정:
두 힙의 크기 차이가 1을 초과하지 않도록 조정합니다.
즉, 최대 힙의 크기는 최소 힙의 크기와 같거나 하나 더 많을 수 있습니다.

ㄱ중앙값 출력:
최대 힙의 루트가 현재까지 입력된 수들의 중앙값이 됩니다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0], 10);
const numbers = input.slice(1).map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];

      if (element >= parent) break;
      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  extract() {
    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }

    return min;
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild < element) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild < element) ||
          (swap !== null && rightChild < leftChild)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }

    this.heap[index] = element;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

const leftHeap = new MinHeap();
const rightHeap = new MinHeap();
const results = [];

for (let number of numbers) {
  if (leftHeap.size() === 0 || number <= -leftHeap.peek()) {
    leftHeap.insert(-number);
  } else {
    rightHeap.insert(number);
  }

  if (leftHeap.size() > rightHeap.size() + 1) {
    rightHeap.insert(-leftHeap.extract());
  } else if (rightHeap.size() > leftHeap.size()) {
    leftHeap.insert(-rightHeap.extract());
  }

  results.push(-leftHeap.peek());
}

console.log(results.join('\n'));
