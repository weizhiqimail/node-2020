const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
      }

    };

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
      }

    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === RESOLVED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }

}


module.exports = Promise;
