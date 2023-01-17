const express = require('express');
const router = express.Router();

const knex = require('../db/knex');
/* GET home page. */
router.get('/', (req, res) => {
  knex('todo')
    .select()
    .then(todos => {
      res.render('all', { todos: todos });
    });
});

router.get('/new', (req, res) => {
  res.render('new');
});

module.exports = router;
