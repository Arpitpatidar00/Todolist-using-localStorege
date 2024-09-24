import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [data, setData] = useState("");
  const [category, setCategorya] = useState("");
  const [todoList, setTodoList] = useState([]);

  // Retrieve stored todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  // Store todoList in local storage whenever it changes
  const updateLocalStorage = (newTodos) => {
    setTodoList(newTodos);
    localStorage.setItem("todoList", JSON.stringify(newTodos));
  };

  const textAdd = (e) => {
    setData(e.target.value);
  };

  const categoryAdd = (e) => {
    setCategorya(e.target.value);
  };

  const submit = (e) => {
    if (data && category) {
      const newTodos = [...todoList, { todo: data, category: category }];
      updateLocalStorage(newTodos);
    }
    setData("");
    setCategorya("");
    e.preventDefault();
  };

  const deleteTodo = (index) => {
    const updatedTodos = todoList.filter((_, i) => i !== index);
    updateLocalStorage(updatedTodos);
  };

  const Edit = (index) => {
    const updatedTodo = prompt("Please enter your updated todo:");

    if (updatedTodo) {
      const updatedTodos = todoList.map((item, i) =>
        i === index ? { ...item, todo: updatedTodo } : item
      );
      updateLocalStorage(updatedTodos);
    }
  };

  return (
    <div className="App">
      <div className="container">
      <h1>TODO USING LOCALSTORAGE</h1>
        <div id="input" className="input-group flex-nowrap">
          <input
            onChange={categoryAdd}
            value={category}
            type="text"
            className="form-control"
            placeholder="Enter category here..."
            aria-label="Category"
          />
          <input
            onChange={textAdd}
            value={data}
            type="text"
            className="form-control"
            placeholder="Enter todo here..."
            aria-label="Todo"
          />
          <button
            id="submit"
            onClick={submit}
            type="button"
            className="btn btn-primary"
          >
            Add Todo
          </button>
        </div>

        <div className="list-group">
          <a
            href="/"
            id="textfield"
            className="list-group-item list-group-item-action active"
            aria-current="true"
          >
            Todo List
          </a>

          {todoList.map((item, index) => (
            <div key={index} className="list-group-item list-group-item-action">
              <strong>Category:</strong> {item.category} <br />
              <strong>Todo:</strong> {item.todo}
              <button className="btn btn-primary mx-2" onClick={() => Edit(index)}>
                Edit
              </button>
              <button
                onClick={() => deleteTodo(index)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
