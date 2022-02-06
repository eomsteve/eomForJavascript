# 화살표 함수

화살표 함수는 function 키워드 대신 화살표를 사용하여 기존의 함수정의 방식보다 간략하게 함수를 정의할 수 있다. 화살표 함수는 표현만 간략한것이 아니라 내부 동작도 기존의 함수보다 간략하다. 특히 화살표 함수는 콜백 함수 내부에서 `this`가 전역 객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.

## 화살표 함수 정의

화살표 함수는 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의해야 한다. 호출 방식은 기존 함수와 동일하다. 
```js
const multiply = (x, y) => x * y;
multiply(2, 3);
```
매개변수가 여러개일 경우 소괄호 안에 매개변수를 선언한다.
```js
const arrow = (x, y) =>{...};
```
매개변수가 한 개인 경우 소활호를 생략할 수 있다.
```js
const arrow = x =>{...};
```
매개변수가 없는 경우 소괄호를 생략할 수 없다.
```js
const arrow = () =>{...};
```

### 함수 몸체 정의

함수 몸체가 하나의 문으로 구성된다면, 함수 몸체를 감싸는 중괄호를 생략할 수 있다. 이때 함수 몸체 내부의 문의 값으로 평가될 수 있는 표현식인 문이라면 암묵적으로 반환된다.

```js
const power = x => x ** 2;
power(2); // 4

//위 표현은 다음과 동일하다.
const power = (x) => {return x ** 2};
```

함수 몸체를 감싸는 중괄호 {}를 생략한 경우 함수 몸체 내부의 문이 표현식이 아닌 문이라면 에러가 발생한다. 

```js
const arrow = () => const x= 1; //error

//위 표현은 다음과 같이 해석된다.
const arrow = () => {return const x = 1};
```

따라서 함수 몸체가 하나의 문으로 구성된다 해도 함수 몸체의 문이 표현식이 아닌 문이라면 중괄호를 생략할 수 없다.

객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호로 감싸 주어야 한다.
```js
const creat = (id, content) => ({id, content});
creat(1, 'Js');

//위 표현은 다음과 동일하다.
const creat = (id, content) => {return {id, concent}; };
```

객체 리터럴을 소괄호로 감싸지 않으면 객체 리터럴의 중괄호 {}를 함수 몸체를 감싸는 중괄호{} 로 잘못 해석한다.

함수 몸체가 여러개의 문으로 구성된다면 함수 몸체를 감싸는 중괄호를 생략할 수 없다. 이때 반환값이 있더면 명시적으로 반환해야 한다.

```js
const sum = (a, b) =>{
  const result = a + b;
  return result;
};
```

화살표 함수도 즉시 실행 함수로 사용할 수 있다.
```js 
const person = (name => ({
  sayHi() { return `Hi My Name is ${name}! `; };
}))('Lee');

console.log(person.sayHi());
```

### 화살표 함수와 일반 함수의 차이

화살표 함수와 일반 함수의 차이는 다음과 같다.

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.
2. 중복된 매개변수 이름을 선언할 수 없다.
3. 화살표 함수는 함수 자체의 `this`, `arguments`, `super`, `new.target`바인딩을 갖지 않는다.

## this

화살표 함수가 일반 함수와 구별되는 가장 큰 특징은 바로 this다. 그리고 화살표 함수는 다른 함수의 인수로 전달되어 콜백함수로 사용되는 경우가 많다.

화살표 함수의 `this`는 일반 함수의 this와 다르게 동작한다. 이는 콜백 함수의 this문제, 즉 콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된것이다. 

콜백 함수의 this와 외부 함수의 this가 서로 다른 값을 가리키고 있기 떄문에 생기는 "콜백 함수 내부의 this문제"를 해결하기 위해서 `ES6 이전`에는 다음과 같은 방법을 사용했다.

1. add 메서드를 호출한 `prefixer`객체를 가리키는 this를 일단 회피시킨 후에 콜백 함수 내부에서 사용한다.
```js

add(arr){
  const that = this;
  return arr.map(function (item){
    //this대신 that을 참조한다.
    return that.prefix + ' ' + item;
  });
}

```

2. Array.prototype.map의 두 번째 인수로 add 메서드를 호출한 `prefixer`객체를 가리키는 this를 전달한다.

```js
add(arr){
  return arr.map(function (item){
    return this.prefix + ' ' + item;
  }, this);
}
```

3. Function.prototype.bind 메서드를 사용하여 add메서드를 호출한 `prefixer`객체를 가리키는 this를 바인딩한다.

```js
add(arr){
  return arr.map(function (item){
    return this.prefix + ' ' + item;
  }.bind(this));
}
```

ES6에서든 화살표 함수를 사용하여 콜백 함수 내부의 this 문제를 해결할 수 있다.

```js
class Prefixer {
  constructor(prefix){
    this.prefix = prefix;
  }

  add(arr){
    return arr.map(item => this.prefix + item);
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition','user-select']));
//['-webkit-transition','-webkit-user-select']
```
화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다. 이를 lexical this라 한다. 이는 마치 렉시컬 스코프와 같이 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.

화살표 함수는 함수 자체의 this바인딩이 존재하지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 this를 탐색한다.

만약 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 this바인딩이 없으므로 스코프 체이낭에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 this를 참조한다.

메서드를 화살표 함수로 정의하는것은 피해야 한다.

```js
const person = {
  name : 'John',
  sayHi: () => console.log(`Hello ${this.name}`);
};

person.sayHi(); // Hello
```

위 예제의 경우 sayHi프로퍼티에 할당된 화살표 함수 내부의 this는 메서드를 호출한 객체인 person을가리키지 않고 상위 스코프인 전역의 this가 가리키는 전역객체를 가리킨다. 따라서 화살표 함수로 메서드를 정의하는것은 바람직하지 않다. 메서드를 정의할 때는 ES6축약 메서드를 사용하는것이 좋다.

```js
const person = {
  name: 'John',
  sayHi(){
    console.log(`hello ${this.name}`);
  }
};

person.sayHi(); // hello John
```

클래스에서 화살표 함수 정의
```js
class Person{
  name = 'John';
  sayHi= () => console.log(`Hello ${this.name}`); 
}

const person = new Person();
person.sayHi(); // Hello John
```

sayHi클래스 필드에 할당한 화살표 함수의 상위 스코프는 사실 클래스 외부다. 하지만 this는 클래스외부의 this 를 참조하지 않고 클래스가 생성할 인스턴스를 참조한다. 따라서 sayHi클래스 필드에 할당한 화살표 함수 내부에서 참조한 this는 constructor내부의 this바인딩과 같다. constructor 내부의 this 바인딩은 클래스가 생성할 인스턴스를 가리키므로 sayHi클래스 필드에 할당한 화살표 함수 내부의 this또한 클래스가 생성한 인스턴스를 가리킨다. 

하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메서드가 아니라 인스턴스 메서드가 된다. 따라서 메서드를 정의할때는 ES6메서드 축약 표현으로 정의한 ES6메서드를 사용하는것이 좋다.

```js
class Person{
  //클래스 필드 정의
  name = 'Lee';

  sayHi(){
    console.log(`Hi ${this.name}`);
  }
}

const person = new Person();
person.sayHi(); // Hi Lee
```
