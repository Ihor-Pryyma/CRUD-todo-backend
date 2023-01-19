const express = require('express');
const router = express.Router();

const queries = require('../db/queries');
/* GET home page. */


function validTodo(todo) {
  return typeof todo.title === 'string' && 
                todo.title.trim() !== '' && 
                typeof todo.priority !== 'undefined' && 
                !isNaN(Number(todo.priority));
}

function setStatusRenderError(res, statusCode, message) {
  res.status(statusCode);
  res.render('error', {
    message
  });
}

function respondAndRenderTodo(id, res, viewName) {
  if(!isNaN(id)) {
    queries
      .getOne(id)
      .then(todo => {
        res.render(viewName, todo);
      });
  } else {
    setStatusRenderError(res, 500, "Invalid ID");
  }
}

function validateTodoInsertUpdateRedirect(req, res, callback) {
  if(validTodo(req.body)) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority
    };
    callback(todo);
  } else {
    setStatusRenderError(res, 500, "Invalid Todo");
  }
}

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/', (req, res) => {
  queries
    .getAll()
    .then(todos => {
      res.render('all', { todos: todos });
    });
});

router.post('/', (req, res) => {
  validateTodoInsertUpdateRedirect(req, res, (todo) => {
    todo.date = new Date();
    queries
      .create(todo)
      .then(ids => {
        const { id } = ids[0];
        res.redirect(`/todo/${id}`);
      }); 
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'single');
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'edit');
});

router.put('/:id', (req, res) => {
  validateTodoInsertUpdateRedirect(req, res, (todo) => {
    queries
      .update(todo, req.params.id)
      .then(() => {
        res.redirect(`/todo/${req.params.id}`);
      });
  });
});

router.delete('/:id', (req, res) => {
  if(typeof req.params.id !== 'undefined') {
    queries
      .delete(req.params.id)
      .then(()=> {
        res.redirect('/todo');
      });
  } else {
    setStatusRenderError(res, 500, "Invalid ID");
  }
});

module.exports = router;
