var db = require('../db').dbConnection;

var convertToReadable = function(arr) {
  return arr.map((mySqlObj => {
    return {
      username: mySqlObj.username,
      text: mySqlObj.tweet,
      roomname: mySqlObj.roomname,
      objectId: mySqlObj.id
    };
  }));
};

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT * FROM messages', function(error, results, fields) {
        if (error) {
          throw error;
        } else {
          var newResults = convertToReadable(results);
          cb(error, {results: newResults});
        }
      });

    }, // a function which produces all the messages
    post: function (data, cb) {
      var q1 = `SELECT id FROM users WHERE username = '${data.username}'`;
      var id = new Promise((resolve, reject) => {
        db.query(q1, function(error, results) {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      }).then((id) => {
        var q = `INSERT INTO messages 
                (userId, tweet, roomname)
                VALUES  
                ('${id[0].id}', '${data.message}', '${data.roomname}')`;

        db.query(q, function(error, results, field) {
          if (error) {
            throw error;
          } else {
            cb(error, results);
          }
        });
      });

    } // a function which can be used to insert a message into the database
  },
  users: {
    // Ditto as above.
    get: function () {
    },

    post: function (data, cb) {
      var q = `INSERT IGNORE INTO users 
                (username)
                VALUES 
                ('${data.username}')`;
      db.query(q, function(error, results, field) {
        if (error) {
          throw error;
        } else {
          cb(error, results);
        }
      });
    }
  }
};



