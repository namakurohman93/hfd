$(document).ready(function() {
  toggleSection();
  $('#datetimepicker').datepicker();
  $('#timepicker1')
    .timepicker({
      maxHours: 24,
      minuteStep: 1,
      defaultTime: '',
      showMeridian: false,
      icons: {
        up: 'fas fa-sort-up',
        down: 'fas fa-caret-down',
      },
    })
    .on('changeTime.timepicker', function(e) {
      $('#input-timepicker').val(e.time.value);
    });
});

function initState() {
  updateTodoList(loadingTemplate());

  fetchOwnTodo()
    .then(({data}) => {
      updateState(data);
      updateAllBadges();
      // on init state, show all todos
      if (state.todoList.length === 0) {
        updateTodoList(nothingTodoTemplate());
      } else {
        let template = ``;
        state.todoList.forEach(todo => {
          template += todoCardTemplate(todo);
        });
        updateTodoList(template);
      }
    })
    .catch(error => {
      updateTodoList(errorTemplate());
      error.response ? console.log(error.response) : console.log(error);
    });
}

function addNewTodo(e) {
  if (e) e.preventDefault();

  const todoName = $('#todo-name').val();
  const todoDescription = $('#todo-description').val();
  const todoDate = $('#todo-date').val();
  const todoTime = $('#input-timepicker').val();

  ai.post(
    '/todos',
    {
      name: todoName,
      description: todoDescription,
      dueDate: new Date(`${todoDate} ${todoTime}`),
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({data}) => {
      Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      }).fire({
        icon: 'success',
        title: 'New todo added',
      });
      emptyNewTodoForm();
      updateTodoList(loadingTemplate());
      showTodoList();
      return fetchOwnTodo();
    })
    .then(({data}) => {
      updateState(data);
      updateAllBadges();
      if (state.todoList.length === 0) {
        updateTodoList(nothingTodoTemplate());
      } else {
        let template = ``;
        state.todoList.forEach(todo => {
          template += todoCardTemplate(todo);
        });
        updateTodoList(template);
      }
    })
    .catch(error => {
      updateTodoList(errorTemplate());
      error.response ? console.log(error.response) : console.log(error);
    });
}

function deleteTodo(e, todoId) {
  if (e) e.preventDefault();

  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.value) {
      Swal.fire({
        title: 'Loading...',
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      ai.delete(`/todos/${todoId}`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(({data}) => {
          Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
          }).fire({
            icon: 'success',
            title: 'Todo deleted',
          });
          updateTodoList(loadingTemplate());
          return fetchOwnTodo();
        })
        .then(({data}) => {
          updateState(data);
          updateAllBadges();
          if (state.todoList.length === 0) {
            updateTodoList(nothingTodoTemplate());
          } else {
            let template = ``;
            state.todoList.forEach(todo => {
              template += todoCardTemplate(todo);
            });
            updateTodoList(template);
          }
        })
        .catch(error => {
          updateTodoList(errorTemplate());
          error.response ? console.log(error.response) : console.log(error);
        })
        .finally(() => {
          Swal.close();
        });
    }
  });
}

function updateTodoDone(e, todoId) {
  if (e) e.preventDefault();

  ai.patch(
    `/todos/${todoId}`,
    {
      status: 'done',
    },
    {
      headers: {
        token: localStorage.getItem('token'),
      },
    },
  )
    .then(({data}) => {
      Swal.mixin({
        toast: true,
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
      }).fire({
        icon: 'success',
        title: 'Todo updated',
      });

      updateTodoList(loadingTemplate());
      fetchOwnTodo()
        .then(({data}) => {
          updateState(data);
          updateAllBadges();
          if (state.todoList.length === 0) {
            updateTodoList(nothingTodoTemplate());
          } else {
            let template = ``;
            state.todoList.forEach(todo => {
              template += todoCardTemplate(todo);
            });
            updateTodoList(template);
          }
        })
        .catch(error => {
          updateTodoList(errorTemplate());
          error.response ? console.log(error.response) : console.log(error);
        });
    })
    .catch(error => {
      updateTodoList(errorTemplate());
      error.response ? console.log(error.response) : console.log(error);
    });
}
