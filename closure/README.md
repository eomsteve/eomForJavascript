# 클로저

클로저는 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어세서 사용되는 중요한 특성이다. 

> “A closure is the combination of a function and the lexical environment within which that function was declared.”
> 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

```js
function outerFunc(){
    let x = 10;
    let innerFunc = () => console.log(x);
    innerFunc();
}

outerFuc();
```

중첩함수 `innerFunc` 의 상위 스코프는 외부 함수 `outerFunc`의 스코프다. 따라서 중첩합수 내부에서 자신을 포함하고 있는 외부함수 `outerFunc` 의 x변수에 접근할 수 있다.

만약 `innerFunc` 함수가 `outerFunc`함수의 내부에서 정의된 중첩 함수가 아니라면 `innerFunc`함수를 `outerFunc`함수의 내부에서 호출한다 하더라도 `outerFunc` 함수의 변수에 접근할 수 없다.

## 렉시컬 스코프

자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했늕지에 따라 상위 스코프를 결정한다. 이를 렉시컬 스코프라 한다.

```js
const x = 1

function foo(){
    const x = 10;
    bar();
}

function bar(){
    console.log(x);
}

foo(); // 1
bar(); // 1
```

`foo` 와 `bar` 함수의 상위 스코프는 전역에서 정의했으므로 전역이다. 스코프 체인 따라서 "함수의 상위 스코프를 결정한다."는 것은 "렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다." 와 같다. 

상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경에 의해 결정된다. 이것이 렉시컬 스코프이다.

## 함수 객체의 내부 슬롯 `[[Enviroment]]`

함수는 자신의 내부슬롯 `[[Enviroment]]`에 자신이 정의된 환경, 즉 상위 스코프의 참조를 저장한다.

따라서 함수 객체의 내부 슬롯에 저장된 현재 실행중인 실행 컨택스트의 렉시컬 환경의 참조가 상위 스코프다. 또한 자신이호출 되었을때 생성될 함수 랙시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장될 참조값이다. 함수 객체는 내부 슬롯 `[[Enviroment]]` 에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 기억한다.

```js
const x = 1;

function foo(){
    const x = 10;
    //상위스코프는 함수 정의 환경에 따라 결정된다
    //함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
    bar();
}

// 함수 bar()는 자신의 상위 스코프인 전역 렉시컬 환경을 [[Enviroment]]에 저장하여 기억한다.
function bar(){
    console.log(x);
}

foo();
bar();
```

foo 함수와 bar 함수는 모두 전역에서 함수 선언문으로 덩의의되었다. 따라서 두 함수는 전역 코드가 평가되는 시점에 쳥가되어 함수 객체를 생성하고, 전역 객체 `window`의 메서드가된다. 이때 생성된 함수 객체의 내부 슬롯 `[[Enviroment]]`에는 함수 정의가 평가된 시점, 즉 전역 코드 평가 시점에 실행중인 실행 컨텍스트의 랙시컬 환경인 전역 랙시컬 환경의 참조가 저장된다. 

함수가 호출되면 함수 코드를 평가하기 시작하는데. 평가는 아래 순서대로 진행된다. 

1. 함수 실행 컨택스트 생성
2. 함수 랙시컬 환경 생성
   1. 함수 환경 레코드 생성
   2. this 바인딩
   3. 외부 렉시컬 환경에 대한 참조 결정

이때 외부 랙시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯에 저장된 렉시컬 환경의 참조가 할당된다.

## 클로저와 랙시컬 환경

```js
const x = 1;

function outer(){
    const x = 10;
    const inner = function () { console.log(x); };
    return inner;
}

const innerFunc = outer();
innerFunc(); // 10
```

`outer` 함수를 호출하면 `outer`함수는 중첩 함수 `inner`를 반환하고 생명주기를 마감한다. 이뎨 `outer`함수의 지역변수 x와 변수 값 10을 저장하고 있던 `outer`함수의 실행 컨텍스트가 제거되었으므로, `outer` 함수의 지역변수 x 또한 생명주기를 마감해 x변수에 접근할 수 있는 방법은 없어 보인다.  그러나 위 코드의 실행 결과는 10이다. **외부 함수보다 중첩 함수가 더 오래 유지되는 경우  중첩 함수는 외부 함수의 변수를 참조할 수 있다. 이러한 중첩 함수를 클로저라고 부른다.**

자바스크립트의 모든 함수는 자신의 상위 스코프를 기억한다고 했다. 따라서 함수를 어디서 호출하든 상관없이 함수는 언제나 자신이 기억하는 상위 스포프의 식별자를 참조할 수 있으며 식별자에 바인딩 된 값을 변경할 수도 있다. 

자바스크립트 클로저가 인정되지 않는 경우
* 상위 스코프의 식별자를 참조하지 않는 경우 
* 외부함수보다 중첩함수의 생명주기가 짧아 외부함수 소멸전에 중첩함수가 소멸될 경우

클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고, 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.

## 클로저 활용

클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다. 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.

```js
//카운트 상태 변수
let num = 0;

//카운트 상태 변경 함수
const increase = function (){
    //카운트 상태를 1만큼 증가 시킨다.
    return ++num;
}

console.log(increase())
```

