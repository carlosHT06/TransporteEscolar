class Graph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
  }

  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1)
    }

    if (!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2)
    }

    this.adjacencyList[vertex1].push(vertex2)
    this.adjacencyList[vertex2].push(vertex1)
  }

  bfs(start, end) {
    if (!this.adjacencyList[start] || !this.adjacencyList[end]) {
      return null
    }

    const queue = []
    const visited = {}
    const previous = {}

    queue.push(start)
    visited[start] = true
    previous[start] = null

    while (queue.length > 0) {
      const current = queue.shift()

      if (current === end) {
        break
      }

      const neighbors = this.adjacencyList[current] || []

      for (const neighbor of neighbors) {
        if (!visited[neighbor]) {
          queue.push(neighbor)
          visited[neighbor] = true
          previous[neighbor] = current
        }
      }
    }

    if (!visited[end]) {
      return null
    }

    const path = []
    let current = end

    while (current !== null) {
      path.unshift(current)
      current = previous[current]
    }

    return path
  }

  getGraph() {
    return this.adjacencyList
  }
}

export default Graph