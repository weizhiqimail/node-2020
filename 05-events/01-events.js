const EventEmitter = require('events');
const util = require('util');

function Girl() {
}

util.inherits(Girl, EventEmitter);

let girl = new Girl();

const cry = (who) => console.log(who, 'cry');
const eat = (who) => console.log(who, 'eat');

girl.once('message', cry);
girl.once('message', eat);

// girl.off('message', cry);
girl.emit('message', 'Lily')