1. 카운트 상태는 increase함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
2. 이를 위해 카운트 상태(num변수)는 increase 함수만이 변경할 수 있어야 한다.

하지만 카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 누구나 접근할 수 있고 변경할 수 있다. 만약 누군가에 의해 의도치 않게 카운트 상태, 즉 전역 변수 num의 값이 변경되면 이는 오류로 이어진다.

```js
//카운트 상태 변경 함수
const increase = function (){
    //카운트 상태 변수
    let num = 0;

    //카운트 상태를 1만큼 증가 시킨다.
    return ++num;
}

//이전 상태를 유지하지 못한다.
console.log(increase()); //1
console.log(increase()); //1
console.log(increase()); //1
```
카운트 상태를 안전하게 변경하고 유지하기위한 전역변수 num을 지역변수로 변경하여 의도치 않은 변경은 방지했으나 함수가 호출될 때마도 num은 0으로 초기화 되기 때문에 출력 결과는 언제나 1 이다. 이전 상태를 유지할 수 있도록 클로저를 사용해보자

```js
//카운트 상태 변경 함수
const increase = (function (){
    //카운트 상태 변수
    let num = 0;

    //카운트 상태를 1만큼 증가 시킨다.
    return function () {
        return ++num;
    }
}());

//이전 상태를 유지하지 못한다.
console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```

위 코드가 실행되면 실행 함수가 호출되고 실행 함수가 반환한 함수가 increase 변수에 할당된다. increse변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시 실행 함수의 랙시컬 환경을 기억하는 클로저이다.

이처럼 글로저는 상태가 의도치 않게 변경되지 않도록 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용하여 상태를 안전하게 변경하고 유지하기 위해 사용한다.

변수 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있다. 외부 상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다. 

```js
function makeCounter(pramFunc){
    let counter = 0;

    return function(){
        counter = pramFunc(counter);
        return counter;
    }
}

function increase(n){
    return ++n
}

function decrease(n){
    return --n
}

const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

makeCounter 함수를 호출해 함수를 반환할 대 반환된 함수는 자신만의 독립된 랙시컬 환경을 갖는다. 이는 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문이다.

위 예제에서 전역변수 increaser와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환셩을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않는다. 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다. 이를 위해서는 makeCounter 함수를 두 번 호출하지 말아야 한다.

```js
const counter = (function() {

    let counter  = 0;

    return function(aux){
        counter = aux(counter);
        return counter;
    };
}());

function increse(n){
    return ++n;
}

function decrease(n){
    return --n;
}

console.log(counter(increase())); // 1
console.log(counter(increase())); // 2
console.log(counter(decrease())); // 1
console.log(counter(decrease())); // 0
```

## 캡슐화와 정보 은닉

캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는것을 말한다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라 한다.

정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는것을 방지해 정보르 보호하고, 객체간의 상호 의존성, 결합도를 낮추는 효과가 있다.

```js
function Person(name, age){
    this.name = name; //public
    let _age = age; // private

    this.sayHi = function(){
        console.log(`Hi! My name is ${this.name}. I am ${_age} old`)
    };
}

const me = new Person('Lee', 20);
me.sayHi(); // Hi my name is Lee. I am 20 old
console.log(me.name);//Lee
console.log(me._age);// undefined

const you = new Person('Kim', 30);
you.sayHi(); // Hi my name is Kim. I am 30 old
console.log(you.name); // Kim
console.log(you._age);// undefined
```

name 프로퍼티는 현재 외부로 공개되어 있어서 자유롭게 참조하거나 변경할 수 있다. 하지만 _age변수는 Person생성자 함수의 지역변수이므로 Person 생성자 함수 외부 에서 참조하거나 변경할 수 없다. 

하지만 위 예제의 sayHi메서드는 인스턴스 메서드이므로 Person객체가 생성될 때마다 중복 생성된다. 프로토타입 메서드로 변경하여 sayHi메서드의 중복생성을 방지 할수 있다.

```js
const Person (function () {
    let _age = 0;

    function Person(name, age){
        this.name = name;
        _age = age;
    }

    Person.prototype.sayHi = function (){
        console.log(`Hi my name is ${this.name}. I am ${_age}`);
    };

    return Person;
}());

const me = new Person('Lee', 20);
console.log(me.name); // Lee
console.log(me._age); // undefined
const you = new Person('Kim', 30);
you.sayHi(); // Hi my name is Kim. I am 30 old
console.log(you.name); // Kim
console.log(you._age);// undefined
```

프로토타입을 이용해 메서드를 하나만 사용해도 각각 맞는 함수 호출을 할수 있게 되었다. 하지만 생성자 함수가 여러 개의 인스턴스를 생성할 경우 _age변수의 상태가 유지되지 않는다. 프로로타입 메서드가 단 한번 생성되는 클로저이기 때문이다.

자바스크립트는 정보 은닉을 완전하게 지원하지 않는다. 인스턴스 메서드를 사용한다면 자유 변수를통해 private를 흉대 낼 수는 있지만 프로토타입 메서드를 사용하면 이마저도 물가능해진다. private필드를 정의할 수 있는새로운 표준 사양이 제안되어있다. 표준 사양이 제안되어있다. 

--------------------------------
references

https://poiemaweb.com/js-closure