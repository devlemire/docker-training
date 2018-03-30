import React, { Component } from 'react'

export default class CreatePerson extends Component {
   constructor() {
      super()
      this.state = {
         name: '',
         age: ''
      }

      this.createPerson = this.createPerson.bind(this)
   }

   createPerson() {
      const { name, age } = this.state

      this.props.createPerson(name, parseInt(age, 10))

      this.setState({ name: '', age: '' })
   }

   render() {
      return (
         <div>
            <input placeholder="name" onChange={e => this.setState({ name: e.target.value })} value={this.state.name} />
            <input placeholder="age" type="number" onChange={e => this.setState({ age: e.target.value })} value={this.state.age} />
            <button onClick={this.createPerson}>Create Person</button>
         </div>
      )
   }
}
