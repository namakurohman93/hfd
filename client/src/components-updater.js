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

function switchUserSideButton(e) {
  let result = [];
  // let node = e.target.parentNode.firstChild;
  let node = document.getElementsByClassName('list-group-flush')[0].firstChild;

  // console.log(node);
  // console.log(node1[0].firstChild);

  while (node) {
    if (
      node !== this &&
      node.nodeType === Node.ELEMENT_NODE &&
      (node.id === '' ||
        node.id === 'custom-overdue-btn' ||
        node.id === 'custom-done-btn')
    )
      result.push(node);
    node = node.nextElementSibling || node.nextSibling;
  }

  result.forEach(node => {
    $(node).removeClass('active');
    $(node).removeClass('active-custom-overdue-btn');
    $(node).removeClass('active-custom-done-btn');
  });

  // if ($(e.target).attr('id') === 'custom-overdue-btn') {
  // $(e.target).addClass('active-custom-overdue-btn');
  // } else if ($(e.target).attr('id') === 'custom-done-btn') {
  // $(e.target).addClass('active-custom-done-btn');
  // } else {
  // $(e.target).addClass('active');
  // }

  if ($(e).attr('id') === 'custom-overdue-btn') {
    $(e).addClass('active-custom-overdue-btn');
  } else if ($(e).attr('id') === 'custom-done-btn') {
    $(e).addClass('active-custom-done-btn');
  } else {
    $(e).addClass('active');
  }
}
