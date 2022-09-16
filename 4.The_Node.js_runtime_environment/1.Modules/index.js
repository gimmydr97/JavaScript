const module1 = require('./module');
const args = process.argv;

const op = new module1(parseInt(args[2]),parseInt(args[3]));
console.log(op.sum());