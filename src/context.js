import React from 'react'
import axios from 'axios'
//import { data } from './db.json'
const Context = React.createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
        case 'ADD_CONTACT':
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? (contact = action.payload) : contact)
            };
        default:
            return state;
    }
}
export class Provider extends React.Component {
    state = {
        contacts: [],
        loading: true,
        dispatch: action => this.setState(state => reducer(state, action))
    }
    async componentDidMount() {
     //   const res = await axios.get(data)
       const res = await axios.get('https://jsonplaceholder.typicode.com/users') // fetching from fake json server rest api
  //   const res = await axios.get('https://my-json-server.typicode.com/animeshroydev/SampleJSONPlaceholder/contacts')
        this.setState({
            contacts: res.data,
            loading: false
        });
    }
    render() {
        return (
             <Context.Provider value = {this.state}>
                 {this.props.children}
             </Context.Provider>
        )
    }
}
export const Consumer = Context.Consumer;
