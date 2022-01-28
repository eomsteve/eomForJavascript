let mySingleton = (function MySingleton(){
  let instance;
  function makeSingleton(name, age){
    this.name = name;
    this.age = age;
  return {
    sayHi:() => {
      return console.log(`hello i'm ${this.name}, ${this.age}`)
      }
    }
  }

  return {
    isIntance: (name, age) => {
      if(!instance){
        instance = makeSingleton(name, age);
      }
        return instance;
    }
  }
})();




let singleton = mySingleton.isIntance('Lee', 25);
singleton.sayHi();
let other = mySingleton.isIntance('kim', 21);

other.sayHi();
console.log(singleton  == other);


class MySingletonClass{
  static instance;
  #name = ''
  #age = 0;
  constructor(name, age){
    if(MySingletonClass.instance) return MySingletonClass.instance;
    this.#name = name;
    this.#age = age;
    MySingletonClass.instance = this;
  }
  sayHi(){
      return console.log(`hello i'm ${this.#name}, ${this.#age}`)
      }
}

let singleClass = new MySingletonClass('eom',28)
let otherSingleClass = new MySingletonClass('kim',11)
singleClass.sayHi();
otherSingleClass.sayHi();

console.log(otherSingleClass == singleClass);