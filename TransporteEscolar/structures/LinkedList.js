class Node {
  constructor(data) {
    this.data = data;   // lo que guarda el nodo
    this.next = null;   // referencia al siguiente nodo
  }
}

class LinkedList {
  constructor() {
    this.head = null;   // inicio de la lista
  }

  // Insertar al final
  insert(data) {
    const newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      current = current.next;
    }

    current.next = newNode;
  }

  // Buscar por id
  find(id) {
    let current = this.head;

    while (current !== null) {
      if (current.data.id === id) {
        return current.data;
      }
      current = current.next;
    }

    return null;
  }

  // Eliminar por id
  delete(id) {
    if (this.head === null) return;

    // si el primero es el que queremos borrar
    if (this.head.data.id === id) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next !== null) {
      if (current.next.data.id === id) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }

  // Recorrer la lista
  traverse() {
    let current = this.head;
    let result = [];

    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }
}

export default LinkedList;