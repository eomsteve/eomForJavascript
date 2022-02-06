# 프로미스

프로미스는 비동기 작업을 조금 더 편하게 처리할 수 있도록 ES6에 도입된 기능이다. 

비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 왼료되지 않았다 해도 기다리지 않고 즉시 종료된다. 

즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된이후에 완료된다. 
따라서 비동기 함수 내부의 비동기로 동작하는 코드에서 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하면 기대한 대로 동작하지 않는다.

비동기 함수의 처리 결과에 대한 후속 처리는 비동기 함수 내부에서 수행해야 한다.
따라서 콜백함수를 전달하는것이 일반적이다. 
> 필요에 따라 비동기 처리가 성공하면 호출될 콜백 함수와 비동기 처리가 실패하면 호출될 콜백 함수를 전달할 수 있다.

이전에는 비동기 작업을 처리 할때 콜백 함수로 처리했지만 콜백 함수로 처리를 하게 된다면, 비동기 작업이 많아질 경우 코드가 싶게 난잡해진다. 

```js
//숫자 n을 파라미터로 받아와 5번에 걸쳐 1초마다 1씩 더해 출력하는 콜백함수
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1;
    console.log(increased);
    if (callback) {
      callback(increased);
    }
  }, 1000);
}

increaseAndPrint(0, n => {
  increaseAndPrint(n, n => {
    increaseAndPrint(n, n => {
      increaseAndPrint(n, n => {
        increaseAndPrint(n, n => {
          console.log('끝!');
        });
      });
    });
  });
});
```

이런 식의 코드를 `Callback Hell` 이라 부른다.

![](img/callback_hell.png)

비동기적으로 처리해야 할 일이 많아질수록, 코드의 깊이는 길어지게 된다. `Promise`를 사용하면 이런식의 코드의 깊이가 깊어지는 현상을 방지할 수 있다.

비동기 처리를 위핸 콜백패턴의 문제점중 가장 심각한 것은 에러처리가 곤란하다는 것이다. 

```js
try{
    setTimeout(()=>{
        throw new Error('Error');
    }, 1000)
} catch(e){
    console.error('캐치한 애러',e)
}
// 애러를 캐치하지 못한다.
```

`try`코드 블록 내에서 호출한 `setTimeout`함수는 1초후에 콜백함수가 실행되도록 타이머를 설정하고 1초뒤 에러를 발생시키지만 `catch`블록에서 에러를 캐차하지 못한다.

## Promise 생성

```js
const myPromise = new Promise((resolve, reject) => {
    //functions
    if(/*비동기 처리 성공*/){
        resolve('result')
    }else{
        //에러처리를 위해 reject 함수를 호출
        reject('failure reason')
    }
})
```

`Promise`는 성공 할 수도 있고, 실패할 수도 있다. 성공할 때는 비동기 처리 결과를  `resolve` 함수에 인수로 전달하면서 호출하고, 실패할 때는 `reject` 함수수에 인수로 전달하면서 호출한다. 

프로미스는 다음과 같이현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태 정보를 갖는다.

| 프로미스의 상태 정보 | 의미 | 상태 변경 조건 |
|------|------|------|
|`pending`|비동기 처리가 아직 수행되지 않은 상태|프로미스가 생성된직후 기본 상태|
|`fulfilled`| 비동기 처리가 수행된 상태(성공)| `resolve`함수 호출
|`rejected`|비동기 처리가 수행된 상태(실패)| `reject`함수 호출

생성된 직후의 프로미스는 기본적으로 `pending`상태다. 이후 비동기 처리가 수행되면 비동기 처리 결과애 따라 다음과 같이 프로미스의 상태가 변경된다.
* 비동기 처리 성공 : `resolve`함수를 호출해 프로미스를 `fulfilled`상태로 변경한다.
* 비동기 처리 실패 : `reject`함수를 호출해 프로미스를 `rejected`상태로 변경한다.

![](img/promise%20status.png)

`fulfilled`, `rejected` 상태를 처리(`settled`) 상태라고 부르고, 처리 상태가 되면 더이상 다른 상태로 변하지 않는다.

#### 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.

## 프로미스 후속 처리 메서드

