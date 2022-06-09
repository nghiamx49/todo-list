const dateInWeek = document.querySelector("#dateInWeek"),
  dateInMonth = document.querySelector("#dateInMonth"),
  month = document.querySelector("#month"),
  todoContainer = document.querySelector('.todo-container'),
  today = new Date(),
  addButton = document.querySelector('#create');

//handle checkbox checked stage change
const checkboxHandler = (description) => {
    const todoItems = getDataFromLocalStograge();
    const findIndex = todoItems.findIndex(el => el.description === description);
    const item = {description, isDone: !todoItems[findIndex].isDone};
    todoItems.splice(findIndex, 1, item);
    setDataToLocalStorage(todoItems)
}  

//create an item
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

//get item from local storage and render to UI
const renderItems = () => {
    const todoItems = getDataFromLocalStograge();
    todoItems && todoItems.map(item => todoContainer.appendChild(createItemNode(item)))
}

window.onload = () => {
    renderItems();   
}

//add new todo item
const addNewItem = (description) => {
    const todoItems = getDataFromLocalStograge();
    todoItems.push({description, isDone: false});
    setDataToLocalStorage(todoItems);
    const node = createItemNode({description, isDone: false});
    todoContainer.appendChild(node);
}

//check if the item already existed or not
const checkExisted = (description) => {
    const todoItems = getDataFromLocalStograge();
    return todoItems.findIndex(el => el.description === description);
}


const dateInMonthGen = (date) => {
    let returnDate;
    if(date === 1) {
        returnDate = date + 'st';
    }
    if(date === 2) {    
        returnDate = date + 'nd';
    }
    if(date === 3) {
        returnDate = date + 'rd';
    }
    else {
        returnDate = date + 'th';
    }
    return returnDate;
}

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

dateInWeek.textContent = new Intl.DateTimeFormat('en-US', {weekday: "long"}).format(today.getDay()) + ',';
dateInMonth.textContent = dateInMonthGen(today.getDate());
month.textContent = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(today.getMonth());

