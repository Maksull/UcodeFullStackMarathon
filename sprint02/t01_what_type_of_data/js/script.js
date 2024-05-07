let number = 1;
let bigInt = BigInt(9007199254740991);
let str = "test";
let bool = true;
let n = null;
let undef;
let obj = {};
let char = Symbol("a");
function func() {}
alert(`number is ${typeof number}\n 
bigInt is ${typeof bigInt}\n 
str is ${typeof str}\n 
boolean: ${typeof bool}\n 
n is ${typeof n}\n 
undef is ${typeof undef}\n 
obj is ${typeof obj}\n 
char is ${typeof char}\n 
func is ${typeof func}\n`);
