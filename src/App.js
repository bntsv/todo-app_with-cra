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
  constructor(){
    super()
    const currentSessionStorage = window.sessionStorage.getItem("todos");
    this.state = {
      todos: JSON.parse(currentSessionStorage) || [
        {
            id: 1,
            title: "Todo1",
            completed: false
        },
        {
            id: 2,
            title: "Todo2",
            completed: false
        },
        {
            id: 3,
            title: "Todo3",
            completed: false
        }
      ],
      pendingTodo: {
        title: ""
      }
    }

  }
  
  componentDidUpdate(prevProps,prevState){
    window.sessionStorage.setItem("todos",JSON.stringify(this.state.todos));
  }

  handleChange = (e) => {

    const newTodoTitle = e.target.value;
    const newTodoID = this.state.todos[(this.state.todos.length)-1].id;
    const newTodo = {
        id: newTodoID+1,
        title: newTodoTitle,
        completed: false
    };

    this.setState((state) => {
      return { pendingTodo: newTodo }
    });
    
  }

  addTodo = (e) => {
    e.preventDefault();

    this.setState((state) => {
      return { todos: [...state.todos, state.pendingTodo], pendingTodo: {title: ""} }
    });
  }

  removeTodo = (index) => {

    const newState = this.state.todos.filter(todo => {
      return (this.state.todos.indexOf(todo) !== index)
    });

    this.setState({ 
      todos: newState
    });
  }

  toggleCompleted = (index) => {
    
    const newState = this.state.todos.map((todo,i)=> {
      if(i==index){
        todo.completed = !todo.completed;
      } 
      return todo
    })

    
    this.setState({ 
      todos: newState
    })

    console.log("toggle changed");
  }

  render() {
    return (
      <div className="page">
        <Header />
        <main className="todoApp">
          <AddTodo 
          todosArr = {this.state.todos}
          pendingTodo = {this.state.pendingTodo} 
          newTodo = {this.handleChange} 
          addTodo = {this.addTodo}/>
          <TodoList 
          todosArr = {this.state.todos} 
          removeTodo = {this.removeTodo} 
          toggleCompleted = {this.toggleCompleted}/>
          <TodosCount todosLength = {this.state.todos.length}/>
        </main>
      </div>
    );
  }
}

export default App;
