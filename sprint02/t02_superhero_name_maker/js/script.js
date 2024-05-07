let enteredAnimal;
let gender;
let age;

while (enteredAnimal == null) {
  enteredAnimal = prompt(`What animal is the superhero most similar to?`, ``);
  if (enteredAnimal.length > 20 || !RegExp(`^[a-zA-Z]+$`).test(enteredAnimal)) {
    alert(`Length must be 20 or lower, only one word that contains only letters is acceptable`);
    enteredAnimal = null;
  } else {
    alert(`Animal name is ${enteredAnimal}`);
  }
}
while (gender == null) {
  gender = prompt(
    `Is the superhero male or female? Leave blank if unknown or other.`,
    ``
  );
  if (!RegExp(`^female$|^male$|^$`, `i`).test(gender)) {
    alert(`Accepts only male, female, or empty`);
    gender = null;
  } else {
    if (gender == "") {
      alert(`Gender is empty`);
    } else {
      alert(`Gender is ${gender}`);
    }
  }
}
while (age == null) {
  age = prompt(`How old is the superhero?`, ``);
  if (age.length > 5 || !RegExp(/^\d+$/).test(age)) {
    alert(`The number must consist from 5 or lowe digits, cannot start with a zero`);
    age = null;
  } else {
    alert(`Age is ${age}`);
  }
}
if (age < 18 && RegExp(`^female$`, `i`).test(gender)) {
  alert(`The superhero name is: ${enteredAnimal}-girl`);
} else if (age >= 18 && RegExp(`^female$`, `i`).test(gender)) {
  alert(`The superhero name is: ${enteredAnimal}-woman`);
} else if (age < 18 && RegExp(`^male$`, `i`).test(gender)) {
  alert(`The superhero name is: ${enteredAnimal}-boy`);
} else if (age >= 18 && RegExp(`^male$`, `i`).test(gender)) {
  alert(`The superhero name is: ${enteredAnimal}-man`);
} else if (age < 18 && RegExp(`^$`).test(gender)) {
  alert(`The superhero name is: ${enteredAnimal}-kid`);
} else if (age >= 18 && RegExp(`^$`).test(gender)) {
  alert(`The superhero name is: ${enteredAnimal}-hero`);
}
