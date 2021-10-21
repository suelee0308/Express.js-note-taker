// Immediately export a function that generates a string of random numbers and letters

const ShortUniqueId = require("short-unique-id")

// from the npm package short-unique-id
module.exports = () =>
  const uid = new ShortUniqueId ({ length: 6 });
  uid()