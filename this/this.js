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

// obj.foo();


function dummy() {
  let a = 123;
  console.log(this)
  // this.a = 456;

  const b = () => {
    console.log(this.a)
  }

  function c() {
    console.log(this)
  }

  return {
    a,
    b,
    c
  }
}

const instance = new dummy();
instance.b();
instance.c()
const d = instance.c;
// d()

// 화살표 함수는 함수자체의 this 바인딩을 가지지 않아 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조합니다. 그러므로 dummy 사 가진 스코프에 this를찍은것과 같은 결과가 나오게 됩니다.

// 일반 함수 선언식으로 선언된 메서드는 생성자 함수를 통해 호출되고 있습니다. 따라서 생성자 함수가 만들어낼 인스턴스를 가리킵니다. 결과값을 확인해 보면 객체로 이루어진 변수 a와 2개의 function b, c를 생성하는 인스턴스를 가리키고 있습니다.

// d는 일반 변수로 할당되여 일반 함수로 호출되어 전역 객체를 가리키는 this가 됩니다.