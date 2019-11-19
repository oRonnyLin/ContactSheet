import React from 'react'
import paulButton from '../static/images/button/Paulbutton.jpg'
import vivianButton from '../static/images/button/Vivianbutton.jpg'
import sarahButton from '../static/images/button/Sarahbutton.jpg'
import groupButton from '../static/images/button/Groupbutton.jpg'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Fade } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

const buttonImages = [
  {
    url: groupButton,
    title: 'Group',
    width: '100%',
    path: '/group',
    height: '100%'
  },
  {
    url: vivianButton,
    title: 'Harp',
    width: '100%',
    path: '/harp',
    height: '100%'
  },
  {
    url: paulButton,
    title: 'Flute',
    width: '100%',
    path: '/flute',
    height: '100%'
  },
  {
    url: sarahButton,
    title: 'Viola',
    width: '100%',
    path: '/viola',
    height: '100%'
  }
]

// makeStyles(
const useStyles = theme => ({
  buttonImageRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    paddingBottom: '5px'
  },
  menuRoot: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '20px 0px 0px 0px'
  },
  buttonImage: {
    position: 'relative',
    minHeight: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.05
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    fontSize: '30px',
    border: '4px solid transparent',
    transition: 'border 0.5s'
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Group: false,
      Harp: false,
      Flute: false,
      Viola: false
    }
    this.token = sessionStorage.getItem('token')
    this.props.setLoadMenuPage(true)
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.menuRoot}>
        {buttonImages.map((image, index) => (
          <Fade key={index} in={this.state[image.title]} timeout={1000}>
            {
              !this.state[image.title] ? <img style={{ display: 'none' }} alt='preloader' src={image.url} onLoad={() => { this.setState({ [image.title]: true }) }} />
                : <div className={classes.buttonImageRoot}>

                  <ButtonBase
                    href={`${image.path}?token=${this.token}`}
                    focusRipple
                    key={image.title}
                    className={classes.buttonImage}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                      width: image.width,
                      height: image.height
                    }}
                    // target='_blank'
                  >
                    <Fade in={this.state[image.title]} timeout={1000}>
                      <Grid
                        className={classes.imageSrc}
                        style={{
                          backgroundImage: `url(${image.url})`
                        }}
                      />
                    </Fade>
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton}>
                      <Typography
                        component='span'
                        variant='subtitle1'
                        color='inherit'
                        className={classes.imageTitle}
                      >
                        {image.title}
                        <span className={classes.imageMarked} />
                      </Typography>
                    </span>
                  </ButtonBase>
                  </div>
            }
          </Fade>))}
      </div>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(Menu)
