let concat = (str1, str2 = null) => {
  if (str2 != null) {
    return `${str1} ${str2}`;
  }
  function setstring() {
    str2 = prompt("Enter the second string - ", "");
    setstring.count += 1;
    return `${str1} ${str2}`;
  }
  setstring.count = 0;
  return setstring;
};
