# 프로토타입

**_자바스크립트는 명령형, 함수형, 프로토타입 기반 객체지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어이다._**

자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 프로토타입 기반의 객체지향 프로그래밍 언어이다.

자바스크립트를 이루고있는 모든것이 객체다.

## 객체지향 프로그래밍

객체지향 프로그래밍은 실세계의 실체 인식하는 사고를 프로그래밍에 접목하는 시도에서 시작한다. 실체는 특징이나 성질을 나타내는 `속성`을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.

다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 `추상화`라 한다.

"이름"과 "주소"라는 속성을 갖는 `person`이라는 객체를 자바스크립트로 표현하면 다음과 같다.

```js
const person = {
  name:'Lee',
  address : 'Seoul'
};

console.log(person); // {name: "Lee", address : "Seoul"}
```

객체지향 프로그램은 객체의 상태를 나나태는 데이터와 상태 데이터를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.

이때, 객체의 상태를 `프로퍼티`, 동작을 `메서드`라 부른다.

객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있지만 자신의 고유한 기능을 수행하면서 다른 객체와 관계성을 가질 수 있다. 즉,다른 객체의 상태 데이터나 동작을 상속받아 사용할 수 있다.

## 상속과 프로토타입

상속은 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속바아 그대로 사용할 수 있는 것을 말한다.

자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다. 중복을 제거하는 방법은 `기존의 코드를 적극적으로 재사용하는것이다.`

```js
function Circle(radius){
  this.radius = radius;
  this.getArea = () =>{
    return math.PI * this.radius ** 2;
  };
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea);

console.log(circle1.getArea());
console.log(circle2.getArea());
```

`Circle`생성자 함수가 생성하는 모든 객체는 `radius`프로퍼티와 `getArea`메서드를 갖는다. 

* `radius`프로퍼티는 일반적으로 인스턴스마다 다르다.
* `getArea`메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용한다.

따라서 `getArea`메서드는 단 하나만 생성하여 모든 인스턴스가 공유해 사용하는것이 바람직하다.

**동일한 메서드가 반복되어 메모리가 낭비된다.**

상속을 통해 불필요한 중복을 제거해 보자

```js
function Circle(radius){ 
  this.radius;
}

//Circle생성자 함수가 생성한 모든 인스턴스가 getArea메서드를 사용할 수 있도록 프로토타입에 추가한다.
//프로토타입은 Circle생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = () =>{
  return Math.PI * this.radius  ** 2;
};

console.log(circle1.getArea === circle2.getArea);//서로다른 객체의 메서드는 같은 메서드를 공유하므로 일치연산자의 값은 True이다.

console.log(circle1.getArea());
console.log(circle2.getArea());
```

자바스크립트는 프로토타입을 기반으로 상속을 구현한다.

위의 코드에서 `getArea`메서드는 단 하나만 생성되어 프로토타입인 `Circle.prototype`의 메서드로 할당되어있다. 따라서 `Circle`생성자 함수가 생성하는 모든 인스턴스는 `getArea`메서드를 상속받아 사용할 수 있다.

자신의 상태를 나타내는 `radius`프로퍼티만 개별적으로 소유하고 내용이 동일한 메서드는 상속을 통해 공유하여 사용하는것이다.

## 프로토타입 객체

프로토타입객체는 객체간 상속을 구현한기 위해 사용된다. 
프로토타입은 어떤 객체의 상위 객체의 역할을하는 객체로서 다른 객체에 공유 프로퍼티,메서드를 제공한다.
상속받은 하위 객체는 상위 객체의 프로퍼티를 자신의 프로퍼티처럼 자유롭게 사용할 수 있다.

### `__proto__` 접근자 프로퍼티

모든 객체는 `__proto__`접근자 프로퍼티를 통해 자신의 프로토타입, 즉 `[[prototype]]` 내부 슬롯에 간접적으로 접근할 수 있다.

#### `__proto__`는 접근자 프로퍼티다.

`Object.prototype`의 프로퍼티인 `__proto__`는 getter/setter 함수라고 부르는 접근자 함수를 통해 프로토 타입을 취득하거나 할당한다. 

## 함수 객체의 prototype프로퍼티

함수 객체만이 소유하는 prototype프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

```js
(function(){}).hasOwnProperty('prototype'); // true
({}).hasOwnProperty('prototype'); // false
```

`prototype`프로퍼티는 생성자 함수가 생성할 객체의 프로토타입을 가리킨다. 따라서 생성자함수로서 호출할 수 없는 함수는 `prototype`프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

모든 객체가 가지고 있는 `__proto__`접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype`프로퍼티는 결국 결국 동일한 프로토타입을 가리킨다. 

|구분|소유|값|사용주체|사용목적
|---|----|--|------|------|
`__proto__`프로퍼티| 모든객체| 프로토 타입의 참조| 모든 객체| 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용|
|`prototype`프로퍼티 | `constructor`| 프로토타입의 참조| 생성자 함수| 생성자 함수가 자신이 생성할 객체의 프로토타입을 할당하기 위해 사용

### 프로토타입의 constructor프로퍼티와 생성자 함수

모든 프로토타입은 `constructor`프로퍼티를 갖는다. 이 `constructor`프로퍼티는 `prototype`프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.

```js
//생성자 함수`
function Person(name){
  this.name = name;
}

