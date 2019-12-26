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
      switchUserSideButton(document.getElementById('all-todo-list').parentNode);

      updateState(data);
      updateAllBadges();
      // on init state, show all todos

      const template = getTodoListTemplate(localStorage.getItem('view'));
      template
        ? updateTodoList(template)
        : updateTodoList(nothingTodoTemplate());
    })
    .catch(error => {
      updateTodoList(errorTemplate());
      error.response ? console.log(error.response) : console.log(error);
    });
}

function addNewTodo(e) {
  if (e) e.preventDefault();

  showSwalLoading('Add new todo...');

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

      const template = getTodoListTemplate(localStorage.getItem('view'));
      template
        ? updateTodoList(template)
        : updateTodoList(nothingTodoTemplate());
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
      showSwalLoading('Deleting...');

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

          const template = getTodoListTemplate(localStorage.getItem('view'));
          template
            ? updateTodoList(template)
            : updateTodoList(nothingTodoTemplate());
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

  showSwalLoading('Updating todo...');

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

          const template = getTodoListTemplate(localStorage.getItem('view'));
          template
            ? updateTodoList(template)
            : updateTodoList(nothingTodoTemplate());
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

function getTodos(e, key) {
  if (e) e.preventDefault();

  localStorage.setItem('view', key);
  switchUserSideButton(document.getElementById(viewState[key]).parentNode);

  showTodoList();
  updateTodoList(loadingTemplate());

  const template = getTodoListTemplate(key);
  template ? updateTodoList(template) : updateTodoList(nothingTodoTemplate());
}

function getTodoListTemplate(key) {
  let template = ``;

  if (state[key].length > 0) {
    state[key].forEach(todo => {
      template += todoCardTemplate(todo);
    });
  }

  return template;
}
