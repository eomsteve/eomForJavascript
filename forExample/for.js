/*
1부터 10까지 존재하는 배열을 만든뒤
반복문을 통해서 만약 해당 값이 짝수,홀수
여부에 따라 아래와 같은 챔플릿 처럼 
출력하도록 한다.

짝수인경우, X는 짝수입니다.
홀수인 경우, X는 홀수입니다.

조건 : 삼항 연산자와 if/else문을 
사용한 예제 2개를 만들어라
*/

let array = [1,2,3,4,5,6,7,8,9,10];

console.log('if, else문');
for(let indexNum = 0; indexNum < array.length; indexNum++) {
    if(array[indexNum] % 2 == 0) 
    {
        console.log(`${array[indexNum]}는 짝수입니다.`);
    }else
    {
        console.log(`${array[indexNum]}는 홀수입니다.`);
    }
}

console.log('삼항연산자');
for(let indexNum = 0; indexNum < array.length; indexNum++) {
    let result = (array[indexNum] % 2 == 0) ? `${array[indexNum]}는 짝수입니다.` : `${array[indexNum]}는 홀수입니다.`;
    console.log(result);
}