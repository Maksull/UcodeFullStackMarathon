function total(count, price, sum) {
  if (
    Number.isNaN(count) ||
    count === undefined ||
    Number.isNaN(price) ||
    price === undefined ||
    Number.isNaN(sum) ||
    sum === undefined
  ) {
    sum = 0;
  }
  if (count === 0) {
    return sum;
  } else {
    sum += count * price;
  }
  return sum;
}
z;
