
// (function phoneBattery () {
//   function createPhone () {
//   let battery = 0;
//   return {
//   rechargeBattery: function () {
//   battery = 100;
//   },
//   showRemainBattery: function () {
//   return battery;
//   }
//   }
//   }
//   const phone1 = createPhone();
//   const phone2 = createPhone();
//   phone1.rechargeBattery()

//   console.log(phone1.showRemainBattery())  
// })();
  


function Robot (usage) {
    this.usage = usage;
    this.battery = 100;
    this.owner = 'Julia';
  }

batteryMixin(Robot.prototype);

Object.prototype.soldTo = function (newOwner) {
    this.owner = newOwner;
}

function SmartPhone (brand) {
  this.brand = brand;
  this.battery = 100;
}

batteryMixin(SmartPhone.prototype);


function batteryMixin (target) {
    target.rechargeBattery = function() {
      setTimeout(() => {
        this.battery = 100;
        console.log(`${this.battery}% charged`);
      }, 1000);
  }


  target.turnOn = function () {
    setTimeout( () => {
    this.battery -= 80;
    console.log(`${this.battery}% of battery remaining`);
    }, 1000);
    }
}

const phone1 = new SmartPhone('apple');
const robot = new Robot('서빙');

phone1.rechargeBattery();
phone1.turnOn();
phone1.soldTo('eom');


robot.rechargeBattery();
robot.turnOn();