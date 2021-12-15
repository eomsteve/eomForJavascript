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
- 변수 할당 : 변수에 값을 넣는것을 말한다.
  
- 변수 재 할당 : 변수의 값을 덮어씌워 변수의 값을 변화시키는것을 뜻한다.
  

변수는 <u>바뀔 수 있는</u> 값을 뜻하며, 값을 한번 선언하면 바꿀 수 있다.

```javascript
let value = 1;
console.log(value);
value = 2;
console.log(value);
```

```js
//선언
let value;
const constValue;

//할당
value = 10;
constValue = 12;

//재할당 
value = a;
constValue = 12; // error : 상수여서 재 할당이 불가능하다.
```