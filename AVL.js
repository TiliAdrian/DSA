class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
  }
}

class AVL {
  constructor() {
    this.root = new Node(null);
    this.count = 0;
  }

  leftRotation(node) {
    const rightNode = node.right;
    node.right = rightNode.left;
    rightNode.left = node;
    if (node === this.root) {
      this.root = rightNode;
    } else {
      this.findParent(this.root, node.value).right = rightNode;
    }
  }

  rightRotation(node) {
    const leftNode = node.left;
    node.left = leftNode.right;
    leftNode.right = node;

    if (node === this.root) {
      this.root = leftNode;
    } else {
      this.findParent(this.root, node.value).left = leftNode;
    }
  }

  getHeight(node) {
    if (node === null || node === undefined) {
      return 0;
    }
    if (node.left === null && node.right === null) {
      return 1;
    }
    return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  checkBalance(current) {
    let left = this.getHeight(current.left);
    let right = this.getHeight(current.right);

    if (left - right < -1) {
      if (current.right !== null) {
        let leftofright = this.getHeight(current.right.left);
        let rightofright = this.getHeight(current.right.right);

        if (leftofright - rightofright > 0) {
          this.leftRotation(current);
          this.rightRotation(current);
        }
      }
      this.leftRotation(current);
    } else if (left - right > 1) {
      if (current.left !== null) {
        let leftofleft = this.getHeight(current.left.left);
        let rightofleft = this.getHeight(current.left.right);

        if (leftofleft - rightofleft < 0) {
          this.rightRotation(current);
          this.leftRotation(current);
        }
      }
      this.rightRotation(current);
    }
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
    this.checkBalance(currentNode);
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
    var nodeToRemove = this.root;

    let stackPath = [];
    stackPath.push(this.root);
    while (nodeToRemove !== null && nodeToRemove.value !== value) {
      if (value < nodeToRemove.value) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
      stackPath.push(nodeToRemove);
    }
    console.log(nodeToRemove);
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
    while (stackPath.length > 0) {
      this.checkBalance(stackPath.pop());
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

module.exports = AVL;
