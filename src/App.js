import React from 'react';
import Header from './components/Header';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import TodosCount from './components/TodosCount';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Header/>
//       <AddTodo/>
//       <TodoList/>
//       <TodosCount/>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props)

    const currentSessionStorage = window.sessionStorage.getItem("todos");
    this.state = {
      todos: JSON.parse(currentSessionStorage) || [],
      pendingTodo: {
        title: ""
      }
    }

  }

  componentDidMount() {

    fetch(`${this.props.apiRoot}/todos`)
      .then(res => res.json())
      .then(data => {
        this.setState(() => {
          return { todos: [...data] }
        })
      })
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    window.sessionStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  handleChange = (e) => {

    const newTodoTitle = e.target.value;

    const currentLastTodoID = this.state.todos[(this.state.todos.length) - 1].id;
    const newTodo = {
      id: currentLastTodoID + 1,
      title: newTodoTitle,
      completed: false
    };

    this.setState((state) => {
      return { pendingTodo: newTodo }
    });

  }

  addTodo = (e) => {
    e.preventDefault();
    let pendingTodo = this.state.pendingTodo;

    if (this.state.pendingTodo.title !== "") {

      // //change local state:
      // this.setState((state) => {
      //   return { todos: [...state.todos, pendingTodo], pendingTodo: { title: "" } }
      // });

      //change server(db) state:
      fetch(`${this.props.apiRoot}/todos`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pendingTodo)
      })
        .then((response) => response.json())
        .then(() => {
          //change local state:
          this.setState((state) => {
            return { todos: [...state.todos, pendingTodo], pendingTodo: { title: "" } }
          });

        })
        .catch(err => console.error(err))
    }

  }

  removeTodo = (index) => {

    let todoID = this.state.todos[index].id;
    //change server(db) state:
    fetch(`${this.props.apiRoot}/todos/${todoID}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 200) {

          //change local state:
          const newState = this.state.todos.filter(todo => {
            return (this.state.todos.indexOf(todo) !== index)
          });

          this.setState({
            todos: newState
          });
        }
      })
      .catch(err => console.error(err))
  }

  toggleCompleted = (index) => {

    const newState = this.state.todos.map((todo, i) => {
      if (i === index) {
        todo.completed = !todo.completed;
      }
      return todo
    })

    const todoID = this.state.todos[index].id;
    const changedTodo = newState[index];

    //change server(db) state:
    fetch(`${this.props.apiRoot}/todos/${todoID}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changedTodo)
    })
      .then((response) => {
        if (response.status === 200) {

          //change local state:
          this.setState({
            todos: newState
          })
        }
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <div className="page">
        <Header />
        <main className="todoApp">
          <AddTodo
            todosArr={this.state.todos}
            pendingTodo={this.state.pendingTodo}
            newTodo={this.handleChange}
            addTodo={this.addTodo} />
          <TodoList
            todosArr={this.state.todos}
            removeTodo={this.removeTodo}
            toggleCompleted={this.toggleCompleted} />
          <TodosCount todosLength={this.state.todos.length} />
        </main>
      </div>
    );
  }
}

export default App;
