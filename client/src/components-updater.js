function updateUsername() {
  $('#username').text(localStorage.getItem('username'));
}

function updateAllTodoListBadges(value) {
  $('#all-todo-list').text(value);
}

function updateTodayTodoListBadges(value) {
  $('#today-todo-list').text(value);
}

function updateTomorrowTodoListBadges(value) {
  $('#tomorrow-todo-list').text(value);
}

function updateOverdueTodoListBadges(value) {
  $('#overdue-todo-list').text(value);
}

function updateDoneTodoListBadges(value) {
  $('#done-todo-list').text(value);
}

function updateFurtherTodoListBadges(value) {
  $('#further-todo-list').text(value);
}

function updateAllBadges() {
  updateAllTodoListBadges(state.todoList.length);
  updateTodayTodoListBadges(state.todayTodoList.length);
  updateTomorrowTodoListBadges(state.tomorrowTodoList.length);
  updateOverdueTodoListBadges(state.overdueTodoList.length);
  updateDoneTodoListBadges(state.doneTodoList.length);
  updateFurtherTodoListBadges(state.furtherTodoList.length);
}

function emptyLoginForm() {
  $('#loginEmail').val('');
  $('#loginPassword').val('');
}

function emptyRegisterForm() {
  $('#registerEmail').val('');
  $('#registerPassword').val('');
  $('#registerUsername').val('');
}

function emptyNewTodoForm() {
  $('#todo-name').val('');
  $('#todo-description').val('');
  $('#todo-date').val('');
  $('#input-timepicker').val('');
}

function updateTodoList(template) {
  $('#todo-list').empty();
  $('#todo-list').append(template);
}
