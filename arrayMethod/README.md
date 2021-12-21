# array methods

자바 스크립트는 배열을 다룰 때 유용한 다양한 빌트인 메서드를 제공한다.

## 배열 생성자 메서드

Array 생성자 함수를 통해 배열을 생성할 수도 있다. Array 생성자 함수는 전달된 인수의 개수에 따라 다르게 동작하므로 주의가 필요하다.

* 전달된 인수가 1개이고 숫자인경우 length 프로퍼티값이 인수인 배열을 생성한다.
```js
const createArr = new Array(10);
console.log(createArr); // [empty * 10]
console.log(createArr.length)// 10
```

* 전달된 인수가 없는 경우 빈 배열을 생성한다. 배열리터럴 []과 같다.
* 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열일 생성한다.

```js
const create2 = Array(1,2,3); // [1, 2, 3]

const create3 = Array({});//[{}]
```

Array 생성자 함수는 new 연산자와 함께 호출하지 않더라도 배열을 생성하는 생성자함수로 동작한다.

### Array.of

`ES6`에서 도입된 `Array.of` 메서드는 전달된 인수를 요소로 갖는 배열을 생성한다. 

```js
const ofArr = Array.of(1); // [1];

const ofArr2 = Array.of(1,2,3);//[1, 2, 3]

const ofArr3 = Array.of('string'); // ['string']
```

### Array.from

`ES6` 에서 도입된 `Array.from`메서드는 유사배열 객체, 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환한다.

```js
//유사배열 객체를 변환하여 배열을 생성한다. 
const fromArr = Array.from({length:2, 0:'a', 1: 'b'}); // ['a','b']
//이터러블을 변화하여 배열을 생성한다.
const fromArr2 = Array.from('hello'); // ['h','e','l','l','o']
```

`Array.from`을 사용하면 두 번째 인수로 전달한 콜백 함수를통해 값을 만들면서 요소를 채울 수 있다. 

## 배열 메서드

### Array.isArray

`Array.isArray`는 전달된 인수가 배열이면 `true`, 배열이 아니면 `false` 를 반환한다.

```js
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
```

### Array.indexOf

`indexOf`메서드느 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환한다.

* 원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스를 반환한다.
* 원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1을 반환한다.

```js
const arr = [1, 2, 2, 3];

//배열 arr에서 요소 2를 검색하여 첫 번째 검색된 요소의 인덱스를 반환한다.
arr.indexOf(2); // 1

// 배열 arr에 요소 4가 없으므로 -1을 반환한다.
arr.indexOf(4); // -1

//두 번째 인수는 검색을 시작할 인덱스다. 두 번째 인수를 생략하면 처음부터 검색한다.

arr.indexOf(2,2); // 2
```
`indexOf` 메서드는 배열에 특정 요소가 존재하는지 확인할 때 유용하다.

```js
const food = ['apple', 'banana', 'orange'];

if(food.indexOf('apple') === -1){
    food.push('apple');
}
```

`indexOf` 메서드 대신 `includes` 메서드를 사용하면 가독성이 더 좋다.

```js
const foods = ['apple', 'banana', 'orange'];
if(!foods.includes('apple')){
    foods.push('apple');
}
```

### Array.push

`push` 메서드는 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다. `push`메서드는 원본 배열을 직접 변경한다.

```js
const pushArr = [1,2];

//인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.
let pushResult = pushArr.push(3, 4);

console.log(pushResult); //4

console.log(pushArr);//[1,2,3,4]
```

`push` 메서드는 성능 면에서 좋지않다. 마지막 요소로 추가할 요소가 하나뿐이라면 length프로퍼티를 사용하여 배열의 마지막에 값를 직접 추가할 수 있다. 이 방법이 `push`메서드보다 빠르다.

```js
const lastPush = [1, 2];

lastPush[lastPush.length] = 3;

console.log(lastPush); // [1, 2, 3]
```

### Array.pop

`pop` 메서드는 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이면 `undefined`를 반환한다. `pop` 메서드는 원본 배열을 직접 변경한다.

```js
const popArr = [1, 2];

//원본 배열에서 마지막 요소를 제거하고, 제거한 요소를 반환한다.
let popResult = popArr.pop();
console.log(popResult); // 2

//pop 메서드는 원본 배열을 직접 변경한다. 
console.log(popArr); // [1]
```

* `pop`과 `push`메서드를 이용하면 스택(first-in-last-out)을 구현할 수 있다.


### Array.unshift

`unshift`메서드는 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다. `unshift` 메서드는 원본 배열을 직접 변경한다.

```js
const unshiftArr = [1, 2];

//인수로 전달받은 모든 값을 원본 배열의 선두 요소로 추가하고 변경된 length 프로퍼티 값을 반환한다.
let unshiftRsult = unshiftArr.unshift(3, 4);

console.log(unshiftRsult); //4

console.log(unshiftArr); //[3, 4, 1, 2]
```
`unshift` 메서드보다는 스프레드 문법을사용하는 편이 좋다.

### Array.shift

`shift` 메서드는 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다. 원본 배열이 빈 배열이면 `undefined`를 반환한다.
```js
const shiftArr = [1, 2];

//원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
let shiftRsult = shiftArr.shift();

console.log(shiftRsult); //1

console.log(shiftArr); //[2]
```

