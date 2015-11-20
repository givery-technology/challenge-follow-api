var express = require('express');
var app = express();
 
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./sql/followChallenge.db"
    }
});

app.listen(9000, function() {
    console.log("Server listening at port: 9000");
});

//middleware to populate req.body.
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Testing database
/*knex.table('followers').then(function(rows) {
    console.log(rows);
});*/

app.post('/api/followers', upload.array(), function (req, res, next) {
  var data = req.body;
  var usersPresent;

  knex('users')
  .count('id as cnt')
  .whereIn('id', [data.userId, data.followId])
  .then (function (c) {
    usersPresent = c[0].cnt;
    if(usersPresent != 2) {
      res.status(400).send({
        "code": 400,
        "result": false
      });     
      return next(); 
    }
    else {
      return knex('followers')
      .insert([{ follower_id: data.followId, user_id: data.userId }])
      .then( function () {
        res.status(200).send({
          "code": 200,
          "result": true
        });
      }).catch(function (err) {
        res.status(400).send({
          "code": 400,
          "result": false
        });    
      });
      return next();
    }
  });
});

app.delete('/api/followers', upload.array(), function (req, res, next) {
  var data = req.body;
  var usersPresent;

  knex('followers')
  .count('id as cnt')
  .where('user_id', data.userId)
  .andWhere('follower_id', data.followId)
  .then (function (c) {
    usersPresent = c[0].cnt;
    if(usersPresent === 1) {
      return knex('followers')
      .where('user_id', data.userId)
      .andWhere('follower_id', data.followId)
      .del()
      .then (function () {
          res.status(200).send({
            "code": 200,
            "result": true
          });        
      });
      return next();
    }
    else {
      res.status(400).send({
        "code": 400,
        "result": false 
      });  
      return next();
    }
  });
});

app.get('/api/followers/:userId', function (req, res, next) {
  var userId = req.query.userId;
  var count, userPresent;

  knex('users').count('id as cnt').where('id', userId).then(function (c) {
    userPresent = c[0].cnt;
    if(userPresent === 0 ){
      res.status(400).send({
        "code": 400,
        "result": false
      });
      return next();
    }
    else {
      return knex('followers')
      .count('id as cnt')
      .where('user_Id', userId).then(function (c) {
        count = c[0].cnt;
        return knex.select('name', 'id')
              .from('users')
              .whereIn('id', function () {
                this.select('follower_id').from('followers').where('user_id', userId)
              }).then(function (followers) {
                res.status(200).send({
                  "code": 200,
                  "result": true,
                  "count": count,
                  "users": followers
                });
              });
      });
      return next();
    }
  });
});
