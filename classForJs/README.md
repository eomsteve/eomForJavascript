# 클래스

클래스는 `class` 키워드르 사용하여 정의한다.

```js
//클래스 선언
class Person{}
```

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메서드는 `constructor`(생성자), 프로토타입메서드, 정적 메서드의 세 가지가 있다.
> 정적 메서드 : 정적 메서드는 클래스의 인스턴스 없이 호출이 가능하며 클래스가 인스턴스 화 되면 호출 할 수 없다. 정적 메서드는 종종 어플리케이션의 유틸리티 함수를 만드는데 사용한다.

```js
class Person {
  constructor(name){
  //인스턴스 생성 및 초기화
  this.name = name; // name의 프로퍼티는 public이다.
  }

  //프로토타입 메서드
  sayhi() {
    console.log(`Hi! My name is ${this.name}`);
  }
  //정적 메서드
  static sayHello(){
    console.log(`Hello!`);
  }
}

const me = new Person('Lee');

console.log(ma.name);//Lee
me.sayHi(); // Hi my name is lee
Person.sayHello(); // Hello!
```
클래스와 생성자 함수의 정의 방식은 유사하다

## 클래스 호이스팅

클래스는 함수로 평가된다.

```js
class Person {}

console.log(typeof Person); // function
```

단 클래스는 정의 이전에 참조할 수 없다. 

클래스 선언문도 변수선언 , 함수와 마찬가지로 호이스팅이 발생한다. 단, 클래스는 `let`, `const`키워드로 선언한 변수처럼 호이스팅 된다. 

## 인스턴스 생성

클래스는 생성자 함수이며 `new`연산자와 함께 호출되어 인스턴스를 생성한다.

함수는 new연산자의 사용 여부에 따라 일반 함수로 호출 되거나 인스턴스 생성을 위한 생성자 함수로 호출되지만 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new연산자와 함께 호출해야 한다.

```js
class Person {}

const me = new Person();
console.log(me); // Person();
```

## 메서드

클래스 몸체에서 정의할수 있는 메서드는 `constructor`, 프로토 타입 메서드, 정적 메서드의 세 가지가 있다.
> ### 클래스 정의 새로운 제안 사양
> 인스턴스 프로퍼티는 반드시 constructor 내부에서 정의해야 한다. 하지만 클래스 몸체에 메서드 뿐만 아니라 프로퍼티를 직접 정의할 수 있는 새로운 표준 사양이 제안되어 있다. 머지않아 클래스 몸체에서 메서드 뿐만 아니라 프로퍼티도 정의할 수 있게 될 것으로 보인다.

### constructor

`constructor`는 인스턴스를 생성하고 초기화 하기 위한 특수한 메서드다. `constructor`는 이름을 변경할 수 없다. 모든 함수 객체가 가지고 있는 prototype 프로퍼티가 가리키는 프로퍼타기 가리키는 프로토타입 객체의 constructor 프포퍼티는 클래스 자신을 가리키고 있다. 

```js
const me = new Person('Lee');

console.log(me);
```

Person 클래스의 constructor 내부에서 this에 추가한 name 프로퍼티가 클래스가 생성한 인스턴스의 프로퍼티로 추가 된것을 확인할 수있다. 즉 생성자 함수와 마찬가지로 cosntructor내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 된다. constructor 내부의 this는 `생성자 함수와 마찬가지`로 클래스가 생성한 인스턴스를 가리킨다.

* constructor는 클래스 내에 최대 한 개만 존재할 수 있다. 만약 클래스가 2개 이상의 constructor를 포함하면 문법 에러가 발생한다.
* constructor는 생략할 수 있다.
* constructor를 생략하면 다음과 같이 빈 constructor가 암묵적으로 정의된다. constructor를 생략한 클래스는 빈 constructor에 의해 빈 객체를 생성한다.
    ```js
    class Person {
      constructor() {}
    }

    const me = new Person();
    console.log(me);// Person{}
    ```

프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다. 

```js
class Person {
  constructor(){
    //고정값으로 인스턴스 초기화
    this.name = 'Lee';
    this.address = 'Seoul';
  }
}
//인스턴스 프로퍼티가 추가된다.
const me = new Person(); 
console.log(me);// Person {name : "Lee", address:"Seoul"}
```

인스턴스를 생성할 때 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려만 다음과 같이 constructor에 매개변수를 선언하고 인스턴스를 선언할 때 초기값을 전달한다.

