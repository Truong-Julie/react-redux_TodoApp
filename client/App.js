import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';



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