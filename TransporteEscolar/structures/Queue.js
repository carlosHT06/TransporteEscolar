class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class Queue {
  constructor() {
    this.front = null
    this.rear = null
  }

  // Agregar al final (enqueue)
  enqueue(data) {
    const newNode = new Node(data)

    if (!this.rear) {
      this.front = newNode
      this.rear = newNode
      return
    }

    this.rear.next = newNode
    this.rear = newNode
  }

  // Sacar el primero (dequeue)
  dequeue() {
    if (!this.front) return null

    const removed = this.front
    this.front = this.front.next

    if (!this.front) {
      this.rear = null
    }

    return removed.data
  }

  // Ver el primero
  peek() {
    if (!this.front) return null
    return this.front.data
  }

  isEmpty() {
    return this.front === null
  }

  // Recorrer
  traverse() {
    let current = this.front
    const result = []

    while (current) {
      result.push(current.data)
      current = current.next
    }

    return result
  }
}

export default Queue