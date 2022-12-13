import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{
      this.setState({ ...this.state, todos: res.data.data});
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message});
    })
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          {this.state.todos.map(td => {
            return <div key={td.id}>{td.name}</div>
          })}
      </div>
      </div>
      
    )
  }
}
