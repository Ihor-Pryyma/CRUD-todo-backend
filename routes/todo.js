var express = require('express');
var router = express.Router();

const knex = require('../db/knex');
/* GET home page. */
router.get('/', function(req, res, next) {
  knex('todo')
    .select()
    .then(todos => {
      res.render('all', { todos: todos });
    });
});

module.exports = router;
