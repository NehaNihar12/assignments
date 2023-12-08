/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todoList = [];
  }
  // adds todo to list of todos
  add(todo) {
    this.todoList.push(todo);
  }
  // remove todo from list of todos
  remove(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todoList.length) {
      this.todoList.splice(indexOfTodo, 1);
    }
  }
  // update todo at given index
  update(index, updatedTodo) {
    if (index >= 0 && index < this.todoList.length) {
      this.todoList.splice(index, 1, updatedTodo);
    }
  }
  // returns all todos
  getAll() {
    return this.todoList;
  }
  // returns todo at given index
  get(indexOfTodo) {
    if (indexOfTodo >= 0 && indexOfTodo < this.todoList.length) {
      return this.todoList[indexOfTodo];
    }else{
      return null;
    }
  }
  //deletes all todos
  clear() {
    this.todoList = [];
  }
}

const todo = new Todo();
todo.add('Task 1');
todo.add('Task 2');
todo.add('Task 3');
todo.remove(1)
console.log(todo.getAll())

module.exports = Todo;
