var tasks = document.querySelectorAll('.task-list'),
  priorities = document.querySelectorAll('.priority-content'),
  restart = document.querySelector('.restart'),
  start = document.querySelector('.start'),
  dragItem = null;

start.addEventListener('click', function (e) {
  e.preventDefault();
  
  if (start.innerText === 'START') {
    start.innerText = 'Stop';
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].setAttribute('draggable', true);
    }
    actionAdd(tasks, 'dragstart', dragStart);
    actionAdd(tasks, 'dragend', dragEnd);
    actionAdd(priorities, 'dragover', dragOver);
    actionAdd(priorities, 'drop', drop);
  } else {
    start.innerText = 'Start';
    for (var i = 0; i < tasks.length; i++) {
      tasks[i].removeAttribute('draggable');
    }
    actionRemove(priorities, 'dragover', dragOver);
    actionRemove(priorities, 'drop', drop);
  }

  restart.addEventListener('click', function (e) {
    e.preventDefault();

    location.reload();
  });
});

function actionAdd(element, action, name) {
  for (var i = 0; i < element.length; i++) {
    element[i].addEventListener(action, name);
  }
}

function actionRemove(element, action, name) {
  for (var i = 0; i < element.length; i++) {
    element[i].removeEventListener(action, name);
  }
}

function dragStart() {
  dragItem = this;
}

function dragEnd() {
  dragItem = null;
}

function dragOver(e) {
  e.preventDefault();
}

function drop() {
  this.append(dragItem);
}