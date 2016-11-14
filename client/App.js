import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';

const FilterLink = ({filter, currentFilter, children}) => {
  if (currentFilter === filter) {
    return <span>{children}</span>
  }
  return (
    <a href="#"
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }}
    > 
      {children}
    </a>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
    default: 
      return todos;
  }
};

let nextTodoId = 0;
class TodoApp extends React.Component {
  render () {
    const { todos, setVisibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, setVisibilityFilter);
    return (
      <div>
        <input ref={node => { this.node = node; }
        } />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.node.value,
            id: nextTodoId++
          });
          this.node.value = '';
        }} > 
          Add Todo 
        </button>
        <ul>
          {visibleTodos.map(todo => {
            return <li 
              key={todo.id} 
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                });
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none' 
              }}>{todo.text}</li>
          })}
        </ul>
        <p>
          Show: {' '}
          <FilterLink filter='SHOW_ALL' currentFilter={setVisibilityFilter}>All</FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE' currentFilter={setVisibilityFilter}>Active</FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED' currentFilter={setVisibilityFilter}>Completed</FilterLink>
        </p>
      </div>
    );
  }
}


/*        <ul>
          {this.props.todos.map(todo => {
            <li key={todo.id}>{todo.text}</li>
          })}
        </ul>
        */
const render = () => {
  console.log(store.getState(), 'state');
  return ReactDOM.render(<TodoApp {...store.getState()}/>, document.getElementById('app')); 
};


store.dispatch({
  type: 'ADD_TODO',
  text: 'Test',
  id: nextTodoId++
});

store.subscribe(render);
render();

console.log(store.getState(), 'state');


/************ INCREMENT COUNTER EXAMPLE ***************/
/* 
class Component extends React.Component {
  constructor (props) {
    super(props);
    var {value, onIncrement, onDecrement} = props;
    console.log(value);
  }
  render () {
    return (
      <div>
        <h1>{this.props.value}</h1>
        <button onClick={
          this.props.onIncrement
        }>+</button>
        <button onClick={
          this.props.onDecrement
        }>-</button>
      </div>
    );  
  }
}

class App extends React.Component {
  render () {
    return (
      <div>
        <Component value={store.getState()}
          onIncrement={
            ()=> {store.dispatch({type : 'INCREMENT'})}
          }
          onDecrement={
            ()=> {store.dispatch({type : 'DECREMENT'})}
          }
        />
      </div>
    );
  }
}

const render = () => { ReactDOM.render(<App />, document.getElementById('app'));
};

store.subscribe(render);
render();


// App.propTypes = {
//   txt: React.PropTypes.string,
//   cat: React.PropTypes.number.isRequired
// };

// App.defaultProps = {
//   txt: 'this is the now default txt'
// };

export default App;
*/