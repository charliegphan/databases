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
      var q = `select messages.tweet, messages.roomname, users.username
              from
              messages
              join users
              on
              messages.userId = users.id;`;
      // SELECT * FROM messages
      // 
      db.query(q, function(error, results, fields) {
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
      console.log(data.username);
      var id = new Promise((resolve, reject) => {
        db.query(q1, function(error, results) {
          if (error) {
            reject(error);
          }
          resolve(results);
        });
      }).then((id) => {
        data.tweet = data.message ? data.message : data.text;
        var q = `INSERT INTO messages 
                (userId, tweet, roomname)
                VALUES  
                ('${id[0].id}', '${data.tweet}', '${data.roomname}')`;

        db.query(q, function(error, results, field) {
          if (error) {
            throw error;
          } else {
            cb(error, results);
          }
        });
      }).catch((error) => {
        console.log(error);
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



