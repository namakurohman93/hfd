const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
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
  status: {
    type: String,
    num: ['pending', 'overdue', 'done'],
    default() {
      return new Date(this.dueDate) < new Date() ? 'overdue' : 'pending';
    },
  },
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;