```js
class Person {
  constructor(name, address){
    //인수로 인스턴스 초기화
    this.name = name;
    this.address = address;
  }
}
//인수로 초기값을 전달한다. 초기값은 constructor에 전달된다.
const me = new Person('Lee','Seooul'); 
console.log(me);// Person {name : "Lee", address:"Seoul"}
```
constructor 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 클래스의 기본 동작을 훼손하므로 constructor 내부에서 return 문은 반드시 생략해야한다.

### 프로토타입 메서드

생성자 함수를 사용하여 인스턴스를 생성하는 경우 프로토타입 메서드를 생성하기 위해서 다음과 같이 명시적으로 프로토타입 메서드를 추가해야 한다.

```js
//생성자 함수
function Person(name){
  this.name = name;
}

Person.prototype.sayHi = function (){
  console.log(`Hi my name is ${this.name}`);
};

const name = new Person('Lee');
me.sayHi();
```

클래스 에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 `prototype`프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.

```js
class Person {
  //생성자
  constructor (name){
    this.name = name;
  }

  //프로토타입 메서드
  sayHi(){
    consol.log(`Hi my name is ${this.name}`);
  }
}

const me = new Person('Lee');
me.sayHi();
```

생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다. 결국 클래스는 생성자 함수와 같이 인스턴스를 생성하는 생성자 함수라고 볼 수 있다. 클래스는, 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 매커니즘이다.

### 정적 메서드

정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.

생성자 함수의 경우 정적 메서드를 생성하기 위해서는 명시적으로 생성자 함수에 메서드를 추가해야한다.

```js
//생성자 함수
function Person(name){
  this.name = name;
}

//정적 메서드
Person.sayHi = function (){
  console.log(`Hi`);
}

//정적 메서드 호출
Person.sayHi();
```
클래스에서는 메서드에 `static`메서드를 붙이면 정적 메서드가 된다.

```js
class Person {
  constructor(name){
    this.name = name;
  }

  //정적 메서드
  static sayHi(){
    console.log(`Hi`);
  }
}
//정적 메서드는 클래스로 호출되며 인스턴스 없이도 호출할 수 있다.
Person.sayHi(); // Hi
```
정적 메서드는 인스턴스로 호출할 수 없다. 인스턴스의 프로토타입 체인상에는 클래스가 존재하지 않기 때문에 인스턴스로 클래스의 메서드를 상속 받을 수 없다.

```js

const me = new Person('Lee');
me.sayHi();// TypeError: me.sayHi is not a function
```

### 정적 메서드와 프로토타입 메서드의 차이

정적 메서드와 프토로타입 메서드의 차이는 다음과 같다.
1. 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.
2. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴스 프로퍼티를 참조할 수 있다.

```js
class Square {
  //정적 메서드
  static area(width, heigth){
    return width * height;
  }
}

console.log(Square.area(10,10));//100
```

정적 메서드 area는 2개의 인수를 전달받아 면적을 계산한다. 이때 정적 메서드 area는 인스턴스 프로퍼티를 참조하지 않는다. 만약 인스턴스 프로퍼티를 참조해야 한다면 정적 메서드 대신 프로토타입 메서드를 사용해야 한다.

```js
class Square{
  constructor(width, heigth){
    this.width = width;
    this.height= height;
  }
  //프로토타입 메서드
  area(){
    return this.width * this.height;
  }
}

const square = new Square(10,10);
console.log(square.area());//100
```

프로토타입 메서드는 인스턴스로 호출해야 하므로 프로토타입 메서드 내부의 this는 프로토타입 메서드를 호출한 인스턴스를 가리킨다. 위의 경우 `square`객체로 프로토타입 메서드 `area`를 호출했기 때문에 `area`내부의 `this` 는 `square`객체를 가리킨다.

정적 메서드는 클래스로 호출해야 하므로 정적 메서드 내부의 this는 인스턴스가 아닌 클래스를 가리킨다.

### 클래스 정의 메서드의 특징

1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
3. 암묵적으로 `strict mode`로 실행된다.
4. for...in문이나 Object.keys메서드 등으로열거할 수 없다. 
5. 내부 메서드를 갖지않는 non-contructor다. 따라서 new 연산자와 함께 호출할 수 없다.

## 클래스 인스턴스 생성 과정

new연산자와 함께 클래스를 호출하면 생성자 함수와 마찬가지로 클래스의 내부 메서드가 호출된다. 클래스는 new 연산자 없이 호출할 수 없다.

