let firstName = String(prompt(`What is your first name?`));
let secondName = String(prompt(`What is your last name?`));

if (firstName.match(/^[a-z]+$/i) && secondName.match(/^[a-z]+$/i)) {
  let firstNameTransformed = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  let secondNameTransformed = secondName.charAt(0).toUpperCase() + secondName.slice(1).toLowerCase();
  alert(`Hey, ${firstNameTransformed} ${secondNameTransformed}`);
  console.log(`Hey, ${firstNameTransformed} ${secondNameTransformed}`);
} else {
  alert(`Wrong input!`);
  console.log(`Wrong input!`);
}
