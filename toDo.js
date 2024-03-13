const toDoList = JSON.parse(localStorage.getItem("todos")) || [];
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const listEl = document.querySelector("#tasks");

function remakeTask(){
    for (const todo of toDoList){
        addTask(todo.task)
    }
}

function removeTask(taskEl, taskDeleteEl, task) {
    taskDeleteEl.addEventListener("click", () => {
        listEl.removeChild(taskEl);
        const index = toDoList.findIndex(item => item.task === task);
        if (index > -1) {
            toDoList.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(toDoList));
        }
    });
}

function addTask(task) {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const taskContentEl = document.createElement("div");
    taskContentEl.classList.add("content");

    taskEl.appendChild(taskContentEl);

    const taskInputEl = document.createElement("input");
    taskInputEl.classList.add("text");
    taskInputEl.type = "text";
    taskInputEl.value = task;
    taskInputEl.setAttribute("readonly", "readonly");

    taskContentEl.appendChild(taskInputEl);

    const taskActionsEl = document.createElement("div");
    taskActionsEl.classList.add("actions");

    const taskEditEl = document.createElement("button");
    taskEditEl.classList.add("edit");
    taskEditEl.innerText = "edit";

    const taskDeleteEl = document.createElement("button");
    taskDeleteEl.classList.add("delete");
    taskDeleteEl.innerText = "delete";

    taskActionsEl.appendChild(taskEditEl);
    taskActionsEl.appendChild(taskDeleteEl);

    taskEl.appendChild(taskActionsEl);

    listEl.appendChild(taskEl);

    input.value = "";

    removeTask(taskEl, taskDeleteEl, task);
    editTask(taskEditEl, taskInputEl)
}

function editTask(taskEditEl, taskInputEl){
    let index = null
    taskEditEl.addEventListener("click", () => {
        if  (taskEditEl.innerText.toLowerCase() == "edit") {
            const taskValue = taskInputEl.value;
            index = toDoList.findIndex(item => item.task === taskValue);
            taskInputEl.removeAttribute("readonly");
            taskInputEl.focus();
            taskEditEl.innerText = "save";
        } else {
            taskInputEl.setAttribute("readonly", "readonly");
            taskEditEl.innerText = "edit";
            toDoList[index].task = taskInputEl.value;
            localStorage.setItem("todos", JSON.stringify(toDoList));

        }
    });

}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    if (!task) {
        alert("please fill out the task");
        return;
    }

    const taskObj = {
        task: task,
    };

    toDoList.push(taskObj);

    localStorage.setItem("todos", JSON.stringify(toDoList));

    addTask(task)
  
});

remakeTask();