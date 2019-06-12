var BST = require("./BST");

var BSTtest = new BST();

test("insert", () => {
  BSTtest.insert(10);
  expect(BSTtest.root.value).toBe(10);
  BSTtest.insert(9);
  expect(BSTtest.root.left.value).toBe(9);
  BSTtest.insert(11);
  expect(BSTtest.root.right.value).toBe(11);
  BSTtest.insert(8);
  expect(BSTtest.root.left.left.value).toBe(8);
});

test("search", () => {
  expect(BSTtest.search(10)).toBe(true);
});

test("remove", () => {
  BSTtest.remove(9);
  expect(BSTtest.search(9)).toBe(false);
  expect(BSTtest.root.left.value).toBe(8);
});
