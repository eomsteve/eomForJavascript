# 조건문

프로그램 내에서 주저인 표현식의 결과겡 따라 별도의 명령을 수행하도록 제어하는 실행문이다. 조건문에서 가장 기본이 되는 실행문은 `if`이다.

1. if 문
2. if / else 문
3. if / else if / else 문
4. switch 문

##### if 문

if문은 표현식의 결과가 참이면 주어진 실행문을 실행하며, 거짓이면 아무것도 실행하지 않는다. = "~~하다면 ~~를 해라"

![](http://tcpschool.com/lectures/img_js_if.png)

```js
let name = "kim"

/*
if (표현식) {
    표현식의 결과가 참일 때 실행하고자 하는 실행문;
}
*/
if( name === "kim"){
    console.log("이름이 같습니다");
}

//만약 name 이 다르게 된다면 출력이 안된다.
```

##### else문

if문과 같이 사용할 수 있는 else문은 if문의 표현식 결과가 거짓일때 실행문을 실행한다.

![](http://tcpschool.com/lectures/img_js_else.png)

```js
/*if (표현식) {
    표현식의 결과가 참일 때 실행하고자 하는 실행문
} else {
    표현식의 결과가 거짓일 때 실행하고자 하는 실행문.
}*/

const a = 10;
if (a > 15) {
  console.log('a 가 15 큽니다.');
} else {
  console.log('a 가 15보다 크지 않습니다.');
}
```

#### else if 문

else if 문은 if 문처럼 표현식을 설정할 수 있으므로, 중첩된 if 문을 좀 더 간결하게 표현할 수 있다.

하나의 조건문 안에서 if 문과 else 문은 단 한 번만 사용될 수 있다.

하지만 else if 문은 여러 번 사용되어 다양한 조건을 설정할 수 있다.

if / else if / else 문을 순서도로 표현하면 다음 그림과 같이 표현할 수 있다.

![](http://tcpschool.com/lectures/img_js_elseif.png)

```js
/*
if (표현식1) {
    표현식1의 결과가 참일 때 실행하고자 하는 실행문;
} else if (표현식2) {
    표현식2의 결과가 참일 때 실행하고자 하는 실행문;
} else {
    표현식1의 결과도 거짓이고, 표현식2의 결과도 거짓일 때 실행하고자 하는 실행문;
}

*/
let name = "kim";

if (name < "kim") {
  console.log( ' 김씨군요 ' );
} else if (name> "lee") {
  console.log( ' 이씨군요 ' );
} else {
  console.log( '김씨나 이씨가 아니군용' );
}
```

#### switch

switch 문은 if / else 문과 마찬가지로 주어진 조건 값에 따라 프로그램이 다른 명령을 수행하도록 하는 조건문이다.

이러한 switch 문은 if / else 문보다 가독성 측면에서 더 좋다.

```js
/*
switch (조건 값) {
    case 값1:
        조건 값이 값1일 때 실행하고자 하는 실행문;
        break;
    case 값2:
        조건 값이 값2일 때 실행하고자 하는 실행문;
        break;
    ...
    default:
        조건 값이 어떠한 case 절에도 해당하지 않을 때 실행하고자 하는 실행문;
        break;
}
*/
var x = 10;

switch (typeof x) {
    case "number":
        document.write("변수 x의 타입은 숫자입니다.");
        break;
    case "string":
        document.write("변수 x의 타입은 문자열입니다.");
        break;
    case "object":
        document.write("변수 x의 타입은 객체입니다.");
        break;
    default:
        document.write("변수 x의 타입을 잘 모르겠네요...");
        break;

}

// break 를 하지 않으면 그 다음 case 의 코드까지 실행한다.
//그리고, 맨 아래의 default: 는 device 값이 우리가
// case 로 준비하지 않은 값일 경우를 의미한다.
```

### continue, break;

#### continue 문

continue 문은 루프 내에서 사용하여 해당 루프의 나머지 부분을 건너뛰고, 바로 다음 표현식의 판단으로 넘어가게 한다.

보통 반복문 내에서 특정 조건에 대한 처리를 제외하고자 할 때 자주 사용돤다.

#### break 문

break 문은 루프 내에서 사용하여 해당 반복문을 완전히 종료시키고, 반복문 바로 다음에 위치한 실행문으로 프로그램의 흐름을 이동시킨다.

즉, 루프 내에서 표현식의 판단 결과에 상관없이 반복문을 완전히 빠져나가고 싶을 때 사용한다.

## 삼항 연산자

조건부 삼항 연산자는 javascript 에서 세 개의 피연산자를 취할 수있는 유일한 연산자 이다. 맨 앞에 조건문이 들어가고, 그 뒤로 물음표와 조건이 참 이라면 실행할 식이 물음표 뒤로 들어간다. 바로 뒤로 콜론이 들어가며 조건이 거짓이라면 실행할 식이 마지막에 들어간다. 보통 if 문의 단축형으로 쓰인다.

`condition ? True : False`

* condition : 조건으로 들어갈 표현식
* True : 조건이 참일경우 실행되는 표현식
* False : 조건이 거짓일때 실행되는 표현식

```js
let beverage = (age >= 21) ? "Beer" : "Juice";
// age가 성인이면 맥주 아니면 주스
```

### 연속된 조건문 처리하기

```js
function example(…) {
    return condition1 ? value1
         : condition2 ? value2
         : condition3 ? value3
         : value4;
}

// 위의 코드는 아래의 코드와 동일합니다.

function example(…) {
    if (condition1) { return value1; }
    else if (condition2) { return value2; }
    else if (condition3) { return value3; }
    else { return value4; }
}
```

--- 

reference
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator