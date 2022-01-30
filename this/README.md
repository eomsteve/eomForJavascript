# This

메서드는 자신이 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다. 이때 메서드가 자신이 속한 객체의 프로퍼티를 참조 하려면 먼저 **자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.**

자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자로 `this`를 제공한다.

`this`는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다. `this`를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
`this`가 가리키는 값, `this`의 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

> this 바인딩 : 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를들어 변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것이다. this바인딩은 this와 this가 가리킬 객체를 바인딩하는 것이다.

자바스크립트의 `this`는 함수가 호출되는 방식에 따라 `this`에 바인딩 될 값, 즉 `this`바인딩이 동적으로 결정된다. 또한 `strict mode`역시 `this`바인딩에 영향을 준다. 

## 함수 호출 방식과 this 바인딩

this 바인딩은 함수 호출방식, 즉 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.

> ### 렉시컬 스코프와 this 바인딩 결정시기
> 함수의 상위 스코프를 결정하는 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 기점에 상위 스코프를 결정한다. 하지만 `this`바인딩은 함수 호출 시점에 결정된다.

함수의 호출방식 
1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. `Function.prototype.apply/call/bind`메서드에 의한 간접호출

### 일반 함수 호출

기본적으로 this에는 전역객체가 바인딩된다.

```js
function foo(){
  console.log("foo's this: ", this); // window
  function bar(){
    consoel.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

전역 함수는 물론이고, 중첩 함수를 일반 함수로호출하면 함수 내부의 this에는 전역 객체가 바인딩된다.

메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다. 

```js
let value = 1;

const obj = {
  value : 100,
  foo(){
    console.log("foo's this: ", this); // {value: 100, foo: f}
    console.log("foo's this.value: ", this.value); // 100

    function bar(){ //메서드 내에서 정의한 중첩 함수
      console.log("bar's this: ", this);// window
      console.log("bar's this.value: ", this.value);// 1
    }

    //메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 합수의 내부의 this에는 전역 객체가 바인딩된다.
    bar();
  }
};

obj.foo();
```

콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역객체가 바인딩된다. 

```js
let value = 1;

const obj = {
  value : 100,
  foo(){
    console.log("foo's this: ", this); // {value: 100, foo: f}
    console.log("foo's this.value: ", this.value); // 100

  setTimeout(function(){
    console.log("callback's this: ", this); //window
    console.log("callback's this.value: ", this.value); //1
    },100);
  }
};

obj.foo();
```

이처럼 일반함수로 호출된 모든 함수(중첩함수, 콜백함수) 내부의 this에는 전역 객체가 바인딩된다.

#### 메서드 내부의 중첩 함수나 콜백 함수의 this바인딩을 메서드의 this바인딩과 일치하기 위한 방법들

* 상위 스코프의 this를 할당해 할당한 변수를 this로 참조하는 방법

```js
let value = 1;

const obj = {
  value : 100,
  foo(){
    console.log("foo's this: ", this); // {value: 100, foo: f}
    console.log("foo's this.value: ", this.value); // 100
    //this바인딩을 변수 that에 할당한다.
    let that = this;

  //콜백 함수 내부에서 this대신 that을 참조한다.
  setTimeout(function(){
    console.log("callback's this: ", that); //{value: 100, foo: f}
    console.log("callback's this.value: ", that.value); //100
    },100);
  }
};

obj.foo();
```

* .bind() 메서드 사용

```js
let value = 1;

const obj = {
  value:100,
  foo(){
    //콜백 함수에 명시적으로 this를 바인딩한다.
    setTimeout(function(){
      console.log(this.value); //100
    }.bind(this),100)
  }
};

obj.foo();
```

* 화살표 함수 사용

```js
let value = 1;

const obj = {
  value:100,
  foo(){
    setTimeout(()=> console.log(this.value));// 100
  }
};

obj.foo();
```

### 메서드 호출

메서드 내부의 this에는 메서드를 호출한 객체, 즉 메서드를 호출할 대 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체가 바인딩된다. 주의할 점은 메서드 내부의 this 는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩 된다는 것이다.

```js

const person = {
  name : 'Lee',
  getName(){
    //메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  }
};

console.log(person.getName());//'Lee'
```

person객체의 getName 프로퍼티가 가리키는 함수 객체는 person객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다.따라서 getName프로퍼티가 가리키는 객체는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수도 있고 일반 변수에 할당하여 일반함수로 호출될 수도 있다.

```js
const anotherPerson = {
  name : "kim"
};

anotherPerson.getName = Person.getName;

console.log(anotherPerson.getName()); //kim

//getName 메서드를 변수에 할당.
const getName = person.getName;

//getName 메서드를 일반 함수로 호출
console.log(getName()); // ''
//일반함수로 호출된 getName함수 내부의 this는 전역을 가리킨다.
```

따라서 메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관꼐가 없고 메서드를 호출한 객체에 바인딩된다.

### 생성자 함수 

생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

```js
//생성자 함수
function Circle(radius){
  this.radius = radius;
  this.getDiameter = function(){
    return 2 * this.radius
  };
}

const circle1 = new Circle(10);
const circle2 = new Circle(5);

console.log(circle1.getDiameter());// 20
console.log(circle2.getDiameter());// 10
```

### Function.prototype.apply/call/bind 메서드에 의한 간접 호출

apply, call, bind 메서드는 Function.prototype의 메서드다. apply,call메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

```js
function getThisBinding(){
  return this;
}

const thisArg = {a:1};

console.log(getThisBinding()); //window

//getThisBinding함수를 호춣면서 인수로 전달한 객체를 getThisBinding함수의 this에 바인딩한다.
console.log(getThisBinding().apply(thisArg)); // {a : 1}
console.log(getThisBinding().call(thisArg)); // {a : 1}
```

Function.prototype.bind메서드는 apply와 call 메서드와달리 함수를 호출하지 않는다. 첫 번째 인수로 전달한 값으로 this바인딩이 교체된 함수를 새롭개 생성해 반환한다.

```js
function getThisBinding(){
  return this;
}

const thisArg = {a : 1};

//bind메서드는 첫 번째 인수로 전달한 thisArg로 this바인딩이 교체된 getThisBinding함수를 새롭게 생서해 반환한다.

console.log(getThisBinding.bind(thisArg)); // getThisBinding
//함수를 호출하지 않으므로 명시적으로() 호출해야 한다.
consoel.log(getThisBinding.bind(thisArg)()); // {a : 1}
```

## 정리

|함수 호출 방식 | `this`바인딩|
|-------------|------------|
|일반 함수 호출| 전역객체|
|메서드 호출| 메서드를 호출한 객체|
|생성자 함수 호출 | 생성자 함수가 생성할 인스턴스|
|Function.prototype.apply/call/bind 메서드에 의한 간접호출 | Function.prototype.apply/call/bind 메서드에 첫 번째의 인수로 전달한 객체