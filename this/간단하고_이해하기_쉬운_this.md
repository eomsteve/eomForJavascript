# this

일반 함수에서 this = window

왜냐면 일반 함수를 담고있는 곳이 window 오브잭트 이기 때문에 윈도우를 가리킨다. 

메서드 안의 this는 그 함수를 가지고 있는 오브젝트를 뜻한다.=> 나를포함하고 있는 오브젝트

즉 여기까지 **this는 this를 호출했을때 담고있는 객체를 뜻한다.**

## 에로우 펑션에서의 this

내 상위 요소의 this를 그대로 가져와 쓴다. 예를 들어 클로벌 함수에 this를 선언했다면 그대로 가져와 메서드 내의 this 또한 글로벌이 나온다.

```js
function mkObj(){
    this.name = 'kim'
}
/*
여기서 this는 새로 생성될 오브젝트(instance)를 가리킨다.
*/

const me = new mkObj(); // instance는 me 이 인스턴스는 mkObj를 가리킨다. 
```

이벤트 리스너에서의 this 는 e.currentTarget ,( 콜백함수에 e인자를 넣어야함 )즉, 지금 이벤트 동작하는곳이다.

```js
document.getElementById('button').addEventListener('click', function(e){
    console.log(this) == e.currnetTarget
});
```

지금 addEventListener가 부착된 HTML요소를 뜻한다.


```js
document.getElementById('button').addEventListener('click', function(e){
  	var array = [1,2,3];
    array.forEach(function(){
        console.log(this)
    })
});
```

이 코드에서의 this는?

이벤트 리스너 안에서 사용했지만 새로운 함수를 만나 의미가 달라졌다.

일반함수이다. => window 

즉 this값은 this가 어떤 함수안에 들어있는지 잘 체크하면 바로 알 수 있다.

그래서 this값은 function 을 만날 때마다 바뀔 수 있기 때문에 내가 원하는 this를 쓰기 힘든 경우가 있다. 그럴땐 함수를 arrow fucntion으로 바꿔보면 된다.

arraw function은 this값을 새로 재정의하지 않는다. this값을 상위에 있는 값을 그대로 받아서 사용하게 된다. 만약 상위필드에서 this를 사용하지 않았다면 자연스럽게 window(global)을 가리키게 된다.

# 결론 : this값은 this가 어떤 함수안에 들어있는지 잘 체크하면 바로 알 수 있다.
