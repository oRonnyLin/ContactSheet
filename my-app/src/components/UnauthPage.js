import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

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
// style={{ textAlign: 'center', width: '100%', padding: '70px 0' }}
function UnauthPage () {
  const history = useHistory()
  const classes = useStyles()
  return (
    <div className={classes.paper}>
      <Typography component='h1' variant='h4' gutterBottom>
        Oops, you need to login first.
      </Typography>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        style={
          { margin: '3,0,2' }
        }
        onClick={() => { history.push('/login') }}
      >
                        Back to login page
      </Button>
    </div>
  )
}

export default UnauthPage
