const getDataFromLocalStograge = () => {
    return JSON.parse(localStorage.getItem('todo-list')) || [];
}

const setDataToLocalStorage = (data) => {
    localStorage.setItem('todo-list', JSON.stringify(data));
}