import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
          {this.props.todos.reduce((acc, td) => {
            if (this.props.displayCompleteds || !td.completed) return acc.concat(
              <div onClick={this.props.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✔️' : ''}</div>
            )
            return acc
          },[])}          
        </div>
    )
  }
}
