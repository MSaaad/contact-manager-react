import React from 'react'
import axios from 'axios'
import MaskedInput from 'react-text-mask'
import { Consumer } from '../../context'
import { theme } from '../../Styles/Theme'
import LibraryAddSharpIcon from '@material-ui/icons/LibraryAddSharp';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import {Grid,Paper,Button,Typography,TextField,FormControl,Input,ListItemIcon,FormHelperText} from '@material-ui/core'

const styles = theme => ({
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '40px'
  },
  paper: {
      padding: theme.spacing.unit * 13,
  },
  formHeadline: {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase'
  },
  submit: {
      marginTop: '25px'
  }
});

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
      />
  );
}
class AddContact extends React.Component {
    state = {
        name: '',
        email: '',
        phone: '(    )    -    ',
    }
    handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    };
    handleSubmit = async (dispatch, event) => {
        event.preventDefault();
        const newContact = {
            ...this.state,
            id: ([this.state.name] + '-' + (Math.random() * 10).toFixed(5).split('.').join('')).split(' ').join('')
        }
        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
            dispatch({type: 'ADD_CONTACT', payload: res.data})
        this.setState({
            name: '',
            email: '',
            phone: '(   )    -    ',
        });
        this.props.history.push('/');
    }
    render () {
        let { classes } = this.props;
        let { name, email, phone } = this.state;
        return (
            <Consumer>
                {value => {
                    return (
                        <MuiThemeProvider theme={theme}>
                            <Grid
                                container
                                spacing={24}
                                className = {classes.gridContainer}>
                                <Grid item xs={10} sm={7} md={6} lg={5} xl={5}>
                                    <Paper className = {classes.paper}>
                                        <div className = {classes.formHeadline}>
                                            <Typography
                                                variant="headline"
                                                component="h2" style = {{color:'#c85f66', fontWeight: 500}}
                                                >Add Contact Details
                                            </Typography>
                                            <ListItemIcon>
                                                <LibraryAddSharpIcon style = {{marginLeft: '10px', fontSize: 30, color: '#c85f66'}} />
                                            </ListItemIcon>
                                        </div>
                                        <form
                                            onSubmit = {this.handleSubmit.bind(this, value.dispatch)}
                                            autoComplete="off">
                                            <TextField
                                                name="name"
                                                type="text"
                                                autoFocus
                                                onChange={this.handleChange('name')}
                                                required
                                                label="Name"
                                                helperText="Enter the contact name here"
                                                value={name}
                                                margin="normal"
                                                style = {{width: 'calc(75% - 15px)', marginRight: '30px'}}
                                                />
                                            <TextField
                                                name="email"
                                                type="email"
                                                onChange={this.handleChange('email')}
                                                required
                                                label="Email"
                                                helperText="Enter the email address"
                                                value={email}
                                                margin="normal"
                                                style = {{width: 'calc(50% - 15px)', marginRight: '30px'}}
                                                />
                                            <FormControl
                                                name="phone"
                                                margin="normal"
                                                style = {{width: 'calc(50% - 15px)', verticalAlign: 'top'}}>
                                              <Input
                                                value={phone}
                                                onChange={this.handleChange('phone')}
                                                inputComponent={TextMaskCustom}
                                                />
                                            <FormHelperText>Enter the phone number here</FormHelperText>
                                            </FormControl>
                                            <Button
                                                type="submit"
                                                disabled = {false}
                                                variant="flat"
                                                size="large"
                                                style = {{color:'#c85f66', fontWeight: 500}}
                                                fullWidth = {true}
                                                className = {classes.submit}>
                                                SUBMIT
                                            </Button>
                                        </form>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </MuiThemeProvider>
                    )
                }}
            </Consumer>
        )
    }
}

export default  withStyles(styles)(AddContact);
