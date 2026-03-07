class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
  }
}

class HashTable {
  constructor(size = 10) {
    this.size = size
    this.buckets = new Array(size).fill(null)
  }

  // función hash simple basada en caracteres
  hash(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % this.size
  }

  // insertar usuario
  insert(key, value) {
    const index = this.hash(key)
    const newNode = new Node(key, value)

    if (!this.buckets[index]) {
      this.buckets[index] = newNode
      return
    }

    let current = this.buckets[index]

    while (true) {
      if (current.key === key) {
        current.value = value
        return
      }

      if (!current.next) {
        current.next = newNode
        return
      }

      current = current.next
    }
  }

  // buscar usuario
  get(key) {
    const index = this.hash(key)
    let current = this.buckets[index]

    while (current) {
      if (current.key === key) {
        return current.value
      }
      current = current.next
    }

    return null
  }

  // eliminar
  delete(key) {
    const index = this.hash(key)
    let current = this.buckets[index]

    if (!current) return

    if (current.key === key) {
      this.buckets[index] = current.next
      return
    }

    while (current.next) {
      if (current.next.key === key) {
        current.next = current.next.next
        return
      }
      current = current.next
    }
  }
}

export default HashTable