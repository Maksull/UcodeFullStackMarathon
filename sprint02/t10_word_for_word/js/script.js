function addWords(obj, wordsToAdd) {
  let newWrds = wordsToAdd.split(" ");
  let words = obj.words.split(" ");
  let result = words.concat(newWrds).filter(function (value, index, self) {
    return self.indexOf(value) == index;
  });
  obj.words = result.join(" ").trim();
}

function removeWords(obj, wordsToAdd) {
  let del = wordsToAdd.split(" ");
  let result = obj.words.split(" ");
  let size = del.length;
  for (let i = 0; i < size; i++) {
    result = result.filter(function (value) {
      return value != del[i];
    });
  }
  obj.words = result.join(" ").trim();
}

function changeWords(obj, oldWords, newWords) {
  removeWords(obj, oldWords);
  addWords(obj, newWords);
}
