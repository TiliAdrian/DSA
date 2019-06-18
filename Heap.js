class Heap {
  constructor() {
    this.heap = new Array();
    this.count = 0;
  }

  minHeapify() {
    var i = this.count - 1;

    while (i > 0 && this.heap[i] < this.heap[Math.floor((i - 1) / 2)]) {
      let aux = this.heap[Math.floor((i - 1) / 2)];
      this.heap[Math.floor((i - 1) / 2)] = this.heap[i];
      this.heap[i] = aux;

      i = Math.floor((i - 1) / 2);
    }
  }

  add(value) {
    this.heap[this.count] = value;
    this.count++;
    this.minHeapify();
  }

  findIndex(value) {
    var i = 0;
    while (i < this.count) {
      if (this.heap[i] === value) {
        return i;
      }
      i++;
    }
    return -1;
  }

  remove(value) {
    var index = this.findIndex(value);
    if (index < 0) {
      return "value is not in the heap";
    }
    this.count--;
    this.heap[index] = this.heap[this.count];
    var left = 2 * index + 1;
    var right = 2 * index + 2;
    while (
      left < this.count &&
      (this.heap[index] > this.heap[left] ||
        this.heap[index] > this.heap[right])
    ) {
      if (this.heap[left] < this.heap[right]) {
        let aux = this.heap[index];
        this.heap[index] = this.heap[left];
        this.heap[left] = aux;
      } else {
        let aux = this.heap[index];
        this.heap[index] = this.heap[right];
        this.heap[right] = aux;
      }
    }
  }

  parent(index) {
    if (index > 1) {
      return Math.floor((index - 1) / 2);
    }
    return 0;
  }

  search(value) {
    var start = 0;
    var nodes = 1;
    while (start < this.count) {
      start = nodes - 1;
      var end = nodes + start;
      var nr = 0;
      while (start < this.count && start < end) {
        if (value === this.heap[start]) {
          return true;
        }
        if (
          value > this.heap[this.parent(this.findIndex(this.heap[start]))] &&
          value < this.heap[start]
        ) {
          nr++;
        }
        // console.log(this.findIndex(this.heap[start]));
        start++;
      }
      if (nr === nodes) {
        return false;
      }
      nodes = nodes * 2;
    }

    return false;
  }
}

module.exports = Heap;