### 1. 인스턴스 생성과 this 바인딩
new연산자와 함께 클래스를 호출하면 `constructor`의 내부 코드가 실행 되기에 앞서 암묵적으로 빈 객체가 생성된다. 이때 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정된다. 그리고 암묵적으로 생성된 빈 객체 인스턴스는 this에 바인딩 된다. 따라서 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

### 2. 인스턴스 초기화

constructor 내부 코드가 실행되어 this에 바인딩 되어 있는 인스턴스를 초기화 한다. 즉, this바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 construtor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화 한다. 만약 constructor가 생략되었다면 이 과정도 생략한다.

### 3. 인스턴스 변환

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

## 프로퍼티

### 인스턴스 프로퍼티
인스턴스 프로퍼티는 constructor내부에서 정의해야 한다.

```js
class Person {
  construtor(name){
    //인스턴스 프로퍼티
    this.name = name; // name 프로퍼티는 public이다.
  }
}

const me = new Person('Lee');

console.log(me.name);
```
construtor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 된다. 
자바스크립트에서 인스턴스 프로퍼티는 언제나 퍼블릭이다. 

### 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 앖을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.

```js
const person = {
  firstName = 'sehgo';
  lastName = 'eom';

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name){
    [this.firstName , this.lastName] = name.split(' ');
  }
}
```

```js
class Person{
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name){
    [this.firstName , this.lastName] = name.split(' ');
  }
}
```
접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할때 사용하는 접근자 함수 getter, setter함수로 구성되어있다.


### 클래스 필드 정의 제안

자바스크립트의 클래스 몸체에는 메서드만 선언할 수 있다. 따라서 클래스 몸체에 자바와 유사하게 긐래스 필드를 선언하면 문접 에러가 발생한다. 자바스크립트에서 클래스필드를 참조하는 경우 this를 반드시사용해야한다.

```js
class Person{
  //클래스 필드
  name  = 'Lee';

  construtor(){
    console.log(name); //Error!
  }
}
```

클래스 필드 정의 제안으로 인해 인스턴스 프로퍼티를 정의하는 방식은 두 가지가 되었다. 인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 있다면 constructor에서 인스턴스 프로퍼티를 정의하는 기존 방식을 사용하고, 인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 없다면 기존의 constructor에서 인스턴스 프로퍼티를정의하는 방식과 클래스 필드 정의 제안 모두 사용할수 있다.

### private 필드 정의 제안

자바스크립트는 캡슐화를 완벽하게 지원하지 않는다. 클래스 기반 객체지향 언에어서 지원하는 private, protected, public 키워드와 같은 접근 제한자를 지원하지 않는다. 따라서 인스턴스 프로퍼티는 언제나 public이다.

최신브라우저나 최신 Node.js 버전에서는 private를 지원한다.

```js
class Person{
  //privte 필드는 #으로 정의한다.
  #name = '';
  
  constructor(name){
    this.#name = name;
  }
}

const me = new Person('Lee');
//private 필드 #name은 클래스 외부에서 참조할 수 있다.
console.log(me.name);//Error
```

클래스 외부에서 private필드에 직접 접근할 수 있는 방법은 없지만 접근자 프로퍼티를 통해 간접적으로 접근하는 방법은 유효하다.

private필드는 반드시 클래스 몸체에 정의해야한다. private필드를 직접 constructor에 정의하면 에러가 발생한다. 

```js
class Person {
  constructor(name){
    this.#name = name;//Error!
  }
}
```

### static 필드 정의 제안

클래스에는 static 키워드를 사용하여 정적 메서드를 정의할 수 있다. 하지만 static 키워드를 사용하여 정적 필드를 정의할 수는 없었지만 새로운 표준 사양으로 제안되어 있다.

```js
const MyMath{
  //static public 필드 정의
  static PI = 22/ 7;

  //static private 필드 정의
  static #num = 10;
  
  //static 메서드
  static increment(){
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.14~~~
console.log(MyMath.increment()); //11
```

## 상속에 의한 클래스 확장

### 클래스 상속과 생성자 함수 상속

상속에의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것이다.

클래스는 상속을 통해 기존 클래스를 확장할 수 있는 문법이 기본적으로 제공되지만 생성자 함수는 그렇지 않다.

상속을 통해 Animal클래스를 확장한 Bird클래스 구현

