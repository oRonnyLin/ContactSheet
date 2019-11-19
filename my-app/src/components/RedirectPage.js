import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Fade } from '@material-ui/core'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded'

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
function RedirectPage (props) {
  const history = useHistory()
  const classes = useStyles()
  //   console.log(`Unauth page called ${count}times`)
  //   setCount(count + 1)
  return (
    <Fade in>
      <div className={classes.paper}>
        <WarningRoundedIcon transform='scale(2)' />
        <Typography component='body1' variant='body1' style={{ margin: '20px' }} gutterBottom>
          {props.Message}
          {/* Oops, you need to login first. */}
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
    </Fade>
  )
}

export default RedirectPage
