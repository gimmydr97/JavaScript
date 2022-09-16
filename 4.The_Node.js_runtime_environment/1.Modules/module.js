 /**
 * Represents an Operation.
 * @constructor
 * @param {number} x - The first element of operation.
 * @param {number} y - The second element of operation.
 * Return the sum of the operation.
 * @sum
 * 
 */
 
 module.exports = class Operation{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    sum(){ return this.x+this.y;}
}