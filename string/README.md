# 문자열(string)

문자열 타입은 텍스트 데이터를 나타내는데 사용된다.

문자열은 작은따옴표(''), 큰 따옴표(""), 백틱(``) 으로 텍스트를 감싼다. 

```javascript
var string;
string = '문자열'; // 작은 따옴표
string = "문자열"; // 큰 따옴표
string = `문자열`; // 백틱 -> template literals

string = '작은따옴표로 감싼 문자열 내의 "큰따옴표는" 문자열로 인식된다.';
string = "큰 따옴표로 감싼 문자열 내의 '작은따옴표' 는 문자열로 인식된다.";
```

다른 타입의 값과 달리 문자열을 따옴표로 감싸는 이유는 키워드나 식별자같은 토큰과 구분하기 위해서다. 

## 템플릿 리터럴(``)

`ES6`부터 템플릿 리터럴이라고 하는 문자열 표기법이 도입되었다. 멀티라인, 표현식 삽십, 태그드 템플릿등 편리한 문자열 처리 기능을제공한다. 

* 멀티라인 문자열
  * 일반 문자열은 줄바꿈이 허용되지 않아 이스케이프 시퀀스를 통해 작성해야 한다. 일반 문자열과 달리 템플릿 리터럴 내에서는 이스케이프 시퀀스를 사용하지 않고도 줄바굼이 허용되며, 모든 공백도 있는 그대로 적용된다.
* 표현식 삽입
  * 일반 문자열은 문자열 연산자 `+`를 사용해 연결 할 수 있다. `+` 연산자는 피연산자중 하나이상이 문자열인 경우 문자열 연산자로 동작한다. 그 외는 덧셈 연산자로 적용한다.
    ```js
    let first = 'sh';
    let last = 'eom';

    //문자열 연결
    console.log('My name is ' + first + ' ' + last + '.'); // My name is sh eom.
    //표현식 삽입
    console.log(`My name is ${first} ${last}.`); // My name is sh eom.
    ```

## 문자 접근

문자열에서 개개의 문자에 접근 할 수 있는 방법은 두 가지가 있다. 
* `charAt()`메서드 
    ```js
    'hello World'.charAt(4); //o
    ```

* 배열 인덱스
    ```js
    'hello World'[4]; //o
    ```

## char, string
차이점은 크게 2가지로 글자수의 제한과 내용물의 차이 이다.

`char` 의 경우 내용물이 1개의 문자로 제한된다. 해당 변수안에 값을 직접적으로 가지고 있고 값의 좌표를 가지고 있지 않다. 

`string` 은 문자열 즉 하나 하나의 문자들이 나열된 문자들의 집합이다. 그러므로 `string` 선언된 변수안에 저장된 첫문자열의 주솟값을 저장하고 있다.

자바스크립트에서는 단 하나의 문자도 문자열로서 표현이 된다. 