/**
 * 파일 합치기 3
 *
 * 작은거 2개 빼고 더한거 heap에 넣기
 * 저번에 많이 푼 문제.
 * 
 * MinHeap 60% 내힘으로 구현했다.
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const t = parseInt(input[0], 10);
let index = 1;

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

  size() {
    return this.heap.length;
  }
}

let results = [];

for (let i = 0; i < t; i++) {
  const k = parseInt(input[index], 10);
  const files = input[index + 1].split(' ').map(Number);
  index += 2;

  const minHeap = new MinHeap();
  for (let file of files) {
    minHeap.insert(file);
  }

  let totalCost = 0;

  while (minHeap.size() > 1) {
    const file1 = minHeap.extract();
    const file2 = minHeap.extract();
    const mergedFile = file1 + file2;
    totalCost += mergedFile;
    minHeap.insert(mergedFile);
  }

  results.push(totalCost);
}

results.forEach((result) => console.log(result));
