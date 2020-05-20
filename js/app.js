window.addEventListener('load', start);

// global array to save tasks
var globalTasks = ['Study', 'Buy Grocery'];
// temp variable to save task
var inputTask = null;
var currentIndex = null;
var isEditing = false;

function start() {
  // get input
  inputTask = document.getElementById('task');
  // when load app.js call preventFormSubmit function
  preventFormSubmit();
  // when load app.js call activeInput function
  activateInput();
  // when load app.js render function
  render();
}

function preventFormSubmit() {
  // prevent refreash page when press enter
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  // when press enter submit call function handleFormSubmit
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  // take the typed string when save to globalTasks
  function insertTask(newTask) {
    globalTasks.push(newTask);
  }
  function updateTask(editableTask) {
    globalTasks[currentIndex] = editableTask;
  }
  // when press enter take what was typed
  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '';

    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key === 'Enter') {
      updateTask(event.target.value);
      if (isEditing) {
      } else {
        insertTask(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  // when press enter call handleTyping fuction
  inputTask.addEventListener('keyup', handleTyping);
  // when the page is refreshed the user don't need to click on input
  inputTask.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteTask() {
      globalTasks.splice(index, 1);
      render();
    }
    // create button
    var button = document.createElement('button');
    // set a class to button
    button.classList.add('delete-btn');
    // set button content to x
    button.textContent = 'x';
    // when click on a button
    button.addEventListener('click', deleteTask);

    return button;
  }

  function createSpan(currentTask, index) {
    function editItem() {
      inputTask.value = currentTask;
      inputTask.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    // set span content equals editableTask
    span.classList.add('clickable');
    span.textContent = currentTask;

    span.addEventListener('click', editItem);

    return span;
  }

  var div = document.getElementById('showTasks');
  div.innerHTML = '';
  //make a ul
  var ul = document.createElement('ul');

  // make a bunch of li, the same length of the globalTasks
  for (var i = 0; i < globalTasks.length; i++) {
    var currentTask = globalTasks[i];
    // create the li
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    // create span
    var span = createSpan(currentTask, i);
    // connecting li to button and span
    li.appendChild(button);
    li.appendChild(span);
    // conecting li with ul
    ul.appendChild(li);
  }

  // connecting ul with div
  div.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputTask.value = '';
  inputTask.focus();
}
