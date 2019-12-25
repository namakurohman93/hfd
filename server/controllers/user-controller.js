const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static login(req, res, next) {
    const errors = [];

    if (!req.body.email) errors.push('Email is required');
    if (!req.body.password) errors.push('Password is required');

    if (errors.length > 0) {
      return next({name: 'BadRequest', message: errors});
    }

    User.findOne({email: req.body.email})
      .then(user => {
        if (!user) {
          throw {name: 'BadRequest', message: 'Email is not registered'};
        }
        if (!bcryptjs.compareSync(req.body.password, user.password)) {
          throw {name: 'BadRequest', message: 'Email or password is wrong'};
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        // console.log(typeof user._id);
        // console.log(typeof user.id);

        res.json({token, username: user.username});
      })
      .catch(next);
  }

  static register(req, res, next) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        // console.log(typeof user._id);
        // console.log(typeof user.id);

        res.status(201).json({token, username: user.username});
      })
      .catch(next);
  }

  static getAllUsers(req, res, next) {
    User.find()
      .select('username email')
      .then(users => {
        res.json(users);
      })
      .catch(next);
  }

  static getUserDetail(req, res, next) {
    User.findById(req.params.userId)
      .select('username email')
      .then(user => {
        if (!user) throw {name: 'NotFound', message: 'User not found'};
        res.json(user);
      })
      .catch(next);
  }
}

module.exports = UserController;