프로미스의 처리 상태가 변하면 후속 처리를 해야한다. 이를 위해 프로미스는 후속 메서드 `then`, `catch`, `finally`를 제공한다.

프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백함수가 선택적으로 호출된다. 

### Promise.prototype.then

`then` 메서드는 두 개의 콜백 함수를 인수로 전달받는다. 
* 첫 번째 콜백 함수는 프로미스가 `fulfilled`상태가 되면 호출된다. 이때 콜백함수는 프로미스의 비동기 처리결과를 인수로 받는다.
* 두 번째 콜백 함수는 프로미스가 `rejected`상태가 되면 호출된다. 이때 콜백 함수는 프로미스의 에러를 인수로 전달받는다.

> 첫 번째 콜백함수는 비동기 처리가 성공 했을때, 두 번째 콜백함수는 비동기 처리가 실패 했을 때 호출되는 실패 처리 콜백 함수다.

```js
new Promise(resolve => resolve('fulfilled')).then(v=> console.log(v), e=>console.error(e));

new Promise((_,reject)=> reject(new Error('rejected'))).then(v=> console.log(v), e => console.error(e));
```

`then` 메서드는 언제나 프로미스를 반환한다. 만약 `then`메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고, 콜백 함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 `resolve`또는 `reject`하여 프로미스를 생성해 반환한다.

## Promise.prototype.catch

`catch`메서드는 한 개의 콜백 함수를 인수로 전달받는다. `catch`메서드의 콜백 함수는 프로미스가 `rejected`상태인 경우만 호출된다.

```js
new Promise((_,reject)=>reject(new Error('rejected'))).catch(e => console.log(e)); // Error: rejected
```

## Promise.prototype.finally

`finally`메서드는 한 개의 콜백 함수를 인수로 전달받는다. 프로미스의 성공 또는 실패와 상관없이 무조건 한번 호출된다. `finally`메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용하다. 

```js
new Promise((resovle, reject)=>{
    /*callback function call, return resolve or reject*/
}).finally(()=> console.log('finally')).then(v=> console.log(v), e => console.error(e));
```

## 프로미스 메서드

### Promise.all

`Promise.all`메서드는 여러 개의 비동기 처리를 모두 병렬 차리할 때 사용한다.

```js
const requestData1 = new Promise(relove => setTimeout(() => resolve(1),3000));
const requestData2 = new Promise(relove => setTimeout(() => resolve(2),2000));
const requestData3 = new Promise(relove => setTimeout(() => resolve(3),1000));

//세 개의 비동기 처리를 순차적으로 실행

const res = [];
requestData1()
.then(data => {
    res.push(data);
    return requestData2();
})
.then(data => {
    res.push(data);
    return requestData3();
})
.then(data => {
    res.push(data);
    console.log(res);// [1, 2, 3] => 6초 소요
})
.catch(console.error)
```

비동기 처리가 완료하면 다음 비동기 처리를 수행한다. 위 예제는 첫 비동기 처리에 3초, 두 번째 비동기 처리에 2초, 세 번째 비동기 처리에 1초가 소요되어 6초 이상이 소요된다.

```js
const requestData1 = new Promise(relove => setTimeout(() => resolve(1),3000));
const requestData2 = new Promise(relove => setTimeout(() => resolve(2),2000));
const requestData3 = new Promise(relove => setTimeout(() => resolve(3),1000));

Promise.all([requestData1(),requestData2(),requestData3()])
.then(console.log)//[1, 2, 3] => 3초 소요
.catch(console.error);
```

`Promise.all`메서드는 프로미스를 요소로 갖는 배열등의 이터러블을 인수로 전달받는다. 

전달받은 모든 프로미스가 모두 `fulfilled`상태가 되면 모든 처리결과를 배열에 저장해 새로운 프로미스를 반환한다. 

종료하는데 걸리는 시간은 가장늦게 완료된 상태가 되는 프로미스의 처리 시간보다 조금 더 길다.

이때 첫 번째 프로미스가 가장 나중에 `fulfilled`상태가 되어도 `Promise.all`메서드는 첫 번째 프로미스가 `resolve`한 처리 결과부터 차례대로 배열에 저장해 그 배열을 `resolve`하는 새로운 프로미스를 반환한다. 즉, 처리 순서가 보장된다.

인수로 전달받은 배열의 프로미스가 하나라도 `rejected`상태가 되면 나머지 프로미스를 기다리지 않고 종료된다.

### Promise.race

`Promise.race`메서드는 `Promise.all`메서드와 동일하게 프로미스를 요소로 갖는 이터러블을 인수로 받는다.

`Promise.all`메서드와 달리 가장 먼저 `fulfilled`상태가 된 프로미스의 처리 결과를 `resolve`하는 새로운 프로미스를 반환한다.

```js
Promise.race([
new Promise(relove => setTimeout(() => resolve(1),3000)),
new Promise(relove => setTimeout(() => resolve(2),2000)),
new Promise(relove => setTimeout(() => resolve(3),1000))
])
.then(console.log) //3
.catch(console.error);
```

### Promise.allSettled

`Promise.allSettled`메서드는 전달받은 프로미스가 모두 비동기 처리가 수행된 상태가 되면 처리 결과를 배열로 반환한다.

`Promise.allSettled`메서드가 반환한 배열에는 `fulfilled` 또른 `rejected` 상태와는 상관없이 모든 프로미스들의 처리 결과가 모두 담겨 있다. 

```js
Promise.allSettled([
    new Promise(resolve => setTimeout(()=> resolve(1),2000)),
    new Promise((_,reject) => setTimeout(()=> reject(new Error('Error: ')),1000))
])
.then(console.log);
/*
[
    {status : "fulfilled", value: 1},
    {status : "rejected", reason: Error: Error :at }
]
*/
```

* 프로미스가 `fulfilled`상태일 경우 비동기 처리 상태를 나타내는 `status` 프로퍼티와 처리 결과를 나타내는 `value`프로퍼티를 갖는다.
* 프로미스가 `rejected`상태일 경우 비동기 처리 상태를 나타내는 `status` 프로퍼티와 에러를 나타내는 `reason`프로퍼티를 갖는다.


# async/ await

async await 는 프로미스를 시반으로 동작한다. 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

### async 함수
`await`키워드는 반드시 `async`함수 내부에서 사용해야 한다. async함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 resolve 하는 프로미스를 반환한다.

```js
async function foo(n) {return n;}
foo(1).then(v => console.log(v)); //1

const bar = async function(n) {return n;}
bar(2).then(v=> console.log(v)); // 2

const baz = async n => n;
baz(3).then(v=> console.log(v));// 3

const obj = {
  async foo(n) {return n;}
};
obj.foo(4).then(v => console.log(v)); // 4
```

클래스의 생성자 메서드는 async 메서드가 될 수없다. 클래스의 생성자 메서드는 인스턴스를 반환해야 하지만 async 메서드는 항상 프로미스를 반환하기 때문이다.

### await

`await` 키워드는 피로미스가 settled상태(비동기 처리가 수행된 상태)가 될 떄까지 대기 하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다. await 키ㄷ워드는 반드시 프로미스 앞에서 사용해야 한다. 

```js
const fetch =require('node-fetch');

const getGithubUserName = async id =>{
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name); 
};
```

프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 res변수에 할당된다. 이처럼 await 키워드는 다음 실행을 일시 중지시켰다가 프로미스가 settled 상태가 되면 다시 재개한다. 

## await for of

각 Array에 대한 아이템을 비동기처리를 해야하는 경우가 생긴다. 예를들어 for 반복을 통해 ajax를 처리하는 경우가 있다. 이때 forEach 문을 통해 객체를 순회하는 방법을 떠올리기 쉽다.

```js
async function foo(array){
  array.forEach(item => {
    await innerFunc(item);
  })
}
```
위 예제의 경우 SyntaxError를 반환한다. 이유는 forEach내에 async 키워드를 달어주어야 await 키워드를 사용할 수 있기 때문이다. 

```js
async function foo(array){
  array.forEach(async (item) => {
    await innerFunc(item);
  })
}
```
그럼 forEach 안에 콜백함수에 async를 달아 문법 오류를 고쳐보았다. 실행은 문제없이 잘 되지만 비동기처리를 하는것처럼 작동하지 않는다. 왜냐하면
forEach의 경우 해당 반복이 종료되는것에 대한 결과를 기다려주지 않는다.

반복문을 돌며 함수내의 내용을 처리만 하기 때문에 관련된 array를 병렬로 순차 실행하는 것은 다르게 처리를 해줘야 한다.

**for await of** 구문은 반복문 내부에서 실행되는 비동기 서비스들에 대한 순서를 보장해준다. 

```js
const names = ['a', 'b', 'c', 'd'];

namse.forEach(async (name)=>{
  const result = await getServerId(name);
  consoel.log(result.json());
});

console.log('서비스 종료');
```
a, b, c, d 이름을 넣어 유저의 id를 가져오는 프로미스를 반복해 반환하는 위와같은 기능이 있다. 위 예제의 결과는
```
서비스 종료
{'a' : 0}
{'b' : 0}
{'c' : 0}
{'d' : 0}
{'e' : 0}
```
서비스 종료가 맨 먼저 찍히게 된다. 위에 말한대로 forEach는 비동기 작업에 대한 순서를 보장하지 않는다. 위의 코드를 for await of를 사용하면 아래와 같다.

```js
const names = ['a', 'b', 'c', 'd'];

for await (let name of names){
  const result = await getServerId(name);
  consoel.log(result.json());
});

console.log('서비스 종료');
```
출력 결과
```
{'a' : 0}
{'b' : 0}
{'c' : 0}
{'d' : 0}
{'e' : 0}
서비스 종료
```

## try catch
에러에 대해 대처하지않고 방치하면 프로그램은 강제 종료된다. `try...catch`문을 사용ㅇ해 발생한 에러데 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해서 코드를 실행 시킬 수 있다.

```js
try{
  // 실행할 코드 (에러가 발생할 가능성이 있는 코드)
}catch(err){
  // try 코드 블럭에서 에러가 발생하면 이 코드 블록의 코드가 실행된다.
  // err에는 try코드블럭에서 발생한 Error객체가 전달된다.
}finally{
  // 에러 발생과 상관없이 반드시 한번 실행된다.
}
```

비동기 처리 콜백 패턴의 단점 중 가장 심각한것은 에러 처리가 곤란하다는 것이다. 에러는 호출자 방향으로 전파된다. 즉 콜 스택의 아래방향으로 전파된다. 
```js
const foo = () => {
  throw new Error('Something Wrong');
}
const bar = () => {
  foo();
}
const baz = () => {
  bar();
}

try{
  baz();
}catch(err){
  console.error(err);
}
```
baz 함수를 호출하면 ,bar 함수가 호출되고 bar 안에서 foo함수가 호출되고 , foo함수는 throw를 통해 에러 객체를 던진다. 에러는 `foo -> bar -> baz -> 전역 실행 컨텍스트` 로 전파되어 전역에서 catch된다. 

하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 떄문에 try...catch문을 사용해 에러를 캐치할 수 없다.

```js
try{
  setTimeout(() => { throw new Error('Something Wrong'); }, 1000);
}catch(err){
  console.error(err); //에러를 캐치하지 못한다.
}
```
`async/await`에서 에러 처리는 try...catch문을 사용할 수 있다. 콜백함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```js
const fetch = require('node-fetch');

const foo = async () => {
  try{
    const wrongUrl = 'http://worng.Url';
    const res = await fetch(wrongUrl);
    const data = await res.json();
    consol.log(data);
  }catch(err){
    console.error(err);
  }
};

foo();
```
위 예제의 foo함수의 catch문은 HTTP 통신에서 발생한 에러 뿐만 아니라, try코드 블록내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.

async 함수 내에서 catch문을 사용해서 에러 처리를 하지 않으면 async함수는 발생한 에러를 reject하는 프로미스를 반환한다.

```js
//후속 처리 메서드를 활용한 에러캐치
const fetch = require('node-fetch');

const foo = async () => {
    const wrongUrl = 'http://worng.Url';
    const res = await fetch(wrongUrl);
    const data = await res.json();
    return data;
};

foo()
    .then(consol.log)
    .catch(console.error);
```
--------------------------------
reference

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for-await...of