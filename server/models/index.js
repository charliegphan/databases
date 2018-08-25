var db = require('../db').dbConnection;

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT * FROM messages', function(error, results, fields) {
        if (error) {
          throw error;
        } else {
          cb(error, results);
        }
      });

    }, // a function which produces all the messages
    post: function () {
      db.query('INSERT INTO messages SET ?', {}, function(error, results, field) {
        if (error) {
          throw error;
        } else {
          console.log(results.id);
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

