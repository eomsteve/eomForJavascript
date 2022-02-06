# 맵과 셋 그리고 심볼

# symbol

심볼은 ES6에서 도입된 7번째 데이터 타입으로, 변경 불가능한 원시 타입의 값이다. 따라서 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용한다. 상태가

## 심볼 값의 생성

### Symbol함수

심볼값은 `Symbol`함수를 호출하여 생성한다. 다른 원시값, 즉 문자열, 숫자, 불리언, `undefined`, `null` 타입의 값은 리터럴 표기법을 통해 값을 생성할 수 있지만, 심볼값은 함수를 호출하여 생성해야 한다. 

```js

// Symbol 함수를 호출하여 유일무이한 심볼값을 생성한다. 
const mySymbol = Symbol();
console.log(typeof mySymbol); // symbol

```
`Symbol` 함수에는 문자열을 인수로전달할 수 있다. 이 문자열은 생성된 심볼 값에 대한 설명으로 디버깅 용도로만 사용되며, 심벌값 생성에 어떠한 영향도 끼치지 않는다.

```js
const mySymbol1 = Symbol('mySymbol'); 
const mySymbol2 = Symbol('mySymbol');

console.log(mySymbol1 == mySymbol2); // False
```

심볼값은 암묵적으로 문자열이나숫자 타입으로 변환되지 않는다. 단 불리언 타입으로는 암묵적으로 타입 변환된다. 이를 통해 if등에서 존재 확인이 가능하다.

```js
const mySymbol = Symbol();
//불리언 타입으른 암묵적으로 변환된다.
console.log(!!mySymbol); // true
// if 문 등 조건에서 존재 확인이 가능하다.
if(mySymbol) console.log('my symbol is not empty');

console.log(mySymbol + ''); // TypeError
```

### Symbol.for / Symbol.keyFor 메서드

`Symbol.for` 메서드는 인수로 전달받은 문자열을 키로 사용하여 키와 심볼값의 쌍들이 저장되어 있는 전역 심볼 레지스트리에서 해당 키와 일치하는 심볼값을 검색한다.

* 검색에 성공하면 새로운 심볽밧을 생성하지 안고 검색된 심볽밧을 반환한다.
* 검색에 실패하면 새로운 심볼값을 생성하며, 메서드의 인수로 전달된 키로 전역 심볼 레지스트리에 저장한 후, 생성된 심볼값을 반환한다.

```js
//전역심볼 레지스트리에서 mySymbol이라는 키로 저장된 심볼값이 없으면 새로운 심볼 생성
const s1 = Symbol.for('mySymbol');
//전역심볼 레지스트리에서 mySymbol이라는 키로 저장된 심볼값이 있으면 해당 값을 반환
const s2 = Symbol.for('mySymbol');

console.log(s1 == s2); // true
```
`Symbol.for` 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심볼값을 단 하나만 생성하여 전역 심볼 레지스트리를 통해 공유할 수 있다.

`Symbol.keyFor` 메서드를 사용하면 심볼 레지스트리에서 저장된 심볼 값의 키를 추출할 수 있다.

```js
const s1 = Symbol.for('mySymbol');
// 전역 심볼 레지스트리에서 저장된 심볼 값의 키를 추출
Symbol.keyFor(s1); // -> mySymbol
```

## 심볼과 상수

```js
const Direction = {
  UP:1,
  DOWN:2,
  LEFT:3,
  RIGHT:4
};

const myDirection = Direction.UP;

if (myDirection == Direction.UP){
  console.log('You are going UP')
}
```

위예제의 상수 값 1, 2, 3, 4가 변경될 수 있으며, 다른 변수 값과 중복될 수도 있다. 이러한경우 무의미한 상수 대선 중복될 가능성이 없는 심볼값을 사용할 수 있다.

```js
const Direction = {
  UP:Symbol('up'),
  DOWN:Symbol('down'),
  LEFT:Symbol('left'),
  RIGHT:Symbol('right')
};

const myDirection = Direction.UP;

if (myDirection == Direction.UP){
  console.log('You are going UP')
}
```

## 심볼과 프로퍼티 키

심볼값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용할 심볼값에 대괄호를 사용해야 한다. 프로퍼티에 접근할 때도 마찬가지로 대괄호를 사용 해야한다.
```js
const obj={
  [Symbol.for('mySymbol')]: 1
}

obj[Symbol.for('mySymbol')]; // -> 1
```
심볼 값은 유일무이한 값이므로 심볼 값으로 프로퍼티 키를 만든다면  다른 프로퍼티 키와 절대 충돌하지 않는다.

