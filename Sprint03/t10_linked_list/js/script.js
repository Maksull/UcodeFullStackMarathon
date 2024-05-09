class Node {
  constructor(element) {
    this.data = element;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  add(item) {
    const node = new Node(item);
    if (this.length == 0) {
      this.head = node;
    } else {
      let i = this.head;
      while (i.next) {
        i = i.next;
      }
      i.next = new Node(item);
    }
    this.length++;
  }

  remove(item) {
    if (this.head.data == item) {
      this.head = this.head.next;
      this.length--;
    } else {
      let i = this.head;
      while (i.next) {
        if (i.next.data == item) {
          i.next = i.next.next;
          this.length--;
        }
        i = i.next;
      }
    }
  }

  contains(item) {
    let i = this.head;
    while (i) {
      if (i.data == item) {
        return true;
      }
      i = i.next;
    }
    return false;
  }

  [Symbol.iterator] = function () {
    let current = this.head;
    return {
      next() {
        if (current) {
          let item = current.data;
          current = current.next;
          return { value: item, done: false };
        }
        return { done: true };
      },
    };
  };

  clear() {
    this.head = null;
    this.length = 0;
  }

  count() {
    return this.length;
  }

  log() {
    let res = "";
    let i = this.head;
    while (i) {
      res += i.data;
      if (i.next) {
        res += ", ";
      }
      i = i.next;
    }
    console.log(res);
  }
}

const createLinkedList = (arr) => {
  const list = new List();
  arr.forEach((item) => list.add(item));
  return list;
};
