function fetchOwnTodo() {
  return new Promise((resolve, reject) => {
    ai.get('/users/todos', {
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then(resolve)
      .catch(reject);
  });
}

function emptyState() {
  Object.keys(state).forEach(key => {
    state[key] = [];
  });
}

function updateState(data) {
  emptyState();

  const now = new Date();

  data = data.map(todo => {
    todo.dueDate = new Date(todo.dueDate);
    return todo;
  });

  data.sort((a, b) => a.dueDate > b.dueDate);

  data.forEach(todo => {
    switch (true) {
      case todo.status === 'done':
        state.doneTodoList.push(todo);
        break;

      case todo.status === 'overdue' || todo.dueDate < new Date():
        state.overdueTodoList.push(todo);
        break;

      case todo.dueDate.getDate() - now.getDate() === 0 &&
        todo.status === 'pending':
        // same day
        state.todayTodoList.push(todo);
        break;

      case todo.dueDate.getDate() - now.getDate() === 1 &&
        todo.status === 'pending':
        // for tomorrow
        state.tomorrowTodoList.push(todo);
        break;

      default:
        state.furtherTodoList.push(todo);
        break;
    }
  });

  state.todoList = data;
}
