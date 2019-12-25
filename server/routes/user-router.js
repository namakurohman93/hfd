const router = require('express').Router();
const UserController = require('../controllers/user-controller');
const TodoController = require('../controllers/todo-controller');

router.get('/', UserController.getAllUsers);
router.get('/todos', TodoController.getAllTodos);
router.get('/:userId', UserController.getUserDetail);

module.exports = router;
