/*
map을 이용해 1부터 10까지 존재하는배열을
각 버킷에 1이 더한값이 존재하는
새로운 배열을만들수 있어야한다.
*/

let mapArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let result = mapArr.map(item =>
    item + 1
);

console.log(result);


/*
reduce 함수를 이용하여, 1부터 10까지 존재하는
배열안에 존재하는 값을모두 더하면 얼마인지
작성할 수 있어야 한다.
*/

let recudeArr =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let sum = recudeArr.reduce((acc,cur) =>
    acc + cur
);

console.log(sum);