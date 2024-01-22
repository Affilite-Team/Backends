const { json } = require("express");
const user = require("../me");

test("test a + b to return sum", () => {
  expect(user).toEqual(json);
});
