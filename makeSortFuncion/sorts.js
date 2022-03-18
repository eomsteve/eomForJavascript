let randomArr = []

for(let i = 0; i < 15; i++) {
  randomArr.push(Math.floor(Math.random() * 100));
}

function bubbleSort(nums){
  let arr = [...nums];
  let arrLength = arr.length;
  for (let i = arrLength - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // 여기서 조건을 반대로 바꾸면 내림차순이 된다.
      if (arr[j+1] < arr[j]){
        [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
      }
    }
  }
  return arr;
}

// 가장 작은 값을 찾아 맨 앞으로 가져온다.
// 모든 인덱스 접근 * 최솟값을 찾은 후 현재 인덱스와 교환한다.
function insertionSrot(nums){
  let arr = [...nums];
  let arrLength = arr.length;
  for (let i = 0; i < arrLength; i++) {
    insertIdx = i;
    for (let j = i+1; j < arrLength; j++) {
      if (arr[j] < arr[insertIdx]){
        [arr[insertIdx], arr[j]] = [arr[j], arr[insertIdx]]
      }
    }
  }
  return arr;
}

function quickSort(nums, begin, end){
  if (begin >= end){
    return;
  }
    let p = quickSortPartition(nums, begin, end);
    quickSort(nums, begin, p-1);
    quickSort(nums, p+1, end);
    return nums;
}

function quickSortPartition(nums, begin, end){
  let pivot = Math.floor((begin + end) / 2);
  let left = begin;
  let right = end;
  // 이중포인터를 활용해서 정렬을 시도한다.
  while (left < right){
    while (left < right && nums[left] < nums[pivot]){
      left++;
    }
    while (left < right && nums[right] >= nums[pivot]){
      right--;
    }
    if (left < right){
      if (left == pivot) pivot = right;
    }
    [nums[left], nums[right]] = [nums[right], nums[left]];
  }
  [nums[pivot], nums[right]] = [nums[right], nums[pivot]];
  return right;
}

function merge(left, right){
  let result = [];
  while (left.length != 0 && right.length != 0){
    left[0] <= right[0] ? result.push(left.shift()) : result.push(right.shift());	
	}
  // 정렬된 배열, 정렬에 쓰인 빈배열, 남아있는 값이 있는 배열을 다 더해서 반환한다.
	return [...result, ...left, ...right];
}

function mergeSort(nums){
  // 길이가 1이면 정렬된 상태
  if (nums.length == 1) return nums;

  let middle = Math.floor(nums.length / 2);
  let left = nums.slice(0, middle);
  let right = nums.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

console.log(bubbleSort(randomArr));
console.log(insertionSrot(randomArr));
let quickArr = [...randomArr];
console.log(quickSort(quickArr,0,quickArr.length-1));
console.log(mergeSort(randomArr));
