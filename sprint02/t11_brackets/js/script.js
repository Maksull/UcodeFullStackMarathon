function checkBrackets(str) {
  if (!str) {
    return "-1";
  }
  let r = 0;
  let l = 0;
  let result = 0;
  let size = str.length;
  for (let i = 0; i < size; i++) {
    if (str[i] == ")") {
      r++;
      if (r > l) {
        r = 0;
        l = 0;
        result++;
      }
    } else if (str[i] == "(") {
      l++;
    }
  }
  if (l == 0 && r == 0 && result == 0) {
    return "-1";
  } else if (l > r) {
    return String(result + l - r);
  }
  return String(result);
}
