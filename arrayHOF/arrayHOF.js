const array = [1, 2,3,4,5,6,7,8];

//for

let squared = [];

for(let i = 0; i < array.length; i++){
    squared.push(array[i] * array[i]);
}

console.log(squared); 

//forEach

let squaredForEach =[];

array.forEach(item=>{
    squaredForEach.push(item*item);
});

console.log(squaredForEach);

//map
//반환값이 배열이므로 빈배열 생성x

let cal = n => n * n;

let squaredMap = array.map(cal);

console.log(squaredMap)