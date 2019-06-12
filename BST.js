class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class BST {
  constructor() {
    this.root = new Node(null);
    this.count = 0;
  }

  insertNode(currentNode, value) {
    if (value < currentNode.value) {
      if (currentNode.left === null) {
        currentNode.left = new Node(value);
      } else {
        this.insertNode(currentNode.left, value);
      }
    } else {
      if (currentNode.right === null) {
        currentNode.right = new Node(value);
      } else {
        this.insertNode(currentNode.right, value);
      }
    }
  }

  insert(value) {
    if (this.root.value === null) {
      this.root.value = value;
    } else {
      this.insertNode(this.root, value);
    }
    this.count++;
  }

  containes(node, value) {
    if (node === null) {
      return false;
    }
    if (node.value === value) {
      return true;
    } else if (value < node.value) {
      return this.containes(node.left, value);
    } else {
      return this.containes(node.right, value);
    }
  }

  search(value) {
    if (this.root.value === null) {
      return false;
    }
    if (this.root.value === value) {
      return true;
    } else if (value < this.root.value) {
      return this.containes(this.root.left, value);
    } else {
      return this.containes(this.root.right, value);
    }
  }

  findNode(root, value) {
    if (root.value === null) {
      return null;
    }
    if (root.value === value) {
      return root;
    } else if (value < root.value) {
      return this.findNode(root.left, value);
    } else {
      return this.findNode(root.right, value);
    }
  }

  findParent(root, value) {
    if (value === root.value) {
      return null;
    }
    if (value < root.value) {
      if (root.left === null) {
        return null;
      } else if (value === root.left.value) {
        return root;
      } else {
        return this.findParent(root.left, value);
      }
    } else {
      if (root.right === null) {
        return null;
      } else if (value === root.right.value) {
        return root;
      } else {
        return this.findParent(root.right, value);
      }
    }
  }

  remove(value) {
    const nodeToRemove = this.findNode(this.root, value);
    if (nodeToRemove === null) {
      return "Value not in tree";
    }
    const parent = this.findParent(this.root, value);
    if (this.count === 1) {
      this.root = new Node(null); // if there is only the root in the tree
    } else if (nodeToRemove.left === null && nodeToRemove.right === null) {
      // case where the node to be removed is a leaf
      if (nodeToRemove.value < parent.value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (nodeToRemove.left === null && nodeToRemove.right !== null) {
      //case where the node to be removed has only right child
      if (nodeToRemove.value < parent.value) {
        parent.left = nodeToRemove.right;
      } else {
        parent.right = nodeToRemove.right;
      }
    } else if (nodeToRemove.left !== null && nodeToRemove.right === null) {
      //case where the node to be removed has only left child
      if (nodeToRemove.value < parent.value) {
        parent.left = nodeToRemove.left;
      } else {
        parent.right = nodeToRemove.left;
      }
    } else {
      // case where the node to be removed has both children
      const biggest = nodeToRemove.left;
      while (biggest.right !== null) {
        biggest = biggest.right; // computing largest value from left tree of the node to be removed
      }
      this.findParent(this.root, biggest.value).right = null;
      nodeToRemove.value = biggest.value; //replacing the value of the node to be removed with what we have found
    }
    this.count--;
    return "Node deleted";
  }

  preorderAux(root) {
    if (root !== null) {
      console.log(root.value);
      this.preorderAux(root.left);
      this.preorderAux(root.right);
    }
  }
  preorder() {
    if (this.root.value !== null) {
      this.preorderAux(this.root);
    }
  }

  postorderAux(root) {
    if (root !== null) {
      this.postorderAux(root.left);
      this.postorderAux(root.right);
      console.log(root.value);
    }
  }
  postorder() {
    if (this.root.value !== null) {
      this.postorderAux(this.root);
    }
  }

  inorderAux(root) {
    if (root !== null) {
      this.inorderAux(root.left);
      console.log(root.value);
      this.inorderAux(root.right);
    }
  }
  inorder() {
    if (this.root.value !== null) {
      this.inorderAux(this.root);
    }
  }
}

module.exports = BST;
