import React from 'react'
import paulButton from '../static/images/button/Paulbutton.jpg'
import vivianButton from '../static/images/button/Vivianbutton.jpg'
import sarahButton from '../static/images/button/Sarahbutton.jpg'
import groupButton from '../static/images/button/Groupbutton.jpg'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useHistory } from 'react-router-dom'
import { Fade } from '@material-ui/core'

const buttonImages = [
  {
    url: groupButton,
    title: 'Group',
    width: '100%',
    path: '/group'
  },
  {
    url: vivianButton,
    title: 'Harp',
    width: '100%',
    path: '/harp'
  },
  {
    url: paulButton,
    title: 'Flute',
    width: '100%',
    path: '/flute'
  },
  {
    url: sarahButton,
    title: 'Violin',
    width: '100%',
    path: '/violin'
  }
]
const useStyles = makeStyles(theme => ({
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
    padding: '20,0,0,0'
  },
  buttonImage: {
    position: 'relative',
    height: 200,
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
    fontSize: '30px'
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
}))

function Menu (props) {
  const classes = useStyles()
  const history = useHistory()
  const placeHolder = {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff'
  }
  console.log('Menu component called')
  return (
    <div className={classes.menuRoot}>
      {buttonImages.map((image, index) => (
        <div key={index} className={classes.buttonImageRoot}>
          {console.log(`${index} is ${image.title} loaded 1: ${props.isMenuImageLoaded[image.title]}`)}
          <ButtonBase
            href={image.path}
            focusRipple
            key={image.title}
            className={classes.buttonImage}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width
            }}
            target='_blank'
            // onClick={() => { history.push(image.path) }}
          >
            <Fade in={props.isMenuImageLoaded[image.title]} timeout={1000}>
              <span
                className={classes.imageSrc}
                style={props.isMenuImageLoaded[image.title] ? {
                  backgroundImage: `url(${image.url})`
                } : placeHolder}
              >
                {props.isMenuImageLoaded[image.title] ? null
                  : <img
                    style={{ display: 'none' }} alt='preloader' src={image.url} onLoad={() => {
                      props.setMenuImageLoaded(image.title)
                      console.log(`is ${image.title} loaded 2: ${props.isMenuImageLoaded[image.title]}`)
                    }}
                  />}
              </span>
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
      ))}
    </div>
  )
}

export default Menu
