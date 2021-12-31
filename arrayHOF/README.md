# HOF(high order functino) in array : 배열 고차함수

고차함수는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다.

고차함수는 외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에 기반을두고 있다.

함수형 프로그래밍은 조건문과 반목문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임이다.

험수형 프로그래밍은 결국 순수 함수를 통해 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이려는 노력의 일환이다.


## Array.prototype.forEach

`forEach` 메서드는 `for`문을 대체할 수있는 고차함수다. `forEach` 메서드는 자신의 내부에서 반복문을 실행한다.

반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출한다.

```js
const fruits = ['apple', 'orange', 'banana', 'mango'];

for(let i = 0; i< fruits.length; i++){
    console.log(fruits[i]);
}

//forEach

fruits.forEach(fruit => {
    console.log(fruit);
})
```
배열의 모든 요소를 순회하며 콜백 함수를 반복호출한다.

`forEach` 메서드는 `for` 문과는 달리 `break`, `continue`문을 사용할 수 없다. 배열을 빠짐없이 순회하되 중단할 수 없다.

`forEach` 메서드는 콜백 함수를 호출할 때 배열의 요소값, 인덱스 `forEach` 메서드를 호출한 배열(`this`)을 순차적으로 호출한다.

```js
[1, 2, 3].forEach((item, index, arr) =>{
    //...
})
```

* `forEach` 메서드는 원본 함수를 변경하지 않지만 콜백함수를 통해 원본 배열을 변경 시킬수 있다. 

* 반환값은 항상 `undefined`다

`forEach` 메서드는 `for`문에 비해 성능지 좋지는 않지만 가독성이 좋다. 따라서 요소가 대단히 많은 배열을 순회하거나 시간이 많이 걸리는 복잡한 코드가 아니라면 `for`문 대신 `forEach`문을 권장한다.

## Array.prototype.map

`map`메서드는 자신을호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 호출한뒤 **콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.** 이때 원본 배열은 변경되지 않는다.

```js
const array = [1, 2,3,4,5,6,7,8];

//for

let squared = [];

for(let i = 0; i < array.length; i++){
    squared.push(array[i] * array[i]);
}

console.log(squared); 

//forEach

let squaredForEach =[];

array.forEach(item=>{
    squaredForEach.push(item*item);
});

console.log(squaredForEach);

//map
//반환값이 배열이므로 빈배열 생성x

let cal = n => n * n;

let squaredMap = array.map(cal);

console.log(squaredMap)
console.log(array); // 기존 배열은 변화가 없다.
```

## Array.prototype.filter

`filter` 메서드는 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출한다.

콜백 함수의 반환값이 `true`인 요소로만 구성된 새로운 배열을 반환한다.

```js
const counters = [1, 2, 3, 4, 5];

const odd = counters.filter(item=>{item % 2});

consoel.log(odd);//1, 3, 5
```

위 예제에서 `filter`메서드의 콜백 함수는 요소값을 2로 나눈 나머지를 반환한다.

이때 반환값이 `true`, 즉 홀수인 요소만 추출하여 새로운 배열을 반환한다.
따라서 `filter`메서드가 생성하여 반환한 새로운 배열의 `length` 프로퍼티 값은 `filter`메서드를 호출한 배열의 `length`프로퍼티 값과 같거나 작다.

`filter`메서드는 자신을 호출한 배열에서 특정 요소를 제거하기 위해 사용할 수도 있다.

## Array.prototype.reduce

`reduce`메서드는 초기값과 배열의 첫 번째 요소값을 콜백 함수에서 인수로 전달하면서 호출하고 다음 순회에는 콜백 함수의 반환값과 두 번째 요소값을 콜백 함수의 인수로 전달하면서 호출한다.
이러한 과정을 반복하여 하나의 결과값을 만들어 반환한다.

```js
const sum = [1, 2, 3, 4].recuce((accmulator, currentValue, index, arr)=> accumlator + currentValue, 0);
//0은 초기값
console.log(sum); // 10
```

`reduce`메서드는 자신을 호출한 배열의 모든 요소를 순회하며 하나의 결과값을 구해야 하는 경우에 사용한다.

## reduce활용

### 평균 구하기

```js
let values =[1, 2, 3, 4, 5, 6];

let average = values.reduce((acc, cur, i, {length})=>{
    return i === length - 1 ? (acc+cur) / length : acc + cur;
},0);

//(인수, 현재, 인덱스, 배열길이)
```

### 최대값 구하기

```js
let maxVal = [1, 2, 3, 4, 5, 6];

let max = maxVal.reduce((acc,cur) =>{
    acc > cur ? acc : cur
},0);

console.log(max);//6
```

### 중복횟수 구하기

```js
let bucket = ['banana', 'apple', 'orange', 'orange', 'apple'];

const cnt = bucket.reduce((acc,cur) =>{
    acc[cur] = (acc[cur] || 0) + 1;
},{});

//첫 번째 순환시 acc는 초기값인 {}이고
//cur은 첫 번째 요소인 'banana'다
//초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로 할당한다.
//만약 프로퍼티값이 첫등장이면 프로퍼티 값을 1로 초기화 한다.

console.log(cnt); //{'banana' : 1, 'apple' : 2, 'orange': 2}
```

이처럼 모든 고차함수는 reduce메서드로 구현할 수 있다. 

초기값은 첫 번째 인수로 전달된다. 즉, `reduce`메서드의 두 번째 인수로 전달하는 초기값은 생략할 수 있다.

* 빈 배열로 `reduce`메서드를 호출하면 에러가 발생한다.
  >이때 초기값을 전달하면 에러가 발생하지 않는다.

