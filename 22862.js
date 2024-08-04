/**
 * 가장 긴 짝수 연속한 부분 수열 (large)
 * 
 * 처음에 투포인터 인것은 알고 있었으나.
 * 세세한 방식이 떠오르지 않았다.
 * 
 * 그 이유는 투포인터는 시작점과 끝점을 지정해 놓고 해당 조건에 맞추어
 * 시작점이나 끝점을 옮겨가면서 해를 찾는 과정인데.
 * 
 * 예외 상황을 처리할 방법이 생각나지 않았다.
 * 
 * 시작점이 짝수여야 한다고 생각했고 거기에 매몰되어서 생각이 잘 안났던 것같다.
 * 
 * 또, k를 삭제 할 수 있는데 이렇게 되면 시작점을 올려야 하는지 끝점을 올려야하는지
 * 
 * 이게 맞는 건지 확신이 없었다.
 * 
 * 결국, 구글링해서 문제의 힌트를 보게 되었고, 기존에 생각했던 투포인터와는 조금 다른 결이라고 생각했다.
 * 
 * 어려웠다..
 */

const fs = require('fs');
let input = fs.readFileSync(0).toString().trim().split('\n');

let [n, k] = input[0].split(' ').map(Number);
let nums = input[1].split(' ').map(Number);

let left = (cnt = ans = 0);

for (let right = 0; right < n; right++) {
  if (nums[right] % 2 === 1) {
    cnt++;
  }
  while (cnt > k) {
    if (nums[left] % 2 === 1) cnt--;
    left++;
  }
  if (cnt <= k) ans = Math.max(ans, right - left - cnt + 1);
}
console.log(ans);
