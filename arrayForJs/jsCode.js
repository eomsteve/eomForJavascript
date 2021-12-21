const array = ['apple', 'orange', 'banana'];

const oneToFive = [1, 2, 3, 4, 5];
//배열 생성후 변수에 할당.

const emptyArr =[];
//길이가 0인 빈 배열 생성.

console.log(emptyArr.length); // 0

const arr = [1, ,3];
//배열의 요소를 생략하면 희소배열이 생성된다.
// 희소배열의 length는 배열의 실제 요소 개수보다 언제나 크다.

console.log(arr.length); // 


console.log("요소 순차 접근");
for(let i = 0; i < oneToFive.length; i++){
    console.log(oneToFive[i]);
}