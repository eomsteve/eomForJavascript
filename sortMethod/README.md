# sort함수

## array.prototype.sort

`sort`메서드는 배열의 요소를 정렬한다. 원본 배열을 직접 변경하여 정렬된 배열을 반환한다.

`sort`메서드는 기본적으로 오름차순으로 요소를 정렬한다.

```js
const fruits =['orange','apple','banana'];

fruits.sort();

console.log(fruits);
```

`sort`메서드를 내림차순으로 요소를 정렬하려면, `sort`메서드를 사용하여 오름차순으로 정렬한 후 `reverse`메서드를 사용하여 요소의 순서를 뒤집는다.

```js
const fruits =['orange','apple','banana'];

fruits.sort();
console.log(fruits);

fruits.reverse();
console.log(fruits);
```

숫자로 이루어진 배열을 정렬할 때 주의가 필요하다.

```js
const point = [40, 100, 1, 5, 2, 25, 10];

point.sort();

console.log(point);
//[1, 10, 100, 2, 25, 40, 5]
```

`sort`메서드의 기본 정렬순서는 유니코드 순서를 따른다. 배열의 요소가 숫자 타입이라 하더라도 배열의 요소를 일시적으로 문자열로 변환한 후 유니코드 코드 포인트 순서로 정렬한다.

따라서 숫자 요소를 정렬할 때는 `srot`메서드에 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 한다.비교함수는 양수나 음수 또는 0을 반환해야한다. 

비교 함수의 반환값이 0보다 작으면 비교 함수의 첫 번째 인수를 우선하여 정렬라고, 0 이면 정렬하지 않으며, 0보다 크면 두 번째 인수를 우선하여 정렬한다.

```js
const point = [40, 100, 1, 5, 2, 25, 10];

point.sort((a,b) => a - b);

console.log(point);
//[1, 2,5, 10, 25, 40, 100]

//숫자 배열의 내림차순 정렬, 비교 함수의 반환값이 0보다 작으면 b를 우선하여 정렬한다.

point.sort((a,b) => b - a);
```

객체를 요소로 갖는 배열을 정렬하는 예제는 다음과 같다.

```js
const todos =[
    { id : 4, content : 'JavaScript'},
    { id : 1, content : 'HTML'},
    { id : 2, content : 'CSS'}
];

function cmp(key){
    //프로퍼티 값이 문자열인 경우 비교 연산을 사용해야 한다.
    // 비교 함수는 양수/음수/0을 반환하면 되므로 산술 연산대신 비교 연산을 사용할 수 있다.
    return (a,b) => (a[key] > b[key] ? 1:(a[key] < b[key] ? -1 : 0));
}


//id를 기준으로 오름차순 정렬
todos.sort(compare('id'));
console.log(todos);

//content를 기준으로 오름차순 정렬

todos.sort(compare('content'));
console.log(todos);
```

>sort메서드는 퀵소트 알고리즘을 사용했었다. 퀵소트는 불완전 알고리즘으로, ES10부터는 timesort알고리즘을 사용하도록 바뀌었다.