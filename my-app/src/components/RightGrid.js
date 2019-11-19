/* global fetch */
import React from 'react'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { Fade } from '@material-ui/core'

// makeStyles(
const useStyles = theme => ({
  root: {
    height: '100vh'
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center'
  },
  flexColScroll: {
    flexGrow: '1',
    overflow: 'auto',
    minHeight: '100%'
  },
  backButton: {
    padding: '3px'
  },
  hidden: {
    visibility: 'hidden',
    padding: '3px'
  }
})

function Copyright () {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://www.elysiantrio.com/'>
          Elysian Trio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

class RightGrid extends React.Component {
  render () {
    const { classes } = this.props
    console.log('isMenuPageLoaded ', this.props.isMenuPageLoaded)
    return (
      <Fade in timeout={1000}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.flexColScroll}>
          <div className={classes.paper}>
            {/* <Button style={{ float: 'left', width: '20px' }}>test</Button> */}
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='flex-start'
            >
              <Grid>
                <Fade in={this.props.isMenuPageLoaded}>
                  <Button
                    onClick={() => {
                      fetch('http://54.241.230.117:4000/logout', {
                        mode: 'cors',
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ token: sessionStorage.getItem('token') })
                      }).then(() => {
                        sessionStorage.clear()
                        window.location.assign('/login')
                      })
                    }} style={{ padding: '3px' }} aria-label='delete'
                  >
                    <ArrowBackIcon />
                  </Button>
                </Fade>
              </Grid>
              <Grid>
                <Typography component='h1' variant='h5'>
                Trio Photo
                </Typography>
              </Grid>
              <Grid>
                <Button className={classes.hidden} aria-label='delete'>
                  <ArrowBackIcon />
                </Button>
              </Grid>
            </Grid>

            {this.props.children}
            <Box mt='auto' mb={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Fade>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(RightGrid)
