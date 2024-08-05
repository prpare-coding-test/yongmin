/**
 * 카드 합체 놀이
 * 
 * BigInt 덕분에 6번 틀렸다.
 * 수의 범위를 신경써서 보지 않고서는 잘 알아차리기 힘든 것 같다.
 * 시간 너무 많이 잡아먹었따.
 * 
 * 맞는데 왜 틀렸지 (맞왜틀)을 엄청했다.
 * 
 * sort 하고 작은거 두개빼고 더한거 두개 넣고 sort하고 이방법은 시간초과가 났다.
 * 알고있었다. 시간초과가 날 것을 그치만 귀찮았다.
 * 
 * 최소 힙을 만들기 싫었다. 아직도 스스로 최소힙을 작성하지 못한다.
 * 이번에도 보고했다. 한심한 놈이다 나는... 이번에는 한번 지웠다 적어봐야겠다.
 */

const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : '../input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

class MinHeap {
  // idx = 1에 min value 저장
  constructor() {
    this.heap = [BigInt(0)];
  }

  // 삭제과정에서 부모가 자식보다 큰 경우 교체
  isBiggerThanChildren(idx) {
    // 자식이 존재하는지
    if (this.heap[2 * idx]) {
      return (
        this.heap[idx] > this.heap[2 * idx] ||
        this.heap[idx] > this.heap[2 * idx + 1]
      );
    } else {
      return false;
    }
  }

  swapValue(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }

  insert(value) {
    this.heap.push(value);

    let currentIdx = this.heap.length - 1;
    let parentIdx = Math.floor(currentIdx / 2);

    while (currentIdx > 1 && this.heap[currentIdx] < this.heap[parentIdx]) {
      this.swapValue(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor(currentIdx / 2);
    }
  }

  sum() {
    return this.heap.reduce((a, b) => a + b, BigInt(0));
  }

  remove() {
    // 최소 하나는 있는 경우 [0, value]인 경우
    if (this.heap.length > 1) {
      // [0, value] 인 경우 value 리턴
      if (this.heap.length === 2) return this.heap.pop();

      let removedVal = this.heap[1];
      this.heap[1] = this.heap.pop();
      let currentIdx = 1;

      // 우선 자식들이 부모보다 작은 경우
      while (this.isBiggerThanChildren(currentIdx)) {
        if (this.heap[2 * currentIdx + 1] < this.heap[2 * currentIdx]) {
          // 오른쪽 자식이 존재하고, 오른쪽 자식이 왼쪽 자식보다 작은 경우
          if (this.heap[2 * currentIdx + 1] < this.heap[currentIdx]) {
            this.swapValue(2 * currentIdx + 1, currentIdx);
            currentIdx = 2 * currentIdx + 1;
          }
        } else {
          // 왼쪽 자식이 부모보다 작은 경우
          if (this.heap[2 * currentIdx] < this.heap[currentIdx]) {
            this.swapValue(2 * currentIdx, currentIdx);
            currentIdx = 2 * currentIdx;
          }
        }
      }

      return removedVal;
    } else return null;
  }
}

let [N, M] = input.shift().split(' ').map(Number);
let arr = input.shift().split(' ').map(BigInt);
let pq = new MinHeap();

for (let i = 0; i < arr.length; i++) {
  pq.insert(BigInt(arr[i]));
}

while (M > 0) {
  let first = pq.remove();
  let second = pq.remove();
  pq.insert(first + second);
  pq.insert(first + second);
  M--;
}
console.log(pq.sum().toString());
