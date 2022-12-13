import React from 'react';
import axios from 'axios';
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleteds: true
  }
  
  onTodoNameInputChange = e => {
    const {value} = e.target
    this.setState({ ...this.state, todoNameInput: value})
  }

  resetForm = () => {
    this.setState({...this.state, todoNameInput: ''})
  }

  setAxiosResponseError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message});
  }

  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }

  onTodoFormSubmit = e => {
    e.preventDefault();
    this.postNewTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res =>{
      this.setState({ ...this.state, todos: res.data.data});
    })
    .catch(this.setAxiosResponseError)
  }

  toggleDisplayCompleteds = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ 
        ...this.state, todos: this.state.todos.map(td => {
          if (td.id !== id) return td
          return res.data.data
        })
      })
    })
    .catch(this.setAxiosResponseError)

  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          {this.state.todos.reduce((acc, td) => {
            if (this.state.displayCompleteds || !td.completed) return acc.concat(
              <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✔️' : ''}</div>
            )
            return acc
          },[])}
            {/* return  */}
          
        </div>
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange} 
          toggleDisplayCompleteds={this.toggleDisplayCompleteds} 
          displayCompleteds={this.state.displayCompleteds}
          todoNameInput={this.state.todoNameInput}
        />
      </div>
    )
  }
}