* `shift` 메서드와 `push` 메서드를 이용하면 큐(first-in-frist-out)를 구현할 수 있다. 

### Array.concat

`concat`메서드는 인수로 전달된값들 을 원본 배열의 마지막 요소로 추가한 새로운 배열을 반환한다. 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운배열의 요소로 추가한다. 원본 배열은 변경되지 않는다.

```js
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
```

`push`와 `unshift`메서드는 `concat`메서드로 대체할 수 있다. 

* `push`와 `unshift`메서드는 원본 배열을 직접 변경하지만 `concat` 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다. 따라서 `push`와`unshift` 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야하며, `concat` 메서드를 사용할 경우 반환값을 반드시 변수에 할당 받아야 한다.

### Array.splice

splice : 접착

push, pop, unshift, shift 메서드는 모두 원본 배열을직접 변경하는 메서드이며 원본 배열의 처음아나 마지막에 요소를 추가하거나 제거한다.

원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 재거하는 경우 `splice` 메서드를 사용한다.

`splice` 메서드는 3개의 매개변수가 있으며 원본 배열을 직접 변경한다.

* start : 원본 배열의 요소를 제거하기 시작할 인덱스다. start만 지정하면 start 부터 모든 요소를 제거한다. start가 음수인 경우 배열의 끝에서의 인덱스를 나타낸다. 
* deleteCount : 원본 배열의 요소를 제거하기 시작할 인덱스인 start부터 제거할 요소의 갯수다. 0일경우 아무런 요소도 제거되지 않는다 (옵션)
* items: 제거한 위치에 삽입할 요소들의 목록이다. 생략할 경우 요소들을 제거하기만 한다(옵션)

```js
//array.splice(start, deleteCount(option), items...(option))

const spliceArr = [1, 2, 3, 4];

//인덱스 1부터 2개의 요소를 제거하고 그 자리에 20, 30을 삽입한다.
const spliceResult = spliceArr.splice(1, 2, 20, 30);

//제거한 요소가 배열로 반환된다.
console.log(spliceResult); // [2,3]

console.log(spliceArr);//[1,20, 30, 4]
```

### Array.slice

`slice`메서드는 인수로 전달된 범위의 요소들을 복사하여 배열로 반환한다. 원본 배열은 변경되지 않는다.

`slice` 메서드는 두 개의 매개변수를 갖는다.
* start : 복사를 시작할 인덱스다. 음수의 경우 배열의 끝에서의 인덱스를 나타낸다.
* end : 복사를 종료할 인덱스다. 이 인덱스에 해당하는 요소는 복사되지 않는다. end 는 생략 가능하며 생략 시 기본값은 length프로퍼티 값이다.

```js
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
```

### Array.join

`join`메서드는 원본 배열의 모든 요소를 문자열로 변환한 후, 인수로 전달받은 문자열로 연결한 문자열을 반환한다. 구분자는 생략 가능하며 기본 구분자는 콤마다.

```js
const joinArr = [1, 2, 3, 4];

joinArr.join(); // 1,2,3,4
joinArr.join(''); // 1234
joinArr.join(':'); // 1:2:3:4
```

### Array.reverse

`reverse` 메서드는 원본 배열의 순서를 반대로 뒤집는다. 이댸 원본 배열이 변경된다. 반환값은 변경된 배열이다.

```js
const reverseArr = [1, 2, 3];
const reverseArrResult = reverseArr.reverse();

console.log(reverseArrResult); //[3, 2, 1]

console.log(reverseArr);//[3, 2, 1]
```

### Array.fill

`ES6`에서 도입된 `fill` 메서드느 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채운다. 이떄 원본 배열이 변경된다.

```js
const fillArr = [1, 2, 3];

//인수로 전달받은 배열의 처음부터 끝까지 요소로 채운다.
fillArr.fill(0);

console.log(fillArr); // [0, 0, 0]
```

두 번째 인수로 요소 채우기를 시작할 인덱스를 전달할 수 있다.

```js
const fillArr2 = [1, 2, 3];

//인수로 전달받은 값 0을 인덱스 1부터 끝까지 요소로 채운다.
fillArr2.fill(0, 1);

console.log(fillArr2); // [1, 0, 0]
```

세 번재 인수로 요소 채우기를 멈출 인덱스를 전달할 수 있다.

```js
const fillArr3 = [1, 2, 3, 4, 5];

//인수로 전달받은 값 0을 인덱스 1부터 3이전까지 요소로 채운다.
fillArr3.fill(0, 1, 3);

console.log(fillArr3); // [1, 0, 0, 4, 5]
```

`fill`메서드로 요소를 채울 경우 모든 요소를 하나의 값만으로 채울 수밖에 없다는 단점이 있다.

### Array.includes

`ES7`에서 도입된 `includes`메서드는 배열 내에 특정 요소가 포함되어있는지 확인하여 `true` 또는 `false`를 반환한다. 첫 번째 인수로 검색할 대상을 지정한다.

두 번재 인수로 검색을 시작할 인덱스를전달할 수 있다. 

----
references 

모던자바스크립트 deep dive