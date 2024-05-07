let numb = null;

while (numb == null) {
  numb = prompt(`Enter a number from 1 to 10: `, ``);
  numb = Number(numb);
  if (numb < 1 || numb > 10 || !Number.isInteger(numb)) {
    numb = null;
  }
}

switch (numb) {
  case 1:
    alert(`Back to square 1`);
    break;

  case 2:
    alert(`Goody 2-shoes`);
    break;

  case 3:
    alert(`Twos company, threes a crowd`);
    break;

  case 4:
    alert(`Counting sheep`);
    break;

  case 5:
    alert(`Take five`);
    break;

  case 6:
    alert(`Twos company, threes a crowd`);
    break;

  case 7:
    alert(`Seventh heaven`);
    break;

  case 8:
    alert(`Behind the eight-ball`);
    break;

  case 9:
    alert(`Counting sheep`);
    break;

  case 10:
    alert(`Cheaper by the dozen`);
    break;
}
