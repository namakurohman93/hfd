function checkSession() {
  /*
   * return true if on local storage there is username
   * false otherwise
   */
  return localStorage.getItem('username') ? true : false;
}

function login(e) {
  if (e) e.preventDefault();

  const email = $('#loginEmail').val();
  const password = $('#loginPassword').val();

  showSwalLoading('Login...');

  ai.post('/login', {email, password})
    .then(({data}) => {
      Swal.fire({
        icon: 'success',
        title: 'Success login',
        showConfirmButton: false,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('view', 'todoList');

      emptyLoginForm();

      toggleSection();
    })
    .catch(error => {
      $('#loginPassword').val('');
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.errors.join(),
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Check console log',
          showConfirmButton: false,
        });
        console.log(error);
      }
    })
    .finally(() => {
      setTimeout(function() {
        Swal.close();
      }, 1500);
    });
}

function register(e) {
  if (e) e.preventDefault();

  const email = $('#registerEmail').val();
  const password = $('#registerPassword').val();
  const username = $('#registerUsername').val();

  showSwalLoading('Registering...');

  ai.post('/register', {email, password, username})
    .then(({data}) => {
      Swal.fire({
        icon: 'success',
        title: 'Success register',
        showConfirmButton: false,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('view', 'todoList');

      emptyRegisterForm();

      toggleSection();
    })
    .catch(error => {
      $('#registerPassword').val('');
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.errors.join(),
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Check console log',
          showConfirmButton: false,
        });
        console.log(error);
      }
    })
    .finally(() => {
      setTimeout(function() {
        Swal.close();
      }, 1500);
    });
}

function logout(e) {
  if (e) e.preventDefault();

  localStorage.clear();

  Swal.fire({
    icon: 'success',
    title: 'Logged out',
    timer: 1500,
    showConfirmButton: false,
  });

  toggleSection();
}
