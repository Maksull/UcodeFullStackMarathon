let number = 1;
while (true) {
  const input = prompt(
    `Previous result: ${number}. (to exit enter 'quit') Enter a new number:`
  );
  if (input == "quit") {
    break;
  }
  if (Number.isInteger(Number(input))) {
    number += Number(input);
  } else {
    console.error("Invalid number!");
  }
  if (number > 10_000) {
    number = 1;
  }
}
