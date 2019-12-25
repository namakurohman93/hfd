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
