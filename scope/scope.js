function foo(){
  console.log('globla function for');
}

function bar(){
  //중첩함수
  function foo(){
    console.log('local function fooo');
  }
  foo(); // 1
}

bar(); // 2