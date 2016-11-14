import {createStore} from 'redux';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import {combineReducers} from 'redux';
/* 
todo format:
  {
    id: action.id,
    text: action.text,
    completed: false
  }
*/


      //   if (todo.id === action.id) {
      //     return {
      //       ...todo, 
      //       completed: !todo.completed
      //     };
      //   }
      //   return todo;
      // });

// Example of how to use Object.assign
// return Object.assign({}, state, {completed: !state.completed});



const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state; 
  }
} 

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, 
        todo(undefined, action) 
      ];
    case 'TOGGLE_TODO':
      return state.map(t => {
        return todo(t, action);
      });
    default: 
      return state;
  }
};


const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);
  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

// const toggleTodo = (state, action) => {
//   switch (action.type) {
//     case 'TOGGLE_TODO':
//       state.map(todo => {
//         if (todo.id === action.id) {
//           return [ ...state, todo
//           ];
//         }
//       })
//     default:
//       return state;
//   }
// }; 

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Start DIY hours',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Start DIY hours',
      completed: true
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action))
    .toEqual(stateAfter);
};

const setVisibilityFilter = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default: 
      return state;
  }
}


const todoApp = combineReducers({
  todos,
  setVisibilityFilter
})

testAddTodo();
testToggleTodo();
console.log('All tests passed');


/************** Increment Counter Example ****************/
/* 
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counter);
*/
const store = createStore(todoApp);

export default store;
