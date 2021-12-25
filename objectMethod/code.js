let circle = {
    radius : 5,
    //원의 지름 구하는 함수
    getDiameter: function(){
        return 2* this.radius;
    }
}

console.log(circle.getDiameter()); // 10;

const person = {
    name : 'eom',
    getName(){
//매서드 애부의 this는 메서드를 호출한 객체에 바인딩된다.
        return this.name;
    }
};

console.log(person.getName());// eom