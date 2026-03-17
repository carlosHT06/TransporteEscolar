class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  insert(data) {
    const newNode = new Node(data)

    if (!this.root) {
      this.root = newNode
      return
    }

    let current = this.root

    while (true) {
      if (data.hour < current.data.hour) {
        if (!current.left) {
          current.left = newNode
          return
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          return
        }
        current = current.right
      }
    }
  }

  find(hour) {
    let current = this.root

    while (current) {
      if (hour === current.data.hour) {
        return current.data
      }

      if (hour < current.data.hour) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }

  inOrder(node = this.root, result = []) {
    if (!node) return result

    this.inOrder(node.left, result)
    result.push(node.data)
    this.inOrder(node.right, result)

    return result
  }

  preOrder(node = this.root, result = []) {
    if (!node) return result

    result.push(node.data)
    this.preOrder(node.left, result)
    this.preOrder(node.right, result)

    return result
  }

  postOrder(node = this.root, result = []) {
    if (!node) return result

    this.postOrder(node.left, result)
    this.postOrder(node.right, result)
    result.push(node.data)

    return result
  }
}

export default BinaryTree