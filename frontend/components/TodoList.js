import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
          {this.props.todos.reduce((acc, td) => {
            if (this.props.displayCompleteds || !td.completed) return acc.concat(
              <Todo 
                toggleCompleted={this.props.toggleCompleted}
                todo={td}
                key={td.id}
              />
            )
            return acc
          },[])}          
        </div>
    )
  }
}
