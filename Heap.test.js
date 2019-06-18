var Heap = require("./Heap");

var HeapTest = new Heap();

test("add root", () => {
  HeapTest.add(10);
  expect(HeapTest.heap.length).toBe(1);
  expect(HeapTest.count).toBe(1);
});

test("add left and right child to root", () => {
  HeapTest.add(11);
  HeapTest.add(30);
  expect(HeapTest.heap[1]).toBe(11);
  expect(HeapTest.heap[2]).toBe(30);
  expect(HeapTest.count).toBe(3);
});

test("add child < parent", () => {
  HeapTest.add(8);
  expect(HeapTest.heap[0]).toBe(8);
  expect(HeapTest.heap[3]).toBe(11);
  expect(HeapTest.heap[1]).toBe(10);
});

test("search", () => {
  expect(HeapTest.search(50)).toBe(false);
  expect(HeapTest.search(10)).toBe(true);
});

test("remove value not in heap", () => {
  expect(HeapTest.remove(2)).toBe("value is not in the heap");
});

test("remove", () => {
  expect(HeapTest.search(10)).toBe(true);
  HeapTest.remove(10);
  expect(HeapTest.search(10)).toBe(false);
});

test("remove and positions update", () => {
  HeapTest.add(10);
  HeapTest.remove(10);
  expect(HeapTest.heap[1]).toBe(11);
});
