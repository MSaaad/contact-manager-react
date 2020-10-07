import React from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import MaskedInput from 'react-text-mask'
import { Consumer } from '../../context'
import { theme } from '../../Styles/Theme'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import {Grid,Paper,Button,Typography,TextField,FormControl,InputLabel,Input,ListItemIcon,FormHelperText} from '@material-ui/core'

const styles = theme => ({
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '40px'
  },
  paper: {
      padding: theme.spacing.unit * 2.5,
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


class EditContact extends React.Component {

    state = {
        name: '',
        email: '',
        phone: '(   )    -    ',
    }

    async componentDidMount() {

        const { id } = this.props.match.params;
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

            const contact = res.data;

            this.setState({
                name: contact.name,
                email: contact.email,
                phone: contact.phone
            });

        } catch (e) {

            this.setState({
                name: 'Error',
                email: 'Error',
                phone: '(   )    -    '
            });
        }
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleSubmit = async (dispatch, event) => {
        event.preventDefault();
        const { name, email, phone } = this.state
        const { id } = this.props.match.params
        const updatedContact = {
            name,
            email,
            phone
        }
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact)
        dispatch({type: 'UPDATE_CONTACT', payload: res.data})

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
                                                color="primary"
                                                variant="headline"
                                                component="h3"
                                                >Edit Contact
                                            </Typography>
                                            <ListItemIcon>
                                                <BorderColorIcon style = {{color: '#1DE9B6', marginLeft: '10px'}} />
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
                                                helperText="Enter the contact name"
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
                                                helperText="Enter the contact email"
                                                value={email}
                                                margin="normal"
                                                style = {{width: 'calc(50% - 15px)', marginRight: '30px'}}
                                                />
                                            <FormControl
                                                name="phone"
                                                margin="normal"
                                                style = {{width: 'calc(50% - 15px)', verticalAlign: 'top'}}>
                                              <InputLabel htmlFor="formatted-text-mask-input">Phone</InputLabel>
                                              <Input
                                                value={phone}
                                                onChange={this.handleChange('phone')}
                                                inputComponent={TextMaskCustom}
                                                />
                                            <FormHelperText>Enter the contact phone</FormHelperText>
                                            </FormControl>
                                            <Button
                                                type="submit"
                                                disabled = {false}
                                                variant="flat"
                                                size="large"
                                                color="primary"
                                                fullWidth = {true}
                                                className = {classes.submit}>
                                                Update Contact
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

export default withStyles(styles)(EditContact);
