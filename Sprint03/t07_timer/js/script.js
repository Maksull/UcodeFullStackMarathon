class Timer {
  constructor(title, delay, stopCount) {
    this.title = title;
    this.delay = delay;
    this.stopCount = stopCount;
  }

  start() {
    console.log(
      `Timer ${this.title} started (delay=${this.delay},  stopCount=${this.stopCount})`
    );
    this.timer = setInterval(() => this.tick(), this.delay);
  }

  tick() {
    this.stopCount--;
    console.log(`Timer ${this.title} Tick! | cycles left ${this.stopCount}`);
    if (this.stopCount == 0) {
      this.stop();
    }
  }

  stop() {
    console.log(`Timer ${this.title} stopped`);
    clearInterval(this.timer);
  }
}

function runTimer(id, delay, counter) {
  const timer = new Timer(id, delay, counter);
  timer.start();
}

runTimer("Bleep", 1000, 5);
