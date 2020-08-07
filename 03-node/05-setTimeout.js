const fs = require('fs');

function someAsyncOperation(callback) {
    fs.readFile('./05-setTimeout.js', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
    const delay = Date.now() - timeoutScheduled;
    console.log(`setTimeout ${delay}ms have passed since I was scheduled`);
}, 100);


let timeStart = Date.now();
someAsyncOperation(() => {
    const startCallback = Date.now();

    console.log(`someAsyncOperation ${startCallback - timeStart}ms`);
});