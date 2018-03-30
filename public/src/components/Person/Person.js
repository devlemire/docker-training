import React, { Component } from 'react'

export default class Person extends Component {
   render() {
      const { data } = this.props
      return (
         <div>
            <h4>Name: {data.name}</h4>
            <span>Age: {data.age}</span>
            <br />
            <br />
            <button onClick={() => this.props.deletePerson(data.id)}>Delete</button>
         </div>
      )
   }
}
