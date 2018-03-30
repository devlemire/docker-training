import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import config from '../config'
import Person from './Person/Person'
import CreatePerson from './CreatePerson/CreatePerson'

class App extends Component {
   constructor() {
      super()
      this.state = {
         people: []
      }

      this.createPerson = this.createPerson.bind(this)
      this.deletePerson = this.deletePerson.bind(this)
   }

   componentDidMount() {
      axios
         .get(`${config.routes.people}`)
         .then(results => {
            this.setState({ people: results.data })
         })
         .catch(err => {
            console.error('API failed at fetching people:', err)
         })
   }

   createPerson(name, age) {
      axios
         .post(`${config.routes.people}`, { name, age })
         .then(results => {
            this.setState({ people: [...this.state.people, results.data] })
         })
         .catch(err => console.error('API failed at creating a new person:', err))
   }

   deletePerson(id) {
      axios.delete(`${config.routes.people}?id=${id}`).then(() => {
         const index = this.state.people.findIndex(person => person.id === id)
         const peopleCopy = [...this.state.people]
         peopleCopy.splice(index, 1)
         this.setState({ people: peopleCopy })
      })
   }

   render() {
      const people = this.state.people.map(person => <Person key={person.id} data={person} deletePerson={this.deletePerson} />)
      return (
         <div className="App">
            <CreatePerson createPerson={this.createPerson} />
            {people}
         </div>
      )
   }
}

export default App
