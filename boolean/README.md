# boolean

불리언 타입의 값은논리적 참, 거짓을 나타내는 `true`와 `false`뿐이다.

## Boolean 생성자

첫 번째 매개변수로서 전달한 값은 필요할 경우 불리언값으로 변환된다. 값이 없거나 0, -0, null, false, NaN, undefined, 빈 문자열("") 이라면 객체의 초기값은 false가 된다. 문자열 "false"를 포함한 그외 다른 초기값을 true로 설정한다.

`Boolean` 객체의 true와 false값을 원시 Boolean값 true와 false와 혼동하면 안된다.

값이 undefined, null이 아닌 모든 객체는 조건문에서 true로 계산된다. 이는 값이 false인 `Boolean`객체도 포함된다. 

```js
let bool = new Boolean(false);

if(bool)
{
    //code worked
}
/*bool에 저장된 Boolean객체의 값이 false일지라도 Boolean객체 자체가 저장되어 if문 조건에서는 참인 명제가 되었다.*/
```

즉 불리언이 아닌 값을 반환할때 `Boolean`객체를 사용하는것이 아닌 Boolean() 함수를 사용한다.

값이 false인 Boolean 객체를 포함한 어떠한 객체를 Boolean 객체의 초기값으로 넘겨주더라도 새로운 Boolean 객체는 true를 가진다.

Boolean 원시 값의 자리에서 Boolean 객체를 이용해선 안된다.

### Boolean 타입 변환

다른 타입의 변수나 리터럴들을 불리언 타입으로의 타입변환 혹은 형변환을 할수 있다.

```js
//true
Boolean('h'); 
Boolean(1);
Boolean(123);
Boolean("javascript");

//false
Boolean(0);
Boolean("");
Boolean(null);
Boolean(undefined);
Boolean(NaN);
```

## javascript loose Typing

자바스크립트는 느슨한 언어이다. 느슨함의 뜻은 어떠한 변수를저장함에 있어 타입에대한 정보가 없어도 가능하고, 자바스크립트가 자동으로 어떤 타입인지 변수에 저장되는 단서를 보고 추측해 저장하기 때문이다.

타 언어 특히 자바나 C 언어같은 경우 자료형을 명시하고 그에 맞는 값을 저장한다. int, float, boolean.. 등등

느슨한 언어를 사용하므로 자바스크립트에는 `typeof` 연산자와 `==`동등, `===`일치의 개념이 존재한다.

### 타입 변환

타입 변환은 느슨한 타입과 밀접한 연관이 있다. 내부적으로 타입이 관리되기 때문에 종종 타입들이 내부적으로 바뀔 때도 있다.

```js
7 + 7 + 7 = 21;
7 + 7 + "7" = "147"
"7" + 7 + 7 = "777"
```

위의 예제는 `String` 타입을 만나기 전까지 정상적으로 계산되나 `String` 타입을 만난뒤 모든 숫자가 문자열이 되며 결합된다.


----
references 

https://xiaoyunyang.medium.com/javascript-is-a-loosely-typed-language-meaning-you-dont-have-to-specify-what-type-of-information-137408d54fc7

https://bestalign.github.io/dev/understanding-loose-typing-in-javascript/