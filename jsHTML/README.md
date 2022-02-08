# 자바스크립트 HTML elements

DOM은 HTML문서의 게층적 구조와 정보를 표현하며 이를 제어할수 있는 API, 즉 프로퍼티와 메서드를 제공하는 트리 자료구조다. 이 트리 자료구조는 노드 객체들로 구성되어 있다. 이 DOM API를 통해 HTML의 구조나 내용  또는 스타일 등을 동적으로 조작할 수 있다.

## 요소 노드 취득

HTML의 구조나 내용또는 스타일등을 동적으로 조작 하려면 먼저 요소 노드를 취득해야 한다. 택스트 노드는 요손 노드의 자식 노드이고, 어티뷰트 노드는 요소와 노트가 연결되어 있기 때문에 텍스트 노드나 어티뷰트 노드를 조작하고자 할때도 마찬가지이다.

요소 노드의 취득은 HTML요소를 조작하는 시작점이다. 이를 위해 DOM은 요소 노드를 취득할 수있는 다양한 메서드를 제공한다.

### id를 이요한 노드 취득

`Document.prototype.getElementById`메서드는 인수로 전달한 id어트리뷰트 값을 갖는 하나의 요소 노드를 탐색하여 반환한다. getElementById메서드는 Document.prototype의 프로퍼티다. 따라서 반드시 문서 노드인 document를 통해 호출해야 한다.

```html
<!DOCTYPE html>
<html>
<body>
  <ul>
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
  <script>
    // id값이 banana인 요소 노드를 탐색하여 반환한다.
    // 두 번째 li요소가 파싱되어 생성된 요소 노드가 반환된다.
    const banana = document.getElementById('banana');

    //취득한 요소 노드의 style.color프로퍼티 값을 변경한다.
    banana.style.color = 'red';
  </script>
</body>
</html>
```
getElementById 메서드는 인수로 전달된 id값을 갖는 첫 번째 요소 노드만 반환한다.

### 태그 이름을 이용한 요소 노드 취득

`Document.prototype/Element.prototype.getElementsByTagName` 메서드는 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환한다. 이름에 포함된 Elements가 복수형인 것에서 알수 있듯이 getElementsByTagName메서드는 여러개의 요소 노드객체를 갖는 DOM 컬랙션 객체인 HTMLCollection객체를 반환한다.

```html
<!DOCTYPE html>
<html>
<body>
  <ul>
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
  <script>
    //태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
    // 탐색된 요소 노드들은 HTMLCollection객체에 담겨 반환된다.
    // 반환된 객체는 유사 배열 객체이면서 이터러블이다.
    const liTag = document.getElementsByTagName('li');
    
    //취득한 모든 요소 노드의 style.color프로퍼티 값을 변경한다.
    //객체를 배열로 변환하여 순회하며 변경한다.
    [...liTag].forEach(tag => {tag.style.color = blue}; );
  </script>
</body>
</html>
```

HTML 문서의 모든 요소 노드를 취득하려면 인수로 `*`를 전달한다.

```js
const all = document.getElementsByTagName('*');
```

`getElementsByTagName`메서드는 document.prototype에 정의된 메서드와 Element.prototype에 정의된 메서드가 있다. Document.prototype.getElementsByTagName메서드는 DOM의 루트 노드인 문서 노드, 즉 document를 통해 호출하여 DoM전체에서 요소 노드를 탐색하여 반환한다. 하지만 Elemnet.prototype.getElementsByTagName메서드는 특정 요소 노드를 통해 호출하며, 특정 요소 노드의 자손 노드 중에서 요소노드를 탐색하여 반환한다.


```html
<html>
<body>
  <ul id="fruit">
    <li >Apple</li>
    <li >Banana</li>
    <li >Orange</li>
  </ul>
  <ul>
    <li>HTML</li>
  </ul>
  <script> 
    const listFromDocument = document.getElementsByTagName('li');
    console.log(listFromDocument); // HTMLCollection(4) [li,li,li,li]

    const fruits = document.getElementById('fruit');
    const liesFromFruits = fruits.getElementsByTagName('li');
    console.log(listFromFruits); // HTMLCollection(3) [li,li,li]
  </script>
</body>
</html>
```
만약 인수로 전달된 태그이름을 갖는 요소가 존재하지 않는경우 getElementsByTag메서드는 빈 HTMLCollection객체를 반환한다.

### class를 이용한 노드 취득

`Document.prototype.getElementsByClassName`메서드는 인수로 전달한 class 어트리뷰트값 을 갖는모든 요소 노드들을 탐색하여 반환한다. 인수로 전달할 class값은 공백으로 구분하여 여러 개의 class를 지정할 수 있다. getElementsByTagName과 마찬가지로 여러 개의 요소 노드 객체를 갖는 DOMCollection객체를 반환한다.

```html
<!DOCTYPE html>
<html>
<body>
  <ul>
    <li class="fruit apple">Apple</li>
    <li class="fruit banana">Banana</li>
    <li class="fruit orange">Orange</li>
  </ul>
  <script>
    const elems = document.getElementsByClassName('fruit');
    [...elems].forEach(fruit => {fruit.style.color = 'orange';});

    const apple = document.getElementsByClassName('fruit apple');
    [...apple].forEach(apple => {apple.style.color = 'red';});
  </script>
</body>
</html>
```

getElementsByTagName메서드와 마찬가지로 getElementsByClassName메서드도 특정 요소 노드를 토해 호출하여 특정 요소 노드의 자손노드 중에서 요소 노드를 탐색하여 반환한다.

### CSS 선택자를 이용한 노드 취득

Document.prototype.querySelector메서드는 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환한다.
* 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 여러 개인경우 첫 번째 요소 노드만 반환한다.
* 인수로 전달된 CSS 선택자를 만족시키는 요소 노드가 존재하지 않을 경우 `null`을 반환한다.
* 인수로 전달한 CSS선택자가 문법에 맞지 않는 경우 DOMException에러가 발생한다.

```html
<!DOCTYPE html>
<html>
<body>
  <ul>
    <li class="fruit apple">Apple</li>
    <li class="fruit banana">Banana</li>
    <li class="fruit orange">Orange</li>
  </ul>
  <script>
    const elem = document.querySelector('.banana');

    elem.style.color = 'red';
  </script>
</body>
</html>
```

`Document.prototype.querySelectorAll`메서드는 인수로 전달한 CSS선택자를 만족 시키는 모든 요소 노드를 탐색하여 반환한다. querySelectorAll메서드는 여러 개의 요소 노드 객체를 갖는 DOM컬렉션 객체인 NodeList객체를 반환한다. NodeList객체는 유사 배열 객체이면서 이터러블이다.

```html
<!DOCTYPE html>
<html>
<body>
  <ul>
    <li class="fruit apple">Apple</li>
    <li class="fruit banana">Banana</li>
    <li class="fruit orange">Orange</li>
  </ul>
  <script>
    const elem = document.querySelectorAll('ul > li');
    conosle.log(elem); // NodeList(3) [li.apple, li.banana, li.orange]
    elem.forEach(elem => {elem.style.color = 'red';});
  </script>
</body>
</html>
```
getElementsByClassName , getElementsByTagName과 마찬가지로 querySelector, querySelectorAll 메서드는 Document.prototype에 정의된 메서드와 Element.prototypedp 정의된 메서드가있다. Document.prototype에 정의된 메서드는 DOM의 루트노드인 문서 노드, 즉 document를 통해 호출하며, DOM전체에서요소 노드를 탐색하여 반환한다. Element.prototype에 정의된 메서드는 특정 요소 노드를 통해 호출하며, 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환한다.

CSS 선택자 문법을 사용하는 querySelector, querySelectorAll 메서드는 getElementById, getElementsBy**** 메서드보다 다소 느린 것으로 알려져 있다. 하지만 CSS 선택자 문법을 사용하여 좀 더 구체적인 조건으로 요소 노드를 취득할 수 있고 일관된 방식으로 요소 노드를 취득할 수 있다는 장점이 있다. 따라서 id어트리뷰트가 있는 요소를 취득하는 경우에는 getElementById메서드를 사용하고 그 외의 경우에는 querySelector 메서드를 사용하는것을 권장한다.

### 특정 노드를 취득할 수 있는지 확인

Element.prototype.matches메서드는 인수로 전달한 CSS선택자를 통해 특정 노드를 취득할 수 있는지 확인한다. 불리언 값을 반환한다. mathes메서드는 이벤트 위임을 사용할때 유용하다.

### HTMLCollection과 NodeList

DOM컬렉션 객체인 HTMLCollection과 NodeList는 DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체다. 

두 객체의 중요한 특징은 노드 객체의 상태 변화를 실시간으로 반영하는 살아있는 개체라는것이다. HTMLCollection은 언제나 라이브 객체로 동작한다. 단 NodeList는 대부분의 경우 노드 객체의 상태 변화를 실시간으로 반영하지 않고 과거의 정적 상태를 유지하는 non-live객체로 동작하지만 경우에 따라 live 객체로 동작할 때가 있다.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .red{ color : red; }
    .blue{ color: blue; }
  </style>
</head>
<body>
  <ul id="fruits">
    <li class="red">Apple</li>
    <li class="red">Banana</li>
    <li class="red">Orange</li>
  </ul>
  <script>
    const elem = document.getElementsByClassName('red');

    console.log(elem);// HTMLCollection(3) [li.red, li.red, li.red]

    for (let i = 0; i < elem.length; i++){
      elem[i].className = 'blue';
    }

    conole.log(elem);// HTMLCollection(1) [li.red]
  </script>
</body>
</html>
```
위 예지는 getElementsByClassName메서드로 class값이 'red'인 요소노드를 모두 취득하고, 취득된 모든 요소 노드를 담고 있는 HTMLCollection객체를 for문으로 순회하며, className프로퍼티를 사용하여 모든 요소의 class 값을 red에서 blue로 변경해야 하지만 예상되로 동작하지 않는다. 두 번째 li요소만 변경되지 않는다.

1. 첫 번째 반복 : elme[0]은 첫 번째 li요ㅕ소다. 이 요소는 클레스네임 프로퍼티에 의해 클래스 값이 red에서 blue로 변경된다. 이때 첫 번째 li요소는 class값이 red에서 blue로 변경되었으므로 getElementsByClassName의 인자로 전달한 red와는 더는 일치하지 않기 때문에 elem에서 실시간으로 제거된다.
2. 두 번째 반복 : 첫 번재 반복에서 첫 번째 li요소는 elem에서 제거되었다. 따라서 elme[1]의 값은 세번째 li요소이다. 이 세번째 li요소의 class값도 blue 로 변경되고 마찬가지로 elem에서 제거된다.
3. 첫번째 두번째 반복에서 li요소가 elem에서 제거ㅚ었다. 따라서 elem에는 두번째 li요소 노드만 남았다. 이때 elem.length는 1이므로 for문의 조건식이 false로 평가되어 반복이 종료된다. 따라서 두번째 li요소는 변하지 않는다.

이처럼 HTMLCollection객체는 실시간으로노드 객체의 상태 변경을 반영하여 요소를 제거할 수 있기 때문에 HTMLCollection 객체를 for문으로 순회하면서 노드 객체 상태를 변경해야 할때 주의해야 한다. 이 문제는 for문으로 역방향으로 순회하는 방법으로 회피할 수있다.

```js
for (let i= elem.length -1; i >=0 ; i--){
  elem[i].className = 'blue';
}
```
또는 while문을 사용하여 HTMLCollection 객체어 노드 객체가 남아 있지 않을 때가지 무한 반복하는 방법으로 회피할 수 도 있다.

```js
let i = 0;
while(elem.length>i){
  elem[i].className= 'blue';
}
```
 더 간단한 해결책은 부작용을 발생시키는 원인인 HTMLCollection객체를 사용하지 않는 것이다. 유사 배열 객체이면서 이터러블인 HTMLCollection객체를 배열로 변환하면 부작용을 발생시키는 HTMLCollection 객체를 사용할 필요가 없고 유용한 배열의 고차함수를 사용할 수 있다.

```js
[...elem].forEach(elem => {elem.className='blue';});
```

#### NodeList

HTMLCollection객체의 부작용을 해결하기 위해  querySelectorAll메서드를 사용하는 방법도 있다. querySelctorAll메서드는 DOM 컬렉션 객체인 NodeList를 반환한다. 이때 NodeList객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는다.

하지만 childNode프로퍼티가 반환하는 NodeList겍체는 HTMLCollection객체와 같이 실시간으로 노드 객체의 상태 변경을 반영하는 live 객체로 동작함므로 주의가 필요하다. 

**노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection이나 NodeList 객체를 배열로 변환하여 사용하는것을 권장한다.**