```js
class Animal{
  constructor(age, weight){
    this.age = age;
    this.weight = weight;
  }

  eat(){return 'eat';}
  move(){return 'move';}
}

//상속을 통해 Animal클래스를 확장한 Bird클래스
class Brid extends Animal{
  fly() {return 'fly';}
}

const bird = new Brid(1, 5);

console.log(bird); // Bird { "age":1, "weight":5}
console.log(bird.eat());//eat
console.log(bird.move());//move
coneole.log(bird.fly());//fly
```

클래스는 상속을 통해 다른 클래스를 확장 할수 있는 문법인 extends 키워드가 기본적으로 제공된다. extends 키워드를 사용한 클래스 확장은 간편하고 직관적이다. 하지만 생성자 함수는 클래스와 같이 상속을 통해 다른 생성자 함수를 확장 할 수 있는 문법이 제공되지 않는다.

### extends 키워드

상속을 통해 클래스를 확장하려면 extends키워드를 사용하여 상속받을 클래스를 정의한다.

상속을 통해 확장된 클래스를 서브 클래스라 부르고, 서브 클래스에게 상속된 클래스를 수퍼 클래스라 부른다. 서브 클래스를 파생 클래스 또는 자식 클래스, 수퍼클래스를 베이스클레스 또는 부모 클래스 라고 부르기도 한다.

### 동적 상속

extends키워드는 클래스 뿐만 아니라 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 단, extends키워드 앞에는 반드시 클레스가 와야한다.

```js
//생성자 함수
function Base(a){
  this.a = a;
}

//생성자 함수를 상속받는 서브클래스
class Drived extends Base{}
```
extends 키워드 다음에는 클래스 뿐만이 아니라 내부 메서드를 갖는 함수 객체로 평가될 수 있는 모든 표현식을 사용할 수 있다. 이를 통해 동적으로 상속 받을 수 있다.

```js
function Base1(){}

class Base2{}

let condition = True;

//조건에 따라 동적으로 상속 대상을 결정하는 서브 클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived{}
```

### super 키워드

`super`키워드는 함수처럼 호출할수도 있고 this와 같이 식별자처럼 참조할 수 있는 특수한 키워드다. `super`는 다음과 같이 동작한다.
1. super를 호출하면 수퍼 클래스의 constructor를 호출한다.
2. super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

**super 호출**

super를 호출하면 수퍼클래스의 construtor를 호출한다. 이때 new 연산자와 함께 서브 클래스를 호출하면서 전달한 인수는 모두 서브 클래스에 암뭊겆으로 정의된 constuctor의 super호출을 통해 수퍼 클래스의 construtor 에 전달된다.

```js
class Base{
  construtor(a,b){
    this.a = a;
    this.b = b;
  }
}

//subclass
class Derived extends Base{
  // 다음과 같이 암묵적으로 constructor 가 정의된다.
  // constructor(...args){super(...args);}
}

const derived =new Derived(1,2);

console.log(derived);//Derived{a :1 , b :2}
```

수퍼클래스에서 추가한 프로퍼티와 서브 클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브 클래스의 constructor를 생략할 수 없다. 이때 new 연산자와 함께 서브클래스를 호출하면서 전달한 인수 중에서 수퍼클래스에 constructor에 전달할 필요가 있는 인수는 서브 클래스의 constructor 에서 호출하는 super를 통해 전달한다.

```js
//수퍼클래스
class Base {
  constructor(a, b){
    this.a = a;
    this.b = b;
  }
}
//sub class

class Drived extends Base{
  constructor(a, b, c){
    super(a,b);
    this.c =c;
  }
}

const derived = new Derived(1, 2,3);
console.log(derived); //Derived{a:1, b:2, c:3}
```

인스턴스 초기화를 위해 전달한 인수는 수퍼 클래스와 서브 클래스에 배분되고 상속 관계의 두 클래스는 서로 협력하여 인스턴스를 생성한다.

`super`를 호출할때 주의사항은 다음과 같다.
1. 서브클래스에서 constructor 를 생략하지 않는 경우 constructor에서는 반드시 super를 호출해야 한다.
2. 서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.
3. super는 반드시 서브클래스의 constructor에서만 호출한다. 서브 클래스가 아닌 클래스의 constrictor나 함수에서 super를 호출하면 에러가 난다.

**super 참조**
메서드 내에 서 super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.

1. 서브클래스의 프로토타입 메서드 내에서 suepr.sayHi는 수퍼클래스의 프로토타입 메서드 sayHi를 가리킨다.
  ```js
  //수퍼클래스
  class Base{
    construtor(name){
      this.name = name;
    }
    sayHi(){
      return `Hi! ${this.name}`;
    }
  }

  //서브 클래스
  class Derived extends Base{
    sayHi(){
      return `${super.sayHi()}. gow are you doing`;
    }
  }

  const derived = new Derived('lee');
  console.log(derived.sayHi()); // hi lee how are you doing
  ```
  super참조를 통해 수퍼클래스의 메서드를 참조하려면 super가 수퍼클래스의 메서드가 바인딩된 객체, 즉 수퍼클래스의 prototype 프로퍼티에 바인딩된 프로토타입을 참조할 수 있어야 한다.
2. 서브 클래스의 정적 메서드 내에서 super.sayHi는 수퍼클래스의 정적 메서드 sayHi를 가리킨다.

  ```js
  //수퍼클래스
  class Base{
    static sayHi(){
      return `Hi`;
    }
  }

  //서브 클래스
  class Derived extends Base{
    static sayHi(){
      return `${super.sayHi()}. gow are you doing`;
    }
  }
  console.log(Derived.sayHi()); // hi how are you doing
  ```

### 상속 클래스의 인스턴스 생성 과정

상속 관계에 있는 두 클래스가 어떻게 협력하며 인스턴스를 생성하는지 살펴보도록하자.

직사각형을 추상화한 Rectangle 클래스와 상속을 통해 확장한 ColorRectangle 클래스를 정의해 보자

```js
class Rectangle{
  constructor(width, height){
    this.width = width;
    this.height = height;
  }

  getArea(){
    return this.width * this.height;
  }

  toString(){
    return `width = ${this.width}, height = ${this.height}`;
  }
}

//서브클래스

class ColorRectangle extends Rectangle{
  constructor(width, heigth, color){
    super(width, heigth);

    console.log(this);//super에서 반환된 인스턴스가 this에 바인딩된다.
    this.color = color;
  }
  //메서드 오버라이딩
  toString(){
    return super.toString() + `, Color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console.log(colorRectangle); // ColorRectangle {width:2, height:4, color:"red"}

//상속을 통해 getArea 메서드 호출
console.log(colorRectangle.getArea()); //8
//오버라이딩된 toString호출
console.log(colorRectangle.toString()); //width = 2, height = 4, color = "red"
```

1. 서브 클래스의 super호출 : 서브클래스는 자신이 직접 인스턴스를 생성하지 않고 수퍼클래스에게 인스턴스 생성을 위임한다. 이것이 바로 서브클래스의 constructor에서 반드시 super를 호출해야하는 이유다.
2. 수퍼클래스의 인스턴스 생성과 this 바인딩 : 수퍼클래스의 construtor 내부의 this는 생성된 인스턴스를 가리키지만 인스턴스는 서브클래스가 생성한것으로 처리된다. 
3. 수퍼클래스의 인스턴스 초기화 : 수퍼클래스의 constructor가 실행되어 this에 바인딩되어 있느 인스턴스를 초기화 한다. 
4. 서브클래스 construtor로의 복귀와 this바인딩 : super가 반환한 인스턴스가 this에 바인딩 된다. 서브클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다.
5. 서브클래스의 인스턴스 초기화
6. 인스턴스 반환

### 표준 빌트인 생성자 함수 확장

extends 키워드 다음에는 클래스 뿐만이 아니라 메서드를 갖는 함수 객체로 평가될 수 잇는 모든 표현식을 사용할 수 있다. `String`, `Number`, `Array` 같은 표준 빌트인 객체도 내부 매서드를 갖는 생성자 함수이므로 extends 키워드를 사용하여 확장할 수 있다.

```js
class MyArray extends Array{

  uniq(){
    return this.filter((v,i, self) => self.indexOf(v) === i);
  }

  average(){
    return this.reduce((pre, cur)=> pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);
console.log(myArray); //MyArray(4) [1, 1, 2, 3]

console.log(myArray.uniq()); //MyArray(3) [1, 2, 3]
console.log(myArray.average()); //1.75
```

Array 생성자 함수를 상속받아 확장한 MyArrayㅌ클래스가 생성한 인스턴스는 Array.prototype과 MyArray.prototype 의 모든 메서드를 사용할 수 있다.