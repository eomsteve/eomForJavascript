# 변수

변수(variable)는 데이터를 저장할 때 쓰이는 '이름이 붙은 저장소' 이다.

예를들어 value 라는 이름에 1 이라는 값을 넣는다면

```javascript
let value = 1;
//오른쪽것을 왼쪽에 집어넣는것, 값을 집어넣는것
let month;     // 변수의 선언
let date = 25; // 변수의 선언과 동시에 초기화
month = 12;    // 변수의 초기화
//,(쉼표)를 이용하여 여러 변수를동시에 선언하거나 초기화가 가능하다.
let month, date;             // 여러 변수를 한 번에 선언
let hours = 7, minutes = 15; // 여러 변수를 선언과 동시에 초기화
month = 10, date = 5;        // 여러 변수를 한 번에 초기화
```

위와같이 표현 할 수 있다.

변수명은 오직 문자와 숫자, 기호 $ 와 _만 들어갈 수 있다. 첫 글자는 숫자가 될 수 없다.

- 변수 = 저장하는것, 할당하는것
  
- 선언 : 변수를 사용하기 위해 변수의 이름을 가진 **저장공간**을 만든다.
  
  - ![memory allocation](https://miro.medium.com/max/700/1*IiejRUFbks-TaOzJJvdoVw.jpeg)

변수는 <u>바뀔 수 있는</u> 값을 뜻하며, 값을 한번 선언하면 바꿀 수 있다.

```javascript
let value = 1;
console.log(value);
value = 2;
console.log(value);
```

# 상수

상수는 한번 선언하고 값이 바뀌지 않는 값을 의미한다. 즉, 값이 고정이다. 상수를 선언 할때는 `const` 를 이용하여 아래와 같이 선언한다.

```javascript
const pi = 3.14;
```

이렇게 상수를 선언하고 나서는 값을 바꿀 수 없다.

##### var let const

es6 이전 자바스크립트는 모든 변수를 var 를 이용해서 선언후 사용했는데, var의 문제점은 언제든 같은 이름의 변수로 재 선언, 재 할당이 가능하기 때문에 의도와 다르게 중복적으로 사용될 여지가 있어 사라졌다.

- 그래서 var는 사용하지 않는것을 추천, 거의 사장되었다.

### let, const 차이

let const의 차이는`immutable` 여부이다.

`let` 은 변수에 재할당이 가능하다.

```js
    let name = 'bathingape'
    console.log(name) // bathingape

    let name = 'javascript'
    console.log(name) 
    // Uncaught SyntaxError: Identifier 'name' has already been declared

    name = 'react'
    console.log(name) //react
```

`const`는 변수 재선언, 변수 재할당 모두 불가능하다.

```js
    const name = 'bathingape'
    console.log(name) // bathingape

    const name = 'javascript'
    console.log(name) 
    // Uncaught SyntaxError: Identifier 'name' has already been declared

    name = 'react'
    console.log(name) 
    //Uncaught TypeError: Assignment to constant variable.
```