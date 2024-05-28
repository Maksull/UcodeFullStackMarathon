const LLData = require("./LLData");

module.exports.LList = class LList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    [Symbol.iterator]() {
        let iter = this.head;
        return {
            next: () => {
                if (!iter) {
                    return { done: true };
                }
                const value = iter.data;
                iter = iter.next;
                return { value, done: false };
            }
        };
    }

    getFirst() {
        return this.head ? this.head.data : null;
    }

    getLast() {
        if (!this.head) return null;
        let iter = this.head;
        while (iter.next) {
            iter = iter.next;
        }
        return iter.data;
    }

    add(value) {
        const newNode = new LLData(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let iter = this.head;
            while (iter.next) {
                iter = iter.next;
            }
            iter.next = newNode;
        }
        this.length++;
    }

    addFromArray(arr) {
        arr.forEach(value => this.add(value));
    }

    remove(value) {
        if (!this.head) return;

        if (this.head.data === value) {
            this.head = this.head.next;
            this.length--;
            return;
        }

        let iter = this.head;
        while (iter.next && iter.next.data !== value) {
            iter = iter.next;
        }

        if (iter.next) {
            iter.next = iter.next.next;
            this.length--;
        }
    }

    removeAll(value) {
        while (this.head && this.head.data === value) {
            this.head = this.head.next;
            this.length--;
        }

        let iter = this.head;
        while (iter && iter.next) {
            if (iter.next.data === value) {
                iter.next = iter.next.next;
                this.length--;
            } else {
                iter = iter.next;
            }
        }
    }

    contains(value) {
        let iter = this.head;
        while (iter) {
            if (iter.data === value) {
                return true;
            }
            iter = iter.next;
        }
        return false;
    }

    clear() {
        this.head = null;
        this.length = 0;
    }

    count() {
        return this.length;
    }

    toString() {
        const values = [];
        let iter = this.head;
        while (iter) {
            values.push(iter.data);
            iter = iter.next;
        }
        return values.join(", ");
    }

    getIterator() {
        return this[Symbol.iterator]();
    }

    filter(callback) {
        const newList = new LList();
        let iter = this.head;
        while (iter) {
            if (callback(iter.data)) {
                newList.add(iter.data);
            }
            iter = iter.next;
        }
        return newList;
    }
}