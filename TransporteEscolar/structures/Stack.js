class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
  }

  push(data) {
    const newNode = new Node(data)

    newNode.next = this.top
    this.top = newNode
  }

  pop() {
    if (!this.top) return null

    const removed = this.top
    this.top = this.top.next

    return removed.data
  }

  peek() {
    if (!this.top) return null

    return this.top.data
  }

  isEmpty() {
    return this.top === null
  }

  traverse() {
    let current = this.top
    const result = []

    while (current) {
      result.push(current.data)
      current = current.next
    }

    return result
  }
}

export default Stack