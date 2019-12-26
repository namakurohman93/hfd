function nothingTodoTemplate() {
  return `
  <div class="row d-flex justify-content-center text-center">
    <div class="col-lg-8">
      <img src="assets/nothing-to-do-grayscale.jpg" style="opacity: 0.3;" />
      <h2 style="opacity: 0.3;">Nothing to do</h2>
    </div>
  </div>
  `;
}

function todoCardTemplate(todo) {
  let badges =
    todo.status === 'done'
      ? `<small><span class="badge badge-pill badge-success">done</span></small>`
      : todo.status === 'overdue'
      ? `<small><span class="badge badge-pill badge-danger">overdue</span></small>`
      : '';

  let template = `
  <div class="custom-border py-2 px-3 mb-4 todo-card">
    <div id="custom-h3">
      <h3 class="text-capitalize">${todo.name}</h3>
      <h5>${badges}</h5>
    </div>
    <hr style="border-color: inherit; margin-top: 0.7rem;" />
    <p>${todo.description}</p>
    <p><small class="text-muted">${moment(
      new Date(todo.dueDate),
    ).calendar()}</small></p>
    <button class="btn btn-danger btn-sm" style="border-radius: 0;" onclick="deleteTodo(event, '${
      todo._id
    }')">
      <span class="far fa-trash-alt"></span>
    </button>`;

  if (todo.dueDate < new Date() || todo.status === 'done') {
    template += '</div>';
  } else {
    template += `
      <button class="btn btn-success btn-sm" style="border-radius: 0;" onclick="updateTodoDone(event, '${todo._id}')">
        <span class="fas fa-check"></span>
      </button>
    </div>`;
  }

  return template;
}

function errorTemplate() {
  return `
  <div class="container-lg px-auto text-center">
    <img src="assets/error-face-icon.gif" style="width: 15rem; height: 15rem" />
    <h6 class="pt-3" style="opacity: 0.5;">An error has occured, please refresh the page</h6>
  </div>
  `;
}

function loadingTemplate() {
  return `
  <div class="row d-flex justify-content-center text-center">
    <div class="col-lg-4">
      <img src="assets/loading.gif" />
      <h4 style="opacity: 0.5;">Fetch your todo...</h4>
    </div>
  </div>
  `;
}
