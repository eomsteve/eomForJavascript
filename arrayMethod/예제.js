//생성자 함수
console.log('생성자 함수');
const createArr = new Array(10);
console.log(createArr); // [empty * 10]
console.log(createArr.length)// 10

console.log('================================')

const create2 = Array(1,2,3); // [1, 2, 3]

const create3 = Array({});//[{}]

const ofArr = Array.of(1); // [1];

const ofArr2 = Array.of(1,2,3);//[1, 2, 3]

const ofArr3 = Array.of('string'); // ['string']

const fromArr = Array.from({length:2, 0:'a', 1: 'b'}); // ['a','b']
//이터러블을 변화하여 배열을 생성한다.
const fromArr2 = Array.from('hello'); // ['h','e','l','l','o']

//true
Array.isArray([]);
Array.isArray([1,2]);
Array.isArray(new Array());

//false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(1);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({0:1, length:1});

const food = ['apple', 'banana', 'orange'];

if(food.indexOf('apple') === -1){
    food.push('apple');
}

const foods = ['apple', 'banana', 'orange'];
if(!foods.includes('apple')){
    foods.push('apple');
}

const pushArr = [1,2];

//인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.
let pushResult = pushArr.push(3, 4);

console.log(pushResult); //4

console.log(pushArr);//[1,2,3,4]

const lastPush = [1, 2];

lastPush[lastPush.length] = 3;

console.log(lastPush); // [1, 2, 3]

const popArr = [1, 2];

//원본 배열에서 마지막 요소를 제거하고, 제거한 요소를 반환한다.
let popResult = popArr.pop();
console.log(popResult); // 2

//pop 메서드는 원본 배열을 직접 변경한다. 
console.log(popArr); // [1]

const unshiftArr = [1, 2];

//인수로 전달받은 모든 값을 원본 배열의 선두 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.
let unshiftRsult = unshiftArr.unshift(3, 4);

console.log(unshiftRsult); //4

console.log(unshiftArr); //[3, 4, 1, 2]

const shiftArr = [1, 2];

//원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
let shiftRsult = shiftArr.shift();

console.log(shiftRsult); //1

console.log(shiftArr); //[2]

const arr1 = [1, 2];
const arr2 = [3, 4];

//배열 arr2를 arr1의 마지막 요소로 추가한 새로운배열을 반환한다.
let concatResult = arr1.concat(arr2);

console.log(concatResult); // [1, 2, 3, 4]

concatResult = arr1.concat(3);
console.log(concatResult); // [1, 2, 3]

concatResult = arr1.concat(arr2, 5);
console.log(concatResult); // [1, 2, 3, 4, 5]

//원본 배열은 변경되지 않는다.
console.log(arr1); //[1, 2]

//array.splice(start, deleteCount(option), items...(option))

const spliceArr = [1, 2, 3, 4];

//인덱스 1부터 2개의 요소를 제거하고 그 자리에 20, 30을 삽입한다.
const spliceResult = spliceArr.splice(1, 2, 20, 30);

//제거한 요소가 배열로 반환된다.
console.log(spliceResult); // [2,3]

console.log(spliceArr);//[1,20, 30, 4]

const sliceArr = [1, 2, 3];

//배열[0] 부터 [1]이전 까지 복사하여 반환한다.
sliceArr.slice(0, 1); // [1]

//배열 [1] 부터 [2]이전 까지 복사하여 반환한다.
sliceArr.slice(1, 2); //[2]

//원본 배열은 변경되지 않는다.
console.log(sliceArr); // [1, 2, 3]

//end 를 생략하면 첫 번재 인수 로 전달받은 인덱스 부터 모든 요소를 복사하여 배열로 반환한다. 
sliceArr.slice(1); // [2, 3]

// 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다.(얕은복사)
sliceArr.slice(); // [1, 2, 3]

const joinArr = [1, 2, 3, 4];

joinArr.join(); // 1,2,3,4
joinArr.join(''); // 1234
joinArr.join(':'); // 1:2:3:4

const reverseArr = [1, 2, 3];
const reverseArrResult = reverseArr.reverse();

console.log(reverseArrResult); //[3, 2, 1]

console.log(reverseArr);//[3, 2, 1]

const fillArr = [1, 2, 3];

//인수로 전달받은 배열의 처음부터 끝까지 요소로 채운다.
fillArr.fill(0);

console.log(fillArr); // [0, 0, 0]

const fillArr2 = [1, 2, 3];

//인수로 전달받은 값 0을 인덱스 1부터 끝까지 요소로 채운다.
fillArr2.fill(0, 1);

console.log(fillArr2); // [1, 0, 0]

const fillArr3 = [1, 2, 3, 4, 5];

//인수로 전달받은 값 0을 인덱스 1부터 3이전까지 요소로 채운다.
fillArr3.fill(0, 1, 3);

console.log(fillArr3); // [1, 0, 0, 4, 5]