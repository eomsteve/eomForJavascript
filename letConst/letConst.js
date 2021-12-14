let 변수 = 10;
//let 키워드를 이용한 변수 선언
const 상수 = 10;
//const 키워드를 이용한 상수선언


/*
    let 은 변수로서 선언한뒤 어떠한 값이든 재 할당을 할수 있다. = 수정이 가능하다.
    const는 상수 키워드로서 선언뒤 재할당이 불가능하다. 값을 선언할 때 말곤 
    수정이 불가은ㅇ하다.
*/

let value = 10;
let value = 10; // error
//재 선언 불가능
value = 11; //ok
//재 할당 가능

const a = 1;
const a = 2; // error
a = 3; // error
//재 선언과 재 할당 불가능
