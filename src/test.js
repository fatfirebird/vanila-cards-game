export default class Test {
  constructor(params) {
    this.test = this.test.bind(this);
  }

  static test(params) {
    console.log(123)
  }
};
