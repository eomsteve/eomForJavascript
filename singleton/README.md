# 싱글톤 패턴

싱글톤 패턴은 객체의 인스턴스가 오직 한개만 생성되는 패턴을 의미한다. 싱글턴 패턴은 오직 유일한 객체를 통해서만 어떤 리소스에 접근해야하는 제약이 있는 상황에서 유용하게 사용할 수 있다.클래스를 사용하는 입장에서는 실수로 여러 번 객체 생성을 시도하더라도 내부적으로는 오직 하나의 객체만 생성되고 사용된다.

### 싱글톤 패턴의 장점 
 * 고정된 메모리 영역을얻으면서 한번의 생성으로 인스턴스를 사용하기 때문에 메모리 낭비를 방지할 수 있다.
 * 싱글톤으로 만들어진 클래스의 인스턴스는 전역이기 때문에 다른 클래스의 인스턴스들이 데이터를 공유하기 쉽다.
 * 인스턴스가 절대적으로 한개만 존재하는 것을 보증하고 싶을 경우 사용한다.
 * 두 번째 이용부터는 객체 로딩 시간이 줄어 성능이 좋아진다.

### 싱글톤 패턴의 단점
싱글톤 인스턴스가 너무 많은 일을하거나 많은 데이터를 공유시킬 경우의 다른 클래스들의 인스턴스들 간에 결합도가 높아저 개방 폐쇄원칙을 위배하게 된다.

이는 객체 지향 설곙원칙에 어긋나기 때문에 수정이 어려워지고 유지보수의 비용이 높아질 수 있다.

가장 간단한 싱글톤 예제는 객체 리터럴을 이용하는것이다. 


```js
const plue = {a:1, b:2}
const minus = {a:1, b:2}
```
동일한 키와 값을 똑같이 지정했더라도 참조하는 주소값이 다르기 떄문에 각각 유일하게 존재하는 서로 다른 객체이다.

비공개된 프로퍼티나 함수를 정의하고 싶다면 클로저를 사용하면 된다. 

**직접 만든 싱글톤 패턴**
```js
let mySingleton = (function MySingleton(){
  let instance;

  //private 
  function makeSingleton(name, age){
    //private
    this.name = name;
    this.age = age;
  return {
    //public
    sayHi:() => {
      return console.log(`hello i'm ${this.name}, ${this.age}`)
      }
    }
  }

  return {
    //싱글톤 패턴, 인스턴스가없다면, 즉 처음으로 인스턴스를 생성한다면 생성자 함수를 인스턴스에 저장해 사용한다.
    isIntance: (name, age) => {
      if(!instance){
        instance = makeSingleton(name, age);
      }
      //이미 만들어진 인스턴스가 있다면 해당 인스턴스를 반환해 또다른 인스턴스를 만들 수 없게 한다.
        return instance;
    }
  }
})();


let singleton = mySingleton.isIntance('Lee', 25);
singleton.sayHi();
//싱글톤의 퍼블릭 메서드인 sayHi가 실행되고 인수로 넘어간 'Lee', 25가 잘 적용되어있다.
let other = mySingleton.isIntance('kim', 21);

other.sayHi();
//재 할당된 인스턴스에 다른 인자를 넣고 퍼블릭 메서드를 실행하지만 singleton.sayHi()의 결과와 같다. 
console.log(singleton  == other);
//두 인스턴스가 같은지 확인하면 true를 반환한다. 즉 두 변수가 같은 인스턴스를 가리킨다.
```

모듈형식으로 만든 싱글톤 패턴, 즉시실행함수를 이용해 인스턴스가 생성과 동시에 사라진다. 클로저를 통해 인자와 메서드가 남아있다.

## ES7 class를 이용한 싱글톤

```js
class MySingletonClass{
  static instance;
  #name = ''
  #age = 0;
  constructor(name, age){
    if(MySingletonClass.instance) return MySingletonClass.instance;
    this.#name = name;
    this.#age = age;
    MySingletonClass.instance = this;
  }
  sayHi(){
      return console.log(`hello i'm ${this.#name}, ${this.#age}`)
      }
}

let singleClass = new MySingletonClass('eom',28)
let otherSingleClass = new MySingletonClass('kim',11)
singleClass.sayHi();
otherSingleClass.sayHi();

console.log(otherSingleClass == singleClass);
```

static 키워드를 통한 클래스 싱글톤 패턴은 의외로 간단하다. 인스턴스의 접근이 언제 어디서든 가능하기 때문에 생성자에서 스태틱 변수가 인스턴스를 가지고 있는지 없는지 판단 후 있다면 인스턴스를 반환하고 없다면 생성자 처럼 행동한다. 마지막에 스태틱 인스턴스 변수에 this로 class를 할당하면 인스턴스는 하나의 클래스만 바라보는 인스턴스로 할당된다.