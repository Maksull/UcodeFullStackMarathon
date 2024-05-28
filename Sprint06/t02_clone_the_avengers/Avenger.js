class Foo extends Function {
    constructor() {
        super('...args', 'return this.self.call(...args)');
        return this.self = this.bind(this);
    }
}

module.exports.Avenger = class Avenger extends Foo {
    constructor(name, alias, gender, age, powers, hp) {
        super();
        this.hero_name = name;
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.power = powers;
        this.hp = hp;
    }

    toString() {
        return `name: ${this.hero_name} \ngender: ${this.gender} \nage: ${this.age}`;
    }
    call() {
        return `${this.alias.toUpperCase()}\n${this.power.join('\n')}`;
    }
}

