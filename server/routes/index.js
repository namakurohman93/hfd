const router = require('express').Router();
const UserController = require('../controllers/user-controller');
const todoRouter = require('./todo-router');
const userRouter = require('./user-router');
const {authenticate} = require('../middlewares/auth');

router.get('/', function(req, res, next) {
  res.json({message: 'server is alive'});
});
router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use(authenticate);
router.use('/users', userRouter);
router.use('/todos', todoRouter);

module.exports = router;
