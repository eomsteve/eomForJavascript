# 이벤트 리스너

이벤트와 그에 대응하는 함수(이벤트 핸들러)를 통해 사용자와 애플리케이션은 상호작용을 할수 있다. 이와 같이 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 이벤트 드리븐 프로그래밍이라 한다.

## 이벤트 타입
이벤트 타입은 이벤트의 종류를 나타내는 문자열이다. 이벤트 타입은 약 200여가지가 있다.

### 마우스 이벤트
* click : 마우스 버튼을 클릭했을때
* dbclick : 마우스 버튼을 더블 클릭했을때
* mousedown : 마우스 버튼을 눌렀을때
* mouseup : 누르고 있던 마우스 버튼을 놓았을 때
* mousemove : 마우스 커서를 움직일때
* mouseenter : 마오스 커서를 HTML요소 안으로 이동했을때(버블링x)
* mouseover : 마우스 커서를 HTML요소 안으로 이동했을때(버블링o)
* mouseleave : 마우스 커서를 HTML요소 밖으로 이동했을때(버블링x)
* mouseout : 마우스 커서를 HTML요소 밖으로 이동했을때(버블링o)

### 키보드 이벤트

* keydown : 모든 키를 눌렀을때 발생한다.
* keypress : 문자키를 눌렀을때 연속적으로 발생한다. (폐지됨)
* keyup : 누르고 있던 키를 놓았을대 한 번만 발생한다.

### 포커스 이벤트

* focus : HTML 요소가 포커스를 받았을 때(버블링x)
* blur : HTML 요소가 포커스를 잃었을 때(버블링x)
* focusin : HTML 요소가 포커스를 받았을 때(버블링o)
* focusout : HTML 요소가 포커스를 잃었을 때(버블링o)

### 폼 이벤트

* submit : 1. form요소 내의 input, select 입력필드에서 엔터 키를 눌렀을때, 2. form 요소 내의 sumbit 버튼을 클릭했을때

### 값 변경 이벤트

* input : input, select, textarea 요소의 값이 입력 되었을 때
* change : input, select, textarea 요소의 값이 변경 되었을 때 (change 이벤트는 input 이벤트와는 달리HTML 요소가 포커스를 잃었을때 사용자 입력이 종료 되었다고 인식하여 발생한다.)
* readystatechage : HTML문서의 로드와 파싱 상태를 나태내는 document.readyState프로퍼티 값이 변경될 때

### DOM 뮤테이션 이벤트
* DOMcOnenentLoaded : HTML문서의 로드와 파싱이 완료되어 DOM 생성이 완료되었을때


### 뷰 이벤트

* resize : 브라우저 윈도우의 크기를 리사이즈 할때 연속적으로 발생한다.
* scroll : 웹 페이지 또는 HTML 요소를 스크롤할때 연속적으로 발생한다.

### 리소스 이벤트

* load : DOMContentLoaded 이벤트가 발생한 이후, 모든 리소스의 로딩이 완료 되었을때
* unload : 리소스가 언로드 될 때(주로 새로운 웹페이지 요청)
* abort : 리소스 로딩이 중단되었을 때
* error : 리소스 룅이 실패했을 때

## addEventListener

`EventTarget.prototype.addEventListener`메서드를 사용하여 이벤트 핸들러를 등록할 수 있다. 

```
EventTarget.prototype.addEventListener('이벤트 타입', '이벤트 핸들러(함수)[, capure사용 여부])
```

addEventListener메서드의 첫 번째 매개변수에는 이벤트의 종류를 나타내는 문자열인 이벤트 타입을 전달한다. 두 번째 매개변수에서는 이벤트 핸들러를 전달한다. 마지막 매개변수에는 이벤트를 캐치할 이벤트 전파 단계를 지정한다. 

```html
<html>
  <body>
    <button>Click me!</button>
    <script>
      const button = document.querySelector('button');

      button.addEventListener('click', function(){
        console.log('button click');
      });
    </script>
  </body>
</html>
```
동일한 HTML요소에서 발생한 동일한 이벤트에 대해 이벤트 핸들러 프로퍼티 방식은 하나 이상의 이벤트 핸들러를 등록할 수 없지만, addEventListener 메서드는 하나 이상의 이벤트 핸들러를 등록할 수 있다. 이때 이벤트 핸들러는 등록된 순서대로 호출된다.

```html
<html>
  <body>
    <button>Click me!</button>
    <script>
      const button = document.querySelector('button');

      button.addEventListener('click', function(){
        console.log('[1]button click');
      });

      button.addEventListener('click', function(){
        console.log('[2]button click');
      });
    </script>
  </body>
</html>
```
단 addEventListener메서드를 통해 참조한 동일한 이벤트 핸들러를 중복 등록하면 하나의 이벤트 핸들러만 등록된다.

```html
<html>
  <body>
    <button>Click me!</button>
    <script>
      const button = document.querySelector('button');

      const handleClick = () => console.log('button click');

      button.addEventListener('click', handleClick);
      button.addEventListener('click', handleClick);
    </script>
  </body>
</html>
```

## 이벤트 핸들러 제거

addEventListener메서드로 등록한 이벤트 핸들러를 제거하려면 `EventTarget.prototype.removeEventListener` 메서드를 사용한다. 메서드에 전달한 인수는 addEventListener메서드와 동일하다. 단, addEventListener메서드에 전달한 인수와 removeEventListener 메서드에 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.


```html
<html>
  <body>
    <button>Click me!</button>
    <script>
      const button = document.querySelector('button');

      const handleClick = () => console.log('button click');

      button.addEventListener('click', handleClick);
      
      button.removeEventListener('click',handleClick, true); // 제거 실패
      button.removeEventListener('click',handleClick); // 제거 성공
    </script>
  </body>
</html>
```
removeEventListener메서드에 인수로 전달한 이벤트 핸들러는 addEventListener 메서드에 인수로 전달한 등록 이벤트 핸들러와 동일한 함수여야 한다. 따라서 무영 함수를 이밴트 핸들러로 등록한 경우 제거할 수 없다. 이벤트 핸들러를 제거하려면 이벤트 핸들러의 참조를 변수나 자료구조에 저장하고 있어야 한다.

## 이벤트 객체

이벤트가 발생하면 이벤트에 관련된 다양한 정보를 담고 있는 이벤트 객체가 동적으로 생성된다. 생성된 이벤트 객체는 이벤트 해늘러의 첫 번째 인수로 전달된다.

```html
<html>
  <body>
  <p> 클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
  <em class="message"></em>
  <script>
    const msg =document.querySelector('.message');

    function showCoords(e){
      msg.textContent = `clientX : ${e.clientX}, clientY : ${e.clientY}`;
    }

    document.onclick = showCoords;
  </script>
</body>
</html>
```

클릭 이벤트에 의해 생성된 이밴트 객체는 이밴트 핸들러의 첫번째 인수로 전달되어 매개변수 e에 암묵적으로 할당된다. 이는 브라우저가 이벤트 핸들러를 호출할 때 이밴트 객체를 인수로 전달하기 때문이다. 따라서이벤트 객체를 전달받으려면 이벤트 핸들러를 정의할때 이밴트 객체를 전달받을 매개변수를 명시적으로 선언해야 한다. 위 예제에서는 e라는 이름으로 선언하였다.

## 이벤트 전파

DOM트리상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다. 이를 이벤트 전파라고 한다.

```html
<html>
<body>
  <ul id="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
</body>
</html>
```

ul요소의 두번째 자식 요소인 li 요소를 클릭하면 클릭 이벤트가 발생한다. 이때 생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃을 중심으로 DOM트리를 통해 전파된다. 이벤트 전파는 이벤트객체가 전파되는 방향에 따라 다음과 같이 3단계로 구분할 수 있다.

* 캡쳐링 단계 : 이벤트가 상위 요소에서 하위 요소 방향으로 전파
* 타깃 단계 : 이벤트가 이벤트 타깃에 도달
* 버블링 단계 : 이벤트가 하위 요소에서 상위 요소 방향으로 전파

## DOM 요소의 기본 동작 조작

### 동작 중단

DOM 요소는 저마다 기본 동작이 있다. 예를들어, a요소를 클릭하면 href 어트리뷰트에 지정된 링크로 이동한다. 이벤트 객체의 `preventDefault`메서드는 이러한 DOM 요소의 기본 동작을 중단시킨다.

```html
  <a href="http://google.com">GO</a>
  <input type="checkbox">
  <script>
    const a = document.querySelector('a').onclick = e =>{
      e.preventDefault();
    };

    document.querySelector('input[type=checkbox]').onClick = e =>{
      e.preventDefault();
    };

    </script>
```

## 이벤트 핸들러 내부의 this

### 어트리뷰트 방식

```html
<!DOCTYPE html>
<html>
<body>
  <button onclick="handleClick()">Click me</button>
  <script>
    function handleClick() {
      console.log(this); // window
    }
  </script>
</body>
</html>
```
이벤트 핸들러 이트리뷰트의 값으로 지정한 문자열은 사실 암묵적으로 생성되는 이벤트 핸들러의 문이다. 따라서 handleClick함수는 이벤트 핸들어에 의해 일바함수로 호출된다. 따라서 handleClick함수 내부의 this는 전역 객체 window를 가리킨다.

### 이벤트 핸들러 프로퍼티 방식과 addEventListener메서드 방식

이벤트 핸들러 프로퍼티 방식과 addEventListener 메서드 방식 모두 이벤트 핸들러 내부의 this는 이벤트를 바인딩한 DOM요소를 가리킨다. 즉, 이벤트 핸들러 내부의 this 는 이벤트 객체의 currentTarget 프로퍼티와 같다.

```html
  <button class="btn1">0</button>
  <button class="btn2">0</button>
  <script>
    const button1 = document.querySelector('.btn1');
    const button2 = document.querySelector('.btn2');

    button1.onClick = function(e) {
      console.log(this); // this는 이벤트를 바인딩한 dom 요소를 가리킨다 -> button1
      console.log(e.currentTarget); //button1
      console.log(this === e.currentTarget); //True

      this.textContent++; //button1의 textContent를 1올린다.
    }

    button2.addEventListener('click', function(e){
      console.log(this); // button2
      console.log(e.currentTarget); //button2
      console.log(this === e.currentTarget); //True

      this.textContent++; //button2의 textContent를 1올린다.
    })
</script>
```

화살표 함수로 정의한 이벤트 핸들러 내부의 this는 상위 스코프의 this를 가리킨다.

```html
  <button class="btn1">0</button>
  <button class="btn2">0</button>
  <script>
    const button1 = document.querySelector('.btn1');
    const button2 = document.querySelector('.btn2');

    button1.onClick = e => {
      console.log(this); // this는 상위 스코프의 this를 가리킨다.  -> window
      console.log(e.currentTarget); //button1
      console.log(this === e.currentTarget); //false

      this.textContent++; //this는 window를 가리키므로 window.textContent에 NaN 을 할당한다.
    }

    button2.addEventListener('click', function(e){
      console.log(this); // this는 상위 스코프의 this를 가리킨다.  -> window
      console.log(e.currentTarget); //button2
      console.log(this === e.currentTarget); //false

      this.textContent++; //this는 window를 가리키므로 window.textContent에 NaN 을 할당한다.
    })
  </script>
```
