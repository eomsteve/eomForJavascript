//빈배열 값 넣기

let arr =[];
let index = 0;
for(let number = 1; number <= 10; number++)
{
    arr[index] = number;
    index++; 
}

console.log(arr);
//배열 출력
//for in
console.log('for in을 이용해서 출력하기');
for(const key in arr)
{
    console.log(arr[key]);
}

//for of
console.log('for of를 이용해서 출력하기');
for(const value of arr)
{
    console.log(value);
}