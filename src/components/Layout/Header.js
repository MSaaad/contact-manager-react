import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import { HomeSharp, AddCircle, InfoSharp } from '@material-ui/icons'

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: '2px',
  },
  grow: {
    flexGrow: 10,
  },
  buttonList: {
      display: 'flex',
      listStyle: 'none',
  },
  buttonListItem: {
      marginRight: '20px',
  }
};
const header = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar
              color="primary"
              position="static" style = {{marginTop: 3, padding: 10, background:'#c85f66'}}>
                <Toolbar variant="dense">
                  <Typography
                      variant="title"
                      color="inherit"
                      className={classes.grow}
                      >{props.branding}
                  </Typography>
                  <Button
                      component={Link}
                      to="/"
                      color="inherit"
                      >Home
                      <HomeSharp style={{fontSize: 20, marginLeft: 10, padding : 5}} />
                  </Button>
                  <Button
                      component={Link}
                      to="/contact/add"
                      color="inherit"
                      >Add Contacts
                      <AddCircle style={{ fontSize: 20, marginLeft: 10, padding : 5}} />
                  </Button>
                  <Button
                      component={Link}
                      to="/about"
                      color="inherit"
                      >About App
                      <InfoSharp style={{ fontSize: 20, marginLeft: 10, padding : 5 }} />
                  </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
header.defaultProps = {
    branding: 'My Contact Manager App'
}
header.propTypes = {
    branding: PropTypes.string.isRequired
}

export default withStyles(styles)(header)
