export class Queue {
  head = null;
  tail = null;
  _size = 0;

  /**
   * @param  {...Node} nodes list of nodes to store in DoublyLinkedList on construction. Will be stored in the same order as args.
   */
  constructor(...nodes) {
    if (nodes.length > 0) {
      this.head = nodes[0];
      this.tail = nodes[0];
      this._size++;
      for (let i = 1; i < nodes.length; i++) {
        const current = nodes[i];
        this.tail.next = current;
        this.tail = current;
        this._size++;
      }
    }
  }

  /**
   * Nice!
   */
  getHead() {
    return this.head?.data;
  }

  /**
   * Adds data to end of queue
   * @param {*} data
   */
  enqueue(data) {
    const node = new Node(data);
    this.enqueueNode(node);
  }

  /**
   * Removes and returns the first element of the queue
   * @returns data of first element in the queue
   */
  dequeue() {
    const node = this.dequeueNode();
    return node?.data;
  }

  /**
   * Removes first node/head of list and returns it
   * @returns head of list
   */
  dequeueNode() {
    if (this.head === this.tail) {
      const node = this.head;
      this.clear();
      return node;
    }
    const node = this.head;
    this.head = this.head.next;
    this._size--;
    return node;
  }

  /**
   * Adds node to end of queue
   * @param {Node} node
   */
  enqueueNode(node) {
    if (this.tail === this.head) {
      this.head = node;
      this.tail = node;
      this._size++;
      return;
    }
    this._size++;
    this.tail.next = node;
    this.tail = node;
  }

  /**
   * Clears queue
   */
  clear() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  /**
   * Gets size of queue
   * @returns {number} size of queue
   */
  size() {
    return this._size;
  }

  dump() {
    let node = this.head;
    let output = node?.data;
    while (node) {
      if (node !== this.head) {
        output += " <- " + node.data;
      }
      node = node.next;
    }
    console.log("Head: " + this.head?.data);
    console.log("Tail: " + this.tail?.data);
    console.log("Queue: " + output);
  }
}

class Node {
  data;
  next = null;
  constructor(data) {
    this.data = data;
  }
}
