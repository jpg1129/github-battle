class first {
  constructor() {}
  foo() {
    return 'hello';
  }
  passedDownFunc() {
    return this.foo();
  }
}

class second {
  constructor(firstClass) {
    this.firstClass = firstClass;
  }
  test() {
    let fire = this.firstClass.foo();
    console.log(fire);
  }
}
let MyFirst = new first();
let MySecond = new second(MyFirst);
MySecond.test();
