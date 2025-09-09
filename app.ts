type Task = { id: number; title: string; done: boolean };
const form = document.getElementById('form') as HTMLFormElement;
const title = document.getElementById('title') as HTMLInputElement;
const list = document.getElementById('list') as HTMLUListElement;

let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

function render() {
  list.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = t.done;
    cb.onchange = () => { t.done = cb.checked; save(); };
    const span = document.createElement('span'); span.textContent = t.title;
    const del = document.createElement('button'); del.textContent = 'Delete';
    del.onclick = () => { tasks = tasks.filter(x => x.id !== t.id); save(); };
    li.append(cb, span, del); list.appendChild(li);
  });
}

function save() { localStorage.setItem('tasks', JSON.stringify(tasks)); render(); }

form.onsubmit = e => {
  e.preventDefault();
  tasks.push({ id: Date.now(), title: title.value.trim(), done: false });
  title.value = ''; save();
};

render();
