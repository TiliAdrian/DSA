const ALPHABET_SIZE = 26;

class Node {
  constructor() {
    this.children = new Array(ALPHABET_SIZE);
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
    this.size = ALPHABET_SIZE;
  }

  insert(key) {
    let level;
    let length = key.length;
    let index;

    let current = this.root;

    for (level = 0; level < length; level++) {
      index = key[level].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);

      if (current.children[index] === undefined) {
        current.children[index] = new Node();
      }

      current = current.children[index];
    }
    current.isEndOfWord = true;
  }

  search(key) {
    let level;
    let length = key.length;
    let index;

    let current = this.root;
    for (level = 0; level < length; level++) {
      index = key[level].toLowerCase().charCodeAt(0) - "a".charCodeAt(0);

      if (current.children[index] === undefined) {
        return false;
      }
      current = current.children[index];
    }

    return current !== undefined && current.isEndOfWord;
  }
}

let a = new Trie();
a.insert("Apple");
console.log(a);
console.log(a.search("Apple"));
