const dateInWeek = document.querySelector("#dateInWeek"),
  dateInMonth = document.querySelector("#dateInMonth"),
  month = document.querySelector("#month"),
  todoContainer = document.querySelector('.todo-container'),
  today = new Date(),
  addButton = document.querySelector('#create')

const checkboxHandler = (description) => {
    const todoItems = JSON.parse(localStorage.getItem('todo-list')) || [];
    const findIndex = todoItems.findIndex(el => el.description === description);
    const item = {description, isDone: !todoItems[findIndex].isDone};
    todoItems.splice(findIndex, 1, item);
    localStorage.setItem('todo-list', JSON.stringify(todoItems));
}  

const createItemNode = ({description, isDone}) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isDone;
    checkbox.addEventListener('click', () => checkboxHandler(description));
    const text = document.createElement('p');
    text.textContent = description;
    todoItem.append(checkbox,text);
    return todoItem;
} 

const renderItems = () => {
    const todoItems = JSON.parse(localStorage.getItem('todo-list')) || [];
    console.log(todoItems);
    todoItems && todoItems.map(item => todoContainer.appendChild(createItemNode(item)))
}

window.onload = () => {
    renderItems();   
}

const addNewItem = (description) => {
    const todoItems = JSON.parse(localStorage.getItem('todo-list')) || [];
    todoItems.push({description, isDone: false});
    localStorage.setItem('todo-list', JSON.stringify(todoItems));
    const node = createItemNode({description, isDone: false});
    todoContainer.appendChild(node);
}

const checkExisted = (description) => {
    const todoItems = JSON.parse(localStorage.getItem('todo-list')) || [];
    return todoItems.findIndex(el => el.description === description);
}



const dateInMonthGen = (date) => {
    if(date === 1) {
        return date + 'st';
    }
    if(date === 2) {    
        return date + 'nd';
    }
    if(date === 3) {
        return date + 'rd';
    }
    return date + 'th';
}

dateInWeek.textContent = new Intl.DateTimeFormat('en-US', {weekday: "long"}).format(today.getDay()) + ',';
dateInMonth.textContent = dateInMonthGen(today.getDate());
month.textContent = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today.getMonth());

const createNewItem = () => {
    let description = prompt('Enter the description of item', "");
    if(description.length === 0) {
        alert('Description cannot empty string, please try again!');
        return;
    }
    if(checkExisted(description) > -1) {
        alert('Item already existed');
        return;
    }
    addNewItem(description);
}

addButton.addEventListener('click', createNewItem)

