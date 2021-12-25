# 객체 메서드

자바스크립트에서 사용할수 있는 모든 값은 프로퍼티 값으로 사용할 수 있다. 함수또한 값으로 취급되기 때문에 프로퍼티 값으로 사용할 수 있다.

프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다. 즉, 메서드는 객체에 묶여있는 함수를 의미한다. 

```js
let circle = {
    radius : 5,
    //원의 지름 구하는 함수
    getDiameter: function(){
        return 2* this.radius;
    }
}

console.log(circle.getDiameter()); // 10;
```

## 메서드 this 호출

메서드 내부의 this는 메서드를 호출한 객체, 메서드 이름앞의 마침표 연산자 앞에 기술한 객체가 바인딩된다. 주의할 것은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩 된다.

```js
const person = {
    name : 'eom',
    getName(){
//매서드 애부의 this는 메서드를 호출한 객체에 바인딩된다.
        return this.name;
    }
};

console.log(person.getName());// eom
```
메서드는 프로퍼티에 바인딩된 함수다. 즉 person객체의 getName프로퍼티가 가리키는 함수 객체는 person객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. 

-> getName 프로퍼티가 함수 객체를 가리키고 있다.

메서드 내부의 this는 프로퍼티로 메서드를 가리키고 있는 객체와는 관계가 없고, 메서드를 호출한 객체에 바인딩된다.
