import React from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../../Styles/Theme'
import {Paper,Grid,Button,List,ListItem,ListItemIcon,ListItemText,Tooltip,Zoom,Hidden,LinearProgress} from '@material-ui/core'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'
import { Phone, Drafts, Clear, ExpandLess, PlaylistAdd } from '@material-ui/icons'
import { Consumer } from '../../context'
import axios from 'axios'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
      justifyContent: 'center'
  },
  paper1: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: '#c85f66',
  },
  paper2: {
    marginTop: '20px',
    backgroundColor: '#c85f66',
    overflow: 'hidden',
  },
  contact: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 70px) repeat(2, minmax(60px, 1fr)) minmax(55px, 85px)',
      gridTemplateRows: 'auto',
      marginTop: 10
  },
  
  title: {
    color: theme.palette.text.secondary,
    padding: theme.spacing.unit * 2,
    gridColumn: '1/4',
},
  clear: {
      gridColumn: '5/6',
      cursor: 'pointer',
      alignSelf: 'start',
      width: '50px',
      padding: theme.spacing.unit / 2,
  },
  edit: {
      gridColumn: '6 / 7',
      cursor: 'pointer',
      alignSelf: 'start',
      width: '50px',
      padding: theme.spacing.unit / 2,
  },
  button: {
      gridColumn: '2 / 6',
      alignSelf: 'end',
      height: '50px',
  },
  list: {
      listStyle: 'none',
      textAlign: 'left',
  },
  extendedIcon: {
      fontSize: '20px',
      transition: 'all .2s ease',
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  }
});

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showContactInfo: false,
            loading: false
        }
    }
    onShowCLick = () => {
        this.setState(prevState => ({
            showContactInfo: !prevState.showContactInfo
        }));
    }

    onDeleteClick = async (id, dispatch) => {

        this.setState({
            loading: true
        });

        try {

            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            dispatch({type: 'DELETE_CONTACT', payload: id})

        } catch (e) {

            dispatch({type: 'DELETE_CONTACT', payload: id})
        }

        this.setState({
            loading: false
        });
    }
    render () {
        const { classes, contact, marginTop } = this.props;
        const { showContactInfo, loading } = this.state;

        let navigationIcon = !showContactInfo ?
        {transform: 'rotate(180deg)', marginRight: theme.spacing.unit / 1.8}
        :
        {transform: 'rotate(360deg)', marginRight: theme.spacing.unit * 1.08}

        let contactInfo;

        if (showContactInfo) {
            contactInfo =
                <Paper className = {classes.paper2}>
                    <List component="nav" className = {classes.list}>
                          <ListItem>
                              <Hidden xsDown>
                                <ListItemIcon>
                                  <Drafts />
                                </ListItemIcon>
                              </Hidden>
                            <ListItemText primary={`Email: ${contact.email}`} />
                          </ListItem>
                          {contact.phone !== undefined && contact.phone !== '(   )    -    ' ?
                              <ListItem>
                                  <Hidden xsDown>
                                    <ListItemIcon>
                                      <Phone />
                                    </ListItemIcon>
                                   </Hidden>
                                <ListItemText primary={`Phone: ${contact.phone}`} />
                              </ListItem>
                              :
                              null
                          }
                      </List>
                </Paper>
        } else {
            contactInfo = null;
        }

        return (

            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <MuiThemeProvider theme={theme}>
                            <div className = {classes.root}>
                                <Grid
                                    container
                                    spacing={24}
                                    className = {classes.gridContainer}
                                    style = {marginTop}
                                    > <Grid item xs={11} sm={7} md={6} lg={4} xl={4}>
                                          <Paper className = {classes.paper1}>
                                              {loading ? <LinearProgress color="secondary" style = {{marginTop: '-5px'}}/> : null}
                                              <div className = {classes.contact}>
                                                  <Tooltip
                                                      classes = {{tooltip: classes.lightTooltip}}
                                                      title="Delete ?"
                                                      placement="bottom-end"
                                                      TransitionComponent={Zoom}
                                                      TransitionProps={{ timeout: 400 }}
                                                      enterDelay={200}>
                                                      <Button
                                                          variant="outlined"
                                                          size="small"
                                                          color="primary"
                                                          className = {classes.clear}
                                                          onClick = {this.onDeleteClick.bind(this, contact.id, dispatch)}>
                                                          <Clear
                                                              fontSize="small"
                                                              color="secondary"
                                                              />
                                                      </Button>
                                                   </Tooltip>
                                                   <Tooltip
                                                       classes = {{tooltip: classes.lightTooltip}}
                                                       title="Edit ?"
                                                       placement="bottom-end"
                                                       TransitionComponent={Zoom}
                                                       TransitionProps={{ timeout: 400 }}
                                                       enterDelay={200}>
                                                       <Button
                                                           variant="outlined"
                                                           size="small"
                                                           color="primary"
                                                           className = {classes.edit}
                                                           component = {Link}
                                                           to = {`contact/edit/${contact.id}`}>
                                                           <PlaylistAdd
                                                               fontSize="small"
                                                               color="secondary"
                                                               />
                                                       </Button>
                                                    </Tooltip>
                                                  <h2 className = {classes.title}>{contact.name}</h2>
                                                  <Button
                                                      onClick = {this.onShowCLick}
                                                      color="primary"
                                                      variant="outlined"
                                                      size="small"
                                                      className = {classes.button}>
                                                      <ExpandLess
                                                          fontSize="small"
                                                          className = {classes.extendedIcon}
                                                          color="secondary"
                                                          style = {navigationIcon}
                                                          />
                                                      {!showContactInfo ? 'Show' : 'Hide'}
                                                  </Button>
                                              </div>
                                              {contactInfo}
                                          </Paper>
                                     </Grid>
                                </Grid>
                            </div>
                        </MuiThemeProvider>
                    )}}
            </Consumer>
        )
    }
}

export default withStyles(styles)(Contact);
