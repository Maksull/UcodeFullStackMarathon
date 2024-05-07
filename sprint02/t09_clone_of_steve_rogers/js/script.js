function copyObj(obj) {
  if (null == obj || "object" != typeof obj) {
    return obj;
  }
  let temp = {};
  for (let item in obj) {
    temp[item] = obj[item];
  }
  return temp;
}
