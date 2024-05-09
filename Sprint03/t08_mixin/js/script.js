const orig = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const crypt = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm";

let houseMixin = {
  wordReplace(str1, str2) {
    this.description = this.description.replace(str1, str2);
  },

  wordInsertAfter(str1, str2) {
    const index = this.description.indexOf(str1) + str1.length;
    this.description = [
      this.description.slice(0, index),
      " ",
      str2,
      this.description.slice(index),
    ].join("");
  },

  wordDelete(str) {
    const index1 = this.description.indexOf(str);
    const index2 = this.description.indexOf(str) + str.length;
    this.description = [
      this.description.slice(0, index1),
      this.description.slice(index2),
    ].join("");
  },

  wordEncrypt() {
    const index = (item) => orig.indexOf(item);
    let encrypt = (item) => {
      if (index(item) > -1) {
        return crypt[index(item)];
      } else {
        return item;
      }
    };
    this.description = this.description.split("").map(encrypt).join("");
  },

  wordDecrypt() {
    const index = (item) => crypt.indexOf(item);
    let decrypt = (item) => {
      if (index(item) > -1) {
        return orig[index(item)];
      } else {
        return item;
      }
    };
    this.description = this.description.split("").map(decrypt).join("");
  },
};

const house = new HouseBuilder(
  "88 Crescent Avenue",
  "Spacious town house with wood flooring, 2-car garage, and a back patio.",
  "J. Smith",
  110,
  5
);
