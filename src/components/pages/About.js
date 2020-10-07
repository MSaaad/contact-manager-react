import React from 'react'
import { theme } from '../../Styles/Theme'
import { Paper, Grid, Typography, List, ListItem, ListItemText, Avatar } from '@material-ui/core'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles'

const styles = theme => ({
    gridContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
    },
    paper: {
        padding: theme.spacing.unit * 12.5,
    }
})

const About =  (props) => {

    const { classes } = props;

    return (
        <MuiThemeProvider theme={theme}>
            <Grid
                container
                spacing={100}
                className = {classes.gridContainer}>
                <Grid item xs={10} sm={7} md={6} lg={5} xl={5}>
                    <Paper className = {classes.paper}>
                        <Typography align="center" variant="title">
                            ABOUT THE APP
                        </Typography>
                        <Typography align="center" variant="subheading" color="textSecondary" style = {{marginTop: 10}}>
                            A React.js App made with material ui theme without the backend server. :)
                        </Typography>
                        <Typography align="center" variant='title' style = {{marginTop: 10}}>
                            If you want to know more about me, follow here :)
                        </Typography>
                        <Grid
                            container
                            spacing={50}
                            style = {{marginTop: 10, padding: '0 80px'}}>
                            <Grid item xs>
                                <List>
                                    <ListItem
                                        button
                                        onClick = {() => window.open('https://github.com/MSaaad')}>
                                        <Avatar style = {{backgroundColor: '#4078c0'}}>G</Avatar>
                                        <ListItemText secondary="GitHub" align="center" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        onClick = {() => window.open('https://instagram.com/msaaaaad_')}>
                                        <Avatar style = {{backgroundColor: '#fb3958'}}>IG</Avatar>
                                        <ListItemText secondary="Instgram" align="center" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        onClick = {() => window.open('https://www.facebook.com/msaaaaad')}>
                                        <Avatar style = {{backgroundColor: '#3b5998'}}>FB</Avatar>
                                        <ListItemText secondary="Facebook" align="center" />
                                    </ListItem>
                                    <ListItem
                                        button
                                        onClick = {() => window.open('https://www.linkedin.com/in/muhammad-saad-4791ab1b3/')}>
                                        <Avatar style = {{backgroundColor: '#0e76a8'}}>L</Avatar>
                                        <ListItemText  secondary="Linkedin" align="center" />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    )
}

export default withStyles(styles)(About)
