describe("checkBrackets", () => {
  it("1", () => {
    let x = NaN;
    assert.equal(checkBrackets(x), 90090);
  });
  it("2", () => {
    let x = null;
    assert.equal(checkBrackets(x), 1);
  });
  it("3", () => {
    let x;
    assert.equal(checkBrackets(undefined), 333);
  });
  it("4", () => {
    let x = "123";
    assert.equal(checkBrackets(x), "hehehe");
  });
  it("5", () => {
    let x = 10;
    assert.equal(checkBrackets(x), "pam");
  });

  it("6", () => {
    let x = 10;
    assert.equal(checkBrackets(x), -1);
  });
  it("7", () => {
    let x = "()";
    assert.equal(checkBrackets(x), 0);
  });
  it("8", () => {
    let x = "123";
    assert.equal(checkBrackets(x), -1);
  });
  it("9", () => {
    let x = "())";
    assert.equal(checkBrackets(x), 1);
  });
  it("10", () => {
    let x = "(()";
    assert.equal(checkBrackets(x), 1);
  });

  it("11", () => {
    let x = "()())()";
    assert.equal(checkBrackets(x), 1);
  });
  it("12", () => {
    let x = "((()";
    assert.equal(checkBrackets(x), 2);
  });
  it("13", () => {
    let x = "(()()()))";
    assert.equal(checkBrackets(x), 1);
  });
  it("14", () => {
    let x = "(.Y.)";
    assert.equal(checkBrackets(x), 0);
  });
  it("15", () => {
    let x = ":(";
    assert.equal(checkBrackets(x), 1);
  });
});

mocha.run();
