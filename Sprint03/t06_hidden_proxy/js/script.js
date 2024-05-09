const validator = {
  set: function (item, property, data) {
    if (property == "gender") {
      if (data != "male" && data != "female") {
        throw new TypeError("The gender is invalid");
      }
    }
    if (property == "age") {
      if (!Number.isInteger(data)) {
        throw new TypeError("The age is not an integer");
      }
      if (data < 0 || data > 200) {
        throw new RangeError("The age is invalid");
      }
    }
    console.log(`Setting value '${data}' to '${property}'`);
    item[property] = data;
  },

  get: function (item, property) {
    console.log(`Trying to access the property '${property}'...`);
    if (item.hasOwnProperty(property)) {
      return item[property];
    } else {
      return false;
    }
  },
};
