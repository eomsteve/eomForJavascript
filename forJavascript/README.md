# 반복문

반복문이란 프로그램 내에서 똑같은 명령을 일정 횟수만큼 반복하여 수행하도록 제어하는 
실행문이다.

프로그램이 처리하는 대부분의 코드는 반복적인 형태가 많으므로, 가장 많이 사용되는 실행문.

자바스크립트에서 사용할 수 있는 반복문의 형태는 다음과 같다.

1. while 문
  
2. do / while 문
  
3. for 문


### while

while 문은 특정 조건을 만족할 때 까지 계속해서 주어진 실행문을 반복 실행한다.

![](http://tcpschool.com/lectures/img_js_while.png)

```js
/*
while (표현식) {
    표현식의 결과가 참인 동안 반복적으로 실행하고자 는 실행문;
}
*/
//0부터 9까지 콘솔에 출력하는 반복
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

while 문을 사용할때는 언젠가 false가 되도록 신경써야 한다. 그렇지 않으면 무한반복하게된다.

#### do-while

do-while문은 먼저 루프를 한번 실행한 후에 표현식을 검사한다. 표현식의 결과에 상관없이 무조건 한번은 루프를 실행한다.

![](http://tcpschool.com/lectures/img_js_do.png)

```js
/*
do {
    표현식의 결과가 참인 동안 반복적으로 실행하고자 하는 실행문;
} while (표현식);
*/
let i = 0;
do {
  console.log( i );
  i++;
} while (i < 9)
//매뉴선택 옵션을 do-while문으로 짜서 선택한 결과를 계속 반복함
```

while문을 먼저 연산하고 조건을 비교한다.

#### for

특정 값에 변화를 주어가면서 조건이 만족되면 계속 반복한다.

while문을 간결하게 표현할 수있다.

![for 문](http://tcpschool.com/lectures/img_js_for.png)

```js
/*
for (초기 구문; 조건 구문// 명령문 ; 변화 구문 // 증감식;) {
  표현식의 결과가 참인 동안 반복적으로 실행하고자 하는 실행문;
}
*/

for (let i = 0; i < 10; i++) {
  console.log(i); // 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9
}
console.log(i);  // 10
// 무한 반복문 
for (;;){
    console.log("무한 반복문");
}

for (let i = 0; i < 10; i++) {

    // 조건이 참이라면 남아있는 본문은 실행되지 않는다.
    if (i % 2 == 0) continue;

    console.log(i); // 1, 3, 5, 7, 9가 차례대로 출력됨
  }
```

## for...in, for...of

### for...in
 
객체의 모든 프로퍼티를 순회하며 열기 하려면 `for...in` 문을 사용한다. 

```js
//for(변수선언문  in 객체){...}

const person = {
    name: 'eom',
    address: 'suwon'
};

//for in 문의 변수 props에 person 객체의 프로퍼티 키가 할당된다.

for(const key in person)
{
    console.log(key + ': '+ person[key]);
}
// name : eom
// address : suwon
```

`for in`문은 객체의 프로퍼티 개수만큼 순회하며 `for in`문의 변수 선언문에서 선언한 변수에 프로퍼티 키를 할당한다.

위 코드를 예시로 들자면
name, address 2개의 프로퍼티를 순회하며 첫 번째 순회에서는 프로퍼티 키 name 이 key 변수에 할당한 후 코드 블록을 실행한다.

#### 그러면 모든 객체 프로퍼티를 순회하는가?

답은 아니오다. 

`for..in` 문은 객테의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티중에서 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거한다.
위 프로퍼티가 false로 설정된 프로퍼티 는 열거되지 않는다. 

### for...of

`for...of` 문은 이터러블을 순회하면서 이터러블의 요소를 변수에 할당한다. 

`for...of`문은 내부적으로 이터레이터의 `next()`메서드를 호출하면서 이터러블을 순회하며, `next` 메서드가 반환한 이터레이터 객체의 `value`프로퍼티 값을 `for..of` 문의 변수에 할당한다. 그리고 이터레이터 리절트 객체의 `done` 프로퍼티의 값이 `false`이면 순회를 계속하고 `true`이면 순회를중단한다.

```js
for(const item of [1,2,3])
{
    //item변수에 순차적으로 1, 2, 3 이 할당된다.
    console.log(item);
}
```

## for..in vs for..of

for..in
* Iterable object이면 도두 대상으로한다. 
* 객체의 모든 열거 가능한 속성에 대해 반복한다.
* Key값을 반환한다. 배열의 경우 index

for...of
* [Symbol.iterator] 속성을 가지는 collection만 대상으로 함

* Iterable object이지만, prototype chain에 의한 Iterable은 대상에서 제외
       → Array, Map, Set, String, TypedArray, arguments 등
* value를 리턴

정리하자면, 둘의 가장 큰 차이점은 for ...in은 객체(Object)의 key를 순회하고, for ...of는 iterable객체의 value를 순회하는 데 사용한다는 것이다.
