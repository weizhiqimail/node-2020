const fs = require('fs');

const event = {
  arr: [],
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    this.arr.forEach(fn => fn());
  }
};

let school = {};

event.on(function () {
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
});

fs.readFile('./name.txt', 'utf8', (err, data) => {
  school.name = data;
  event.emit();
});

fs.readFile('./age.txt', 'utf8', (err, data) => {
  school.age = data;
  event.emit();
});

