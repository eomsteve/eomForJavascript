var value = 1;

const obj = {
  value : 100,
  foo(){
    console.log("foo's this: ", this); // {value: 100, foo: f}
    console.log("foo's this.value: ", this.value); // 100

    function bar(){ //메서드 내에서 정의한 중첩 함수 선언식
      console.log("bar's this: ", this);// window
      console.log("bar's this.value: ", this.value);// undefined /1
    }
    car = function(){ //메서드 내에서 정의한 중첩 함수 표현식
      console.log("car's this: ", this);// window
      console.log("car's this.value: ", this.value);// undefined /1
    }

    //메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 합수의 내부의 this에는 전역 객체가 바인딩된다.
    bar();
    car();
  }
};

obj.foo();