const me = new Person('Lee');

//me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person); // true
```

위 예제에서 Person 생성자 함수는 me 객체를 생성했다. 이때 me 객체는 프로토 타입의 constructor 프로퍼티를 통해서 생성자 함수와 연결된다. me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토 타입인 Person.prototype에는 constructor 프로퍼티가 있다. 따라서 me 객체는 프로토 타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있다.

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

리터럴 표기법에 의한 객체 생성 방식과 같이 명시적으로 `new`연선자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식도 있다.

```js
const obj = {};

const add = function(a, b){return a + b};

const arr = [1 ,2 ,3];

console.log(obj.constructor === Object); // true
```
리터럴 표기법에 의해 생성된 객체도 프로토타입이 존재한다. 하지만 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 `constructor`프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.

리터럴 표기법에 의해 성성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 성성된객체도 가상적인 생성자 함수를 갖는다. 프로토타입은 생성자 함수와 더불어 생성되며 `prototype`,`constructor`프로퍼티에 의해 연결되어 있기 때문이다.
프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

객체는 리터럴 표기법 또는 생성자 함수에 의해 생성되므로 결국 모든 객체는 생성자 함수와 연결되어 있다.

## 프로토타입 체인

```js
function Person(name){
  this.name = name;
}

Person.prototype.sayHello = function(){
  console.log(`Hi my name is ${this.name}!!`);
};

const me = new Person('Lee');

//hasOwnProperty메서드는 Object.prototype의 메서드다.
//me 객체는 프로토타입의 체인을 따라 hasOwnProperty메서드를 검색하여 사용한다.
console.log(me.hasOwnProperty('name'));//true
```

자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이를 프로토타입 체인이라 한다. `프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘 이다.`

`me.hasOwnProperty('name')`과 같이 메서드를 호출하면 자바스크립트 엔진은 다음과 같은 과정을 거쳐 메서드를 검색한다. 물론 프로퍼티를 참조하는 경우도 마찬가지다.

1. 먼저 `hasOwnProperty`메서드를 호출한 me객체에서 `hasOwnProperty`메서드를 검색한다. me객체에는 `hasOwnProperty`메서드가 없으므로 프로토타입 체인을 따라 `[[prototype]]`내부 슬롯에 바인딩되어있는 프로토타입 (위 예제의 경우 Person.prototype)으로 이동하여 `hasOwnProperty`메서드를 검색한다.
2. Person.prototype에도 `hasOwnProperty`메서드가 없으므로 프로토타입 체인을 따라 `[[prototype]]`내부 슬롯에 바인딩되어있는 프로토타입(위 예제의 경우 Object.prototype)으로 이동하여 `hasOwnProperty`메서드를검색한다.
3. Object.prototype에는 `hasOwnProperty`메서드가 존재한다. 자바스크립트 엔진은 `Object.prototype.hasOwnProperty` 메서드를 호출한다. 이때 `Object.prototype.hasOwnProperty`메서드의 this에는 me 객체가 바인딩된다.

프로토타입 체인의 최상위에 위치하는 객체는 언제나 `Object.prototype`이다. 따라서 모든 객체는 `Object.prototype`을 상속받는다. `Object.prototype`을 프로토타입 체인의 종점이라 한다. 

프로토타입 체인의 종점에서도 프로퍼티를 검색할수 없는 경우 `undefined`를 반환한다.

## 오버라이딩과 프로퍼티 섀도잉

```js
const Person = (function() {
  //생성자 함수
  function Person(name){
    this.name = name;
  }

  //프로토타입 메서드
  Person.prototype.sayHello = function() {
    console.log(`Hi my name is ${this.name}`);
  };

  return Person;
}());

const me = new Person('Lee');

//인스턴스 메서드
me.sayHello = function() {
  console.log(`hey my name is ${this.name}`);
};

//인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // hey my name is Lee
```

생성자 함수로 객체를 생성한다음. 인스턴스에 메서드를 추가했다.

프로토타입이 소유한 프로퍼티를 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 부른다.

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는것이 아니라 인스턴스 프로퍼티로 추가한다. 이때 인스턴스 메서드 `sayHello`는 프로토타입 메서드 sayHello를 오버리이딩 했고 프로토타입 메서드 sayHello는 가려진다. 이처럼 `상속 관계에 의해 프로퍼티가 가려지는 현상을 프로퍼티 섀도잉이라 한다.`

> 오버라이딩
> : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재 정의하여 사용하는 방식

> 오버로딩 : 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식이다. 자바스크립트는 오버로딩을 지원하지 않지만 `arguments`객체를 사용하여 구현할 수는 있다.

프로토타입의 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는것이 아니라 프로토타입에 직접 접근해야 한다.

```js
 Person.prototype.sayHello = function() {
   console.log(`Hi my name is ${this.name}`);
 };

//인스턴스 메서드를 삭제한다.
delete me.sayHello;
//인스턴스에는 sayHello메서드가 없으므로 프로토타입 메서드가 호출된다.
 me.sayHello(); //가려져있던 Person.prototype.sayHello프로퍼티 호출 `Hi my name is Lee`

//프로토타입 메서드 삭제
 delete Person.prototype.sayHello;

 me.sayHello(); // Type error!
```

## 상속

### `Object.create`에 의한 직접 상속
`object.create`메서드는 명시적으로프로토타입을지정하여 새로운 객체를 생성한다. 

`Object.create`메서드의 첫번째 매개변수에는 생성할 객체의 프로토타입으로 지정할 객체를 전달한다. 두 번째 매개변수에는 생성할 객체의 프로퍼티 키와 프로퍼티 디스크립터 객체로 이뤄진 객체를 전달한다. 두 번째 인수는 옵션이므로 생략 가능하다.
```js
//프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로로타입 체인의 종점에 위치한다.
// obj -> null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) == null); // true
//Object.prototype을 상속받지 못한다.
console.log(obj.toString());//type Error ! : obj.toString is not Function

//obj -> Object.prototype -> null
//obj = {};과 동일하다.
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) == Object.prototype); //true

//obj -> Object.prototype -> null
//obj = {x : 1}; 과 동일하다
obj = Object.create(Object.prototype, {
  x : {value : 1, writable: true, enumerable: true, configurable : true}
});
console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) == Object.prototype); //true

const myProto = {x : 10};
//임의의 객체를 직접 상속받는다.
//obj -> myProto -> Object.prototype -> null
obj = Object.create(myProto);
console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto);// true

//생성자 함수
function Person(name) {
  this.name = name;
}
//obj -> Person.prototype -> Object.prototype -> null
//obj = new Person('Lee'); 와 동일하다.
obj = Object.create(Person.prototype);
obj.name = 'Lee';
console.log(obj.name); //Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
```

이처럼 `Object.create`메서드는 첫 번째 매개변수에 전달한 객체의 프로토타입 체인에 속하는 객체를 생성한다. 즉, 객체를 생성하면서 직접적으로 상속을 구현하는 것이다. 이 메서드의 장점은 다음과 같다.
* new 연산자 없이도 객체를 생성할 수 있다.
* 프로토타입을 지정하면서 객체를 생성할 수 있다.
* 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.

### 객체 리터럴 내부에서 `__proto__`에 의한 직접 상속
`Object.create`메서드에 의한 직접 상속은 앞에서 다룬 것과 같이 여러 장점이 있지만 두 번째로 인자로 프포퍼티를 정의하는 것은 번거롭다. 

ES6에서 객체 리터럴 내부에서 `__proto__`접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.
```js
const myProto = {x : 10};
//객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y:20,
  //객체를 직접 상속받는다.
  // obj -> myProto -> Object.prototype -> null
  __proto__: myProto
};
/*
위 코드는 아래 코드와 동일하다.
const obj = Object.create(myProto, {
  y : {value : 20, writable: true, enumerable: true, configurable : true}
})
*/
console.log(obj.x, obj.y); .//10 20
console.log(getPrototypeOf(obj) === myProto);// true
```

## 결론

자바스크립트는 기본 데이터 타입을 제외한 모든것이 객체인 언어이다. 객체가 생성되기 위해서는 자신을 만드는데 사용된원형인 프로토타입 객체를 이용하여 객체를 만든다.

자바스크립트에서 모든 객체들은 `[[prototype]]` 라고하는 내부 슬롯을 가지고 있으며 이 내부슬롯에는 자기의 프로토타입 객체에대한 레퍼런스가 저장되어있다. 
일반적으로 자바스크립트의 내부 슬롯과 내부 메서드에 대해서는 접근할 방법이 없지만 `[[prototype]]`내부 슬롯한애서는 간접적으로 접근할 방법이 허용되게 되어있다.

객체에서 `__proto__` 프로퍼티에 접근하면 내부 슬롯에 저장된 프로토타입 객체에 접근할 수 있게 된다.
`__proto__` 는 데이터 프로퍼티가 아니라 `get, set` 메서드로 이루어진 접근자 프로퍼티이다. 

자바스크립트는 처음에 브라우저에서 사용할 수 있는 간단한 스크립트 언어를 목적으로 만들어졌기에 객체간의 상속을 구현할 때 간단하고, 불필요한 부분이 적고, 자바스크립트의 동적 타입 시스템에 잘 부합되는 프로토타입을 선택하였고 이는 자바스크립트의 특징이 되었다.

--------------------------------------------------------
references 

https://solveaproblem.dev/javascript-prototype/