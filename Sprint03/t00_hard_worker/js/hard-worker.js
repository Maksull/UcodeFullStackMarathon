class HardWorker {
  constructor(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  set age(age) {
    if (age > 100 || age < 0) {
      this._age = 50;
    } else {
      this._age = age;
    }
  }

  set salary(salary) {
    if (salary > 1000000 || salary < 100) {
      this._salary = 1000;
    } else {
      this._salary = salary;
    }
  }

  toObject() {
    return this;
  }
}