## 심볼과 프로퍼티 은닉

심볼 값을 프로퍼티 키로 사용해여 생성한 프로퍼티는 for...in문이나 다른 메서드로 찾을 수 없다. 이처럼 심볼 값을프로퍼티 키로 사용하여 프로퍼티를 생성하면 외부에 노출할 필요가 없는 프로퍼티 은닉을 할수 있다.

```js
const obj={
  [Symbol.for('mySymbol')]: 1
}

obj[Symbol.for('mySymbol')]; // -> 1

for (const key in obj){
  console.log(key); //아무것도 출력되지 않는다.
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
//완전하게 숨길수 있는것은 아니다. 
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]
const symbolKey = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey]); // 1
```

## Well-known Symbol

자바스크립트가 기본 제공하는 빌트인 심볼값을 Well-known Symbol이라 부른다. 이는 자바스크립트 엔진의 내부 알고리즘에 사용된다.

순회 가능한 이터러블은 Well-known Symbol인 `Symbol.iterator`를 키로 갖는 메서드를 가지며, `Symbol.iterator`메서드를 호출하면 이터레이터를 반환하도록 규정되어 있다.

만약 빌트인 이터러블이 아닌 일반 객체를 이터러블처럼 동작하도록 구현하려면 이터레이션 프로토콜을 따르면 된다.

`Symbol.iterator`를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면 그객체는 이터러블이 된다.

```js
//1~5 범위의 정수로 이루어진 이터러블
const iteralbe = {
  // Symbol.iterator메서드를 구현하여 이터러블 프로토콜 준수
  [Symbol.iterator](){
    let cur = 1;
    const max = 5;
    //Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환
    return {
      next(){
        return {value: cur++, done: cur > max + 1};
      }
    };
  }
};

for (const num of iteralbe){
  console.log(num);// 1 2 3 4 5
}
```

이처럼 심볼은 중복되지 않는 상수 값을 생성하는 것은 물론 기존에 작성된 코드에 영향을 주지않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입되었다.

# Set과 Map

## SET 

Set 객체는 중복되지 않는 유일한 값들의 집합이다. Set객체는 배열과 유사하지만 아래와 같은 차이가 있다.
* 동일한 값을 중복하여 포함할 수 없다.
* 요소 순서에 의미가 없다.
* 인덱스로 요소에 접근할 수 없다.

### set 객체의 생성

`Set`객체는 Set생성자 함수로 생성한다. 인수를 전달하지 않으면 빈 Set 객체가 생성된다.

Set 생성자 함수는 이터러블을 인수로 전달받아 Set객체를 생성한다. 이때 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않는다.

```js
const set1 = new Set([1,2,3,3]);
console.log(set1); // set(3) {1, 2, 3}

const set2 = new Set('hello');
console.log(set2); // set(4) {"h","e","l","o"}
```

### 요소 갯수 확인

Set 객체의 요소 갯수를 확인할 때는 `Set.prototype.size`프로퍼티를 사용한다. 
```js
const set = new Set([1,2,3,3]);

console.log(set.size); // 3
```

### 요소 추가

`add`메서드는 새로운 요소가 추가된 Set 객체를 반환한다. 따라서 add메서드를호출한후에 add메서드를 연속적으로 호출할 수 있다.

```js
const set = new Set();

set.add(1).add(2);
console.log(set); // set(2) {1, 2}
```
Set 객체는 객체나 배열과 같이 자바스크립트의 모든 값을 요소로 저장할 수 있다.

### 요소 존재 여부 확인

Set 객체에 특정 요소가 존재하는지 확인하려면 `Set.prototype.has`메서드를 사용한다. `has`메서드는 특정 요소의 존재 여부를 나타내는 불리언 값을 반환한다.

```js
const set = new Set([1, 2, 3]);

console.log(set.has(2)); //true
console.log(set.has(4)); //fasle
```

### 요소 삭제

Set 객체의 특정 요소를 삭제하려면 `Set.prototype.delete`메서드를 사용한다. delete메서드는 삭제 성공여부를 나타내는 불리언 값을 반환한다.

만약 존재하지 않는 Set 객체의 요소를 작제하려면 에러 없이 무시된다.

```js
const set = new Set([1, 2, 3]);

//요소 2 delete
set.delete(2);
console.log(set); // set(2) {1, 3}

set.delete(0);
//존재하지 않느 요소 0을 삭제하면 에러없이 무시된다.
console.log(set); // set(2) {1, 3}
```

### 요소 일괄 삭제

Set 객체의 모든 요소를 일괄 삭제하려면 `Set.prototype.clear`메서드를 이용한다. `clear`메서드는 언제나 `undefined`를 반환한다.

```js
const set = new Set([1, 2, 3]);

set.clear();
console.log(set); // set(0) {}
```

### 요소 순회

Set객체의 요소를 순회하려면 `Set.prototype.forEach`메서드를 사용한다. `Set.prototype.forEach`메서드는 `Array.prototype.forEach` 메서드와 유사하게 콜백 함수와, `forEach`메서드의 콜백 함수 내부에서 `this`로 사용될 객체를 인수로 전달한다. 이때 콜백 함수는 다음과 같이 3개의 인수를 전달받는다.

* 첫 번째 인수 : 현재 순회 중인 요소 값
* 두 번째 인수 : 현재 순회 중인 요소 값
* 세 번째 인수 : 현재 순회 중인 Set객체 자체

첫 번째 인수와 두번째 인수는 같은 값이다. 이처럼 동작하는 이유는 `Array.prototype.forEach`메서드와 인터페이스를 통힐하기 위함이며, 다른 의미는 없다. `Array.prototype.forEach`메서드의 콜백 함수는 두번째 인수로 현재 순회중인 요소의 인덱스를 전달받는다. 하지만 Set객체는 순서에 의미가 없어 배열과 같이 인덱스를 갖지 않는다.

```js
set.forEach(v, v2, set) => console.log(v, v2, set);
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```
Set 객체는 이터러블이다. 따라서 for...of문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링의 대상이 될 수 있다.

```js
const set = new Set([1, 2, 3])

for (const value of set) {
  console.log(value); // 1 2 3
}

console.log([...set]); //[1, 2, 3]

const [a, ...rest] = set;
console.log(a, rest); // 1, [2 ,3]
```
## Map

Map 객체는 키와 값의 깡으로 이루어진 컬렉션이다. Map 객체는 객체와 유사하지만 다음과 같은 차이가 있다.
|          구분          |          객체           |       Map 객체        |
| :--------------------: | :---------------------: | :-------------------: |
| 키로 사용할 수 있는 값 |   문자열 또는 심벌 값   | 객체를 포함한 모든 값 |
|        이터러블        |            X            |           O           |
|     요소 개수 확인     | Object.keys(obj).length |       map.size        |


### Map 객체의 생성

Map 생성자 함수로 생성한다. 인수를 전달하지 않으면 빈 Map 객체가 생성된다. 
```js
const map = new Map();

console.log(map); //Map(0){}
```

Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다. 이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.

```js
const map = new Map(['key1', 'value1'], ['key2', 'value2']);
console.log(map); // Map {"key1" => "value1", "key2" => "value2"}

const eMap = new Map([1, 2]); // TypeError
```

Map생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다. 따라서 Map 객체에는 중복된 키를갖는 요소가 존재하면 값이 덮어써진다. 따라서 Map객체에는 중복된 키를 갖는 요소가 존재할 수 없다.

```js
const map = new Map(['key1', 'value1'], ['key1', 'value2']);
console.log(map); // Map {"key1" => "value2"}
```

### 요소 갯수 확인

Map객체의 개수를 확인할 때는 `Map.prototype.size`프로퍼티를 사용한다.

```js
const map = new Map(['key1', 'value1'], ['key2', 'value2']);
console.log(map.size); // 2
```

### 요소 추가

Map객체에 요소를 추가할 때는 `Map.prototype.set`메서드를 사용한다.

```js
const map = new Map();
console.log(map); // Map(0) {}

//set 메서드는 새로운 요소가 추가된 Map객체를 반환하므로 연속적으로 호출이 가능하다.
map.set('key1', 'value1')
   .set('key2', 'value2');

console.log(map); //Map(2) {"key1" => "value1", "key2" => "value2"}
```

Map 객체에는 중복된키를 갖는 요소가 존재할 수 없기 때문에 중복된 키를 갖는 요소를추가하면 값이 덮어 써진다. 이때 에러가 발생하지 않는다.

객체는 문자열 똔느 심벌 값만 키로 사용할 수 있다. 하지만 Map 객체는 키타입에 제한이 없다. 따라서 객체를 포함한 모든 값을 키로 사용할 수 있다. 이는 Map객체와 일반 객체의 가장 두드러지는 차이점이다.

```js
const map = new Map();

const lee = {name: 'Lee'};
const kim = {name: 'kim'};

//객체도 키로 사용할 수 있다.
map
    .set(lee, 'developer')
    .set(kim, 'designer');

console.log(map); //Map(2) {{name: "Lee"} => "developer", {name: "kim"} => "designer"}
```
### 요소 취득

Map 객체에서 특정 요소를 취득하려면 `Map.prototype.get`메서드를 사용한다. get메서드의 인수로 키를 전달하면 Map 객체에서 인수로 전달한 키를 갖는 값을 반환한다. Map 객체에서 인수로 전달한 키를 갖는 요소가 존재하지 않으면 undefined를 반환한다.

```js
const map = new Map();

const lee = {name: 'Lee'};
const kim = {name: 'kim'};

map
    .set(lee, 'developer')
    .set(kim, 'designer');

console.log(map.get(lee)); // developer
console.log(map.get('key')); // undefined
```

### 요소 존재 여부확인 

Map 객체에 특정 요소가 존재하는지 확인하려면 `Map.prototype.has`메서드를 사용한다. `has`메서드는 특정 요소의 존재 여부를 나타내는 불리언 값을 반환한다.

```js
const map = new Map();

const lee = {name: 'Lee'};
const kim = {name: 'kim'};

map
    .set(lee, 'developer')
    .set(kim, 'designer');

console.log(map.has(lee)); //true
console.log(map.has('key')); //fasle
```

### 요소 삭제

Map 객체의 요소를 삭제하려면 `Map.prototype.delete`메서드를 사용한다. delete메서드는 삭제 성송여부를 나타내는 불리언 값을 반환한다.

```js
const lee = {name: 'Lee'};
const kim = {name: 'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.delete(kim);
console.log(map); // Map(1) { {name: "Lee" } => "developer"}

//만약 존재하지 않는키로 요소를 삭제하려 하면 에러없이 무시된다.
map.delete('key2');
console.log(map); // Map(1) { {name: "Lee" } => "developer"}
```

### 일괄 요소 삭제

Map 객체의 요소를 일괄 삭제하려면 `Map.prototype.clear`메서드를 사용한다. clear메서드느 언제나 undefined를 반환한다.

```js
const lee = {name: 'Lee'};
const kim = {name: 'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.clear();
console.log(map); // Map(0) {}
```

### 요소 순회

Map 객체의 요소를 순회하려먼 `Map.prototype.forEach`메서드를 사용한다. `Map.prototype.forEach` 메서드는 `Array.prototype.forEach`메서드와 유사하게 콜백 함수와 forEach 메서드의 콜백함수 내부에서 this로 사용될 객체를 인수로 전달한다. 이때 콜백 함수는 다음과 같이 3개의 인수를 전달받는다.
* 첫 번째 인수 : 현재 순회 중인 요소 값
* 두 번째 인수 : 현재 순회 중인 요소 키
* 세 번째 인수 : 현재 순회 중인 Map 객체 자체

```js
const lee = {name: 'Lee'};
const kim = {name: 'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

map.forEach((v, k, map) => console.log(v, k, map));
/*
developer {name : "Lee"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "kim"} => "desinger"
}

designer {name: "kim"} Map(2) {
  {name: "Lee"} => "developer",
  {name: "kim"} => "desinger"
}
*/
```

Map 객체는 이터러블이다. 따라서 for ... of문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링의 대상이 될 수 있다. 
```js
const lee = {name: 'Lee'};
const kim = {name: 'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

for (const entry of map) {
  console.log(entry); // [{name: "Lee"} , developer] [{name: "kim"} designer]
}

console.log([...map]); //[{name: "Lee"} , developer], [{name: "kim"} designer]

const [a, b] = map;
console.log(a, b); // [{name: "Lee"} , developer] [{name: "kim"} designer]

```

Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다. 
|      Map 메서드       |                             설명                             |
| :-------------------: | :----------------------------------------------------------: |
|  Map.prototype.keys   | Map 객체에서 요소 키를 값으로 갖는 이터러블 이면서 동시에 이터레이터인 객체를 반환한다. |
| Map.prototype.valuse  | Mpa 객체에서 요소값을 값으로 갖는 이터러블 이면서 동시에 이터레이터인 객체를 반환한다. |
| Map.prototype.entries | Map 객체에서 요소키와 요소 값을 갖는 이터러블 이면서 동시에 이터레이터인 객체를 반환한다. |

```js
const lee = {name: 'Lee'};
const kim = {name: 'kim'};

const map = new Map([[lee, 'developer'], [kim, 'designer']]);

for (const key of map.keys()) {
  console.log(key); // {name: 'Lee'} {name: 'kim'}
}

for (const value of map.values()){
  console.log(value); // developer designer
}

for (const entry of map.entrys()){
  console.log(entry); // [{name: "Lee"} , developer] [{name: "kim"} designer]
}
```
