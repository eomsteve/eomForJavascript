console.log("10초동안 반복적으로 현재시간 나타내기!")
let count = 1;

const timeoutId = setInterval(()=>{
    console.log(Date());
    if(count++==10) clearInterval(timeoutId);
}, 1000);
