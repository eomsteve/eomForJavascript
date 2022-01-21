function outerFunc(){
    let x = 10;
    let innerFunc = () => console.log(x);
    innerFunc();
}

outerFunc();

const x = 1;

function foo(){
    const x = 11;
    bar();
}

function bar(){
    console.log(x);
}

foo();
bar();

const increase = (function (){
    let num = 0;

    return function () {
        return ++num;
    }
}());


console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3