const router = require('express').Router();
const TodoController = require('../controllers/todo-controller');
const {authorize} = require('../middlewares/auth');

router.post('/', TodoController.createTodo);

router.use('/:todoId', authorize);
router.get('/:todoId', TodoController.getTodoDetail);
router.patch('/:todoId', TodoController.updateTodo);
router.delete('/:todoId', TodoController.deleteTodo);

module.exports = router;
