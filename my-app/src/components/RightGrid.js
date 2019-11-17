import React from 'react'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Fade } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  paper: {
    margin: theme.spacing(2, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  flexColScroll: {
    flexGrow: '1',
    overflow: 'auto',
    minHeight: '100%'
  }
}))

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

function RightGrid (props) {
  const classes = useStyles()
  return (
    <Fade in timeout={1000}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.flexColScroll}>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
              Trio Photo
          </Typography>
          {props.children}
          <Box position='relative' mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Fade>
  )
}

export default RightGrid
