const conn = require('./conn');
const Guitar = require('./Guitar');
const seed = require('./seed');

module.exports = {
  conn,
  seed,
  models: {
    Guitar
  },
};
