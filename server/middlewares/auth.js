const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Todo = require('../models/todo');

module.exports = {
  authenticate: function(req, res, next) {
    if (!req.headers.token) {
      return next({name: 'BadRequest', message: 'Token is missing'});
    }

    try {
      const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET);
      User.findById(payload.id)
        .then(user => {
          if (!user) throw {name: 'BadRequest', message: 'Bad token'};
          req.payload = payload;
          next();
        })
        .catch(next);
    } catch (err) {
      if (err instanceof SyntaxError) {
        err = {name: 'BadRequest', message: 'Very very bad token'};
      }
      next(err);
    }
  },
  authorize: function(req, res, next) {
    Todo.findById(req.params.todoId)
      .then(todo => {
        if (!todo) throw {name: 'NotFound', message: 'Todo not found'};
        if (todo.owner != req.payload.id) {
          throw {name: 'Unauthorize', message: 'You are not authorized'};
        }
        next();
      })
      .catch(next);
  },
};
