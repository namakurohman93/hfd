const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;
