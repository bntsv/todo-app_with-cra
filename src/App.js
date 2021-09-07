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
  render() {
    return (
      <div className="page">
        <Header />
        <main className="todoApp">
          <AddTodo />
          <TodoList />
          <TodosCount />
        </main>
      </div>
    );
  }
}

export default App;
