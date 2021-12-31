let person = {
    name : 'kim',
    sayHello : function(){
        console.log(`Hello my name is ${this.name}.`);
    }
} 
person.sayHello();


let otherPerson = {
    //프로퍼티 key는 name, value는 'lee'
    name : 'lee',
    age : 20
};

let foo ={
    var : "",
    function: ""
}

//프로퍼티 키를 중복 선언하면 먼저 선언한 프로퍼티를 덮어쓴다.

let boo = {
    name : 'lee',
    name : 'kim'
}
console.log(boo); // {name : 'kim'}

let notation = {
    name : 'eom'
}

console.log(notation.name); // eom

console.log(notation['name']);  //eom


let value = {
    key : 'value'
}

value.key = 123;

console.log(value); // {key : 123}

let add = {
    name : 'eom'
}

add.age = 28;

console.log(add); //{ name : 'eom', age : 28 }

let deleteOB = {
    name : 'lee'
}

deleteOB.age = 20;

delete deleteOB.name;

console.log(deleteOB); // {age : 20}