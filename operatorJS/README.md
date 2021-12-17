# 연산자
## 비교 연산자

피연산자 사이의 상대적인 크기를 판단하여, 참과 거짓을 반환한다.

1. 피연산자가 둘 다 숫자면, 해당 숫자를 서로 비교한다.
  
2. 피연산자가 둘 다 문자열이면, 문자열의 첫 번째 문자부터 알파벳 순서대로 비교한다.
  

| 비교 연산자 | 설명  |
| --- | --- |
| ==  | 왼쪽 피연산자와 오른쪽 피연산자의 값이 같으면 참을 반환함. |
| === | 왼쪽 피연산자와 오른쪽 피연산자의 값이 같고, 같은 타입이면 참을 반환함. |
| !=  | 왼쪽 피연산자와 오른쪽 피연산자의 값이 같지 않으면 참을 반환함. |
| !== | 왼쪽 피연산자와 오른쪽 피연산자의 값이 같지 않거나, 타입이 다르면 참을 반환함. |
| >   | 왼쪽 피연산자의 값이 오른쪽 피연산자의 값보다 크면 참을 반환함. |
| >=  | 왼쪽 피연산자의 값이 오른쪽 피연산자의 값보다 크거나 같으면 참을 반환함. |
| <   | 왼쪽 피연산자의 값이 오른쪽 피연산자의 값보다 작으면 참을 반환함. |
| <=  | 왼쪽 피연산자의 값이 오른쪽 피연산자의 값보다 작거나 같으면 참을 반환함. |

```js
console.log('Z'>'C'); //true
console.log('blow'>'blee'); //true
console.log('see'>'se'); //true
```

- 또한 number와 string을 비교할 경우 string을 number로 바꿀수있다면 바꿔서 연산한다.

```js
console.log('3'>1); true
console.log('03'==3); true 
// 그러나 ===를 비교할 경우
console.log('03'===3); false
```

- 동등 연산자는 ==과 ===가 있다. (===은 ==과 다르게 데이터 타입이 같아야 한다.)
  - == : 동등연산자.
  - === : 일치연산자.

```js
console.log(3 == '3'); //true
console.log( 3 === '3'); //false

console.log('3'!= 3); //false
console.log('3'!==3); //true
```

**동등과 일치의 차이를 구분할 줄 알아야 한다.**

## 논리연산자

논리 연산자는, 불리언 타입 (true 혹은 false)를 위한 연산자. 논리 연산자는 if 문을 배울 때 매우 유용하다.

총 3가지가 있습니다.

- `!`: NOT
  
- `&&`: AND
  
- `||`: OR
  
- or 연산자 예시
  

```js
console.log( true || true );   // true
console.log( false || true );  // true
console.log( true || false );  // true
console.log( false || false ); // false
```

- and 연산자 예시

```js
console.log( true && true );   // true
console.log( false && true );  // false
console.log( true && false );  // false
console.log( false && false ); // false
```

- not 연산자 예시

```js
console.log( !true ); // false
console.log( !0 ); // true
```