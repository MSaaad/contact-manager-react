import React from 'react'
import Contact from './Contact'
import { Consumer } from '../../context'
import { Typography, CircularProgress } from '@material-ui/core';

class Contacts extends React.Component {
    render () {
        let contactList = value => (
                !value.loading ?
                <React.Fragment>
                        <Typography
                            variant="display1"
                            align="center"
                            style = {{textTransform: 'uppercase', marginTop: '40px'}}>
                            <span style = {{color: '#FF7043', marginRight: '12px'}}>
                                Contact
                            </span>
                                List
                        </Typography>
                    {value.contacts.map(contact => {
                        return (
                            <Contact
                                marginTop = { contact === value.contacts[0] ? {marginTop: '30px'} : null }
                                key = {contact.id}
                                contact = {contact}
                                />
                        )
                    })}
                </React.Fragment>
                :
                <CircularProgress
                    color="secondary"
                    thickness = {7}
                    size = {160}
                    style = {{
                        display: 'block',
                        margin: '150px auto',
                        color: '#c85f66'
                    }}/>
                )
        return <Consumer>{contactList}</Consumer>
    }
}

export default Contacts;
