'use strict';

const pgp = require('pg-promise')({
  capSQL: true,
  /* Uncomment to se all queries ran in console
   query(e) {
    console.log(e.query);
  }, */
});

module.exports = pgp;
