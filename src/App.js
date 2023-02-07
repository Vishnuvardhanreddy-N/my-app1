import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
      editing: false,
      currentid: "",
      currentValue: "",
    };
  }
  onChange = (e) => {
    this.setState({ value: e.target.value });
  };
  onAddTask = (e) => {
    e.preventDefault();

    const obj = {
      name: this.state.value,
      id: Date.now(),
    };
    if (this.state.value !== "") {
      this.setState({ todos: this.state.todos.concat(obj) });
      this.setState({ value: "" });
    }
  };

  onDeleteTask = (itemId) => {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id !== itemId),
    });
  };

  onEditTodo = (id, newValue) => {
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
      return todo.name;
    });
  };

  onSubmitEditTodo = (e) => {
    e.preventDefault();

    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
  };

  onToggleEdit = (todo) => {
    this.setState({ editing: true });
    this.setState({ currentid: todo.id });
    this.setState({ currentValue: todo.name });
  };

  onEditInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  render() {
    const mylist = this.state.todos.map((todo) => (
      <li className="todo_item">
        <div className="container"><input type="checkbox" className="check"/>
        <p>{todo.name}</p></div>
        <button className="Button" onClick={() => this.onToggleEdit(todo)}>Edit</button>
        <button className="Button" onClick={() => this.onDeleteTask(todo.id)}>Remove</button>
      </li>
    ));

    return (
      <>
        <div className="App">
        <h1 class="todos-heading">Todos</h1>
                    <h1 class="create-task-heading">
                        Create <span class="create-task-heading-subpart">Task</span>
                    </h1>
                    <div className="filters btn-group stack-exception">
        
          {this.state.editing === false ? (
            <form onSubmit={this.onAddTask}>
              <input
                placeholder="typeyour task"
                value={this.state.value}
                onChange={this.onChange}
                className = "todo-user-input"
              />
              <button className="Button" onClick={this.onAddTask}>Add Item</button>
            </form>
          ) : (
            <form onSubmit={this.onSubmitEditTodo}>
              <input
                placeholder="edit your task"
                value={this.state.currentValue}
                name={this.state.currentValue}
                onChange={this.onEditInputChange}
                className = "todo-user-input"
              />
              <button className="Button" onClick={this.onSubmitEditTodo}>Update Item</button>
            </form>
          )}
          <button type="button" className="btn toggle-btn" aria-pressed="true">
          <span className="visually-hidden">Show </span>
          <span>all</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Active</span>
          <span className="visually-hidden"> tasks</span>
        </button>
        <button type="button" className="btn toggle-btn" aria-pressed="false">
          <span className="visually-hidden">Show </span>
          <span>Completed</span>
          <span className="visually-hidden"> tasks</span>
        </button>
      </div>
          <ul className="todo_wrapper">{mylist}</ul>
        </div>
      </>
    );
  }
}

export default App;
