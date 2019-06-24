var Trie = require("./Trie");

var TrieTest = new Trie();
//prettier-ignore
test("insert ", () => {                                                                        // every array represents the English alphabet and the  
  TrieTest.insert("App");                                                                       // leters must be inserted in their position in the aphabet
  expect(TrieTest.root.children[0]).toBeDefined();                                              // a - - - - - - - - - - - - - - - - - - - - - - - - - 
  expect(                                                                                       // - - - - - - - - - - - - - - - p - - - - - - - - - -
    TrieTest.root.children[0].children["p".charCodeAt(0) - "a".charCodeAt(0)]                   // - - - - - - - - - - - - - - - p - - - - - - - - - -
  ).toBeDefined();
  expect(                                                                                                   
    TrieTest.root.children[0].children["p".charCodeAt(0) - "a".charCodeAt(0)]
      .children["p".charCodeAt(0) - "a".charCodeAt(0)]
  ).toBeDefined();
});

test("search", () => {
  expect(TrieTest.search("App")).toBe(true);
  expect(TrieTest.search("Bpp")).toBe(false);
});
