//비교 연산자
console.log("문자열 비교시 아스키 값을 따라 번호가 대치되어 크기를 비교한다.");
console.log('Z'>='C'); //true
console.log('blow'>='blee'); //true
console.log('see'>'se'); //true
console.log("숫자와 문자 비교도 가능하다.");
console.log('3'>1);// true
console.log(3 <= 1); // false
console.log(3 < 6); // true

console.log("동등, 일치연산자");
console.log('03'==3); //true 
// 그러나 ===를 비교할 경우
console.log('03'===3); //false
console.log("동등 일치와 반대로 다른값을 판별할 수 있다.");
console.log('3'!= 3); //false
console.log('3'!==3); //true

//논리연산자
console.log("OR (||) 연산자 : 비교하는 값들 중 하나라도 참일경우 참을 반환한다.");
console.log( true || true );   // true
console.log( false || true );  // true
console.log( true || false );  // true
console.log( false || false ); // false
console.log("and 연산자 : 비교하는 값 모두가 참일경우만 참을 반환한다.")
console.log( true && true );   // true
console.log( false && true );  // false
console.log( true && false );  // false
console.log( false && false ); // false
console.log("not 연산자 : 반환하는 값의 반대 값을 반환한다.");
console.log( !true ); // false
console.log( !0 ); // true
