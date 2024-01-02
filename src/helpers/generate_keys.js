const crypto = require("crypto");

const key1 = crypto.randomBytes(32).toString('hex')  // for 256 bits key
const key2 = crypto.randomBytes(32).toString('hex')  // for 256 bits key

console.table({ key1, key2 })