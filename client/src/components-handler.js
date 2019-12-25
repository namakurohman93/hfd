// for toggling
function toggleSection() {
  if (checkSession()) {
    $('#not-login-section').fadeOut(100, function() {
      $('#login-section').fadeIn(100);
    });
    updateUsername();
  } else {
    $('#login-section').fadeOut(100, function() {
      $('#not-login-section').fadeIn(100);
    });
  }
}

// for showing only
function showLoginForm(e) {
  if (e) e.preventDefault();

  $('#landing-page').fadeOut(100, function() {
    $('#register-form').fadeOut(100, function() {
      $('#login-form').fadeIn(100);
    });
  });
}

function showRegisterForm(e) {
  if (e) e.preventDefault();

  $('#landing-page').fadeOut(100, function() {
    $('#login-form').fadeOut(100, function() {
      $('#register-form').fadeIn(100);
    });
  });
}

function showLandingPage(e) {
  if (e) e.preventDefault();

  $('#register-form').fadeOut(100, function() {
    $('#login-form').fadeOut(100, function() {
      $('#landing-page').fadeIn(100);
    });
  });
}

function showNewTodoForm(e) {
  if (e) e.preventDefault();

  $('#todo-list').fadeOut(100, function() {
    $('#new-todo-form').fadeIn(100);
  });
}

function showTodoList(e) {
  if (e) e.preventDefault();

  $('#new-todo-form').fadeOut(100, function() {
    $('#todo-list').fadeIn(100);
  });
}
