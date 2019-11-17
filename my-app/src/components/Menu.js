import React from 'react'
import paulButton from '../static/images/button/Paulbutton.jpg'
import vivianButton from '../static/images/button/Vivianbutton.jpg'
import sarahButton from '../static/images/button/Sarahbutton.jpg'
import groupButton from '../static/images/button/Groupbutton.jpg'
import { makeStyles, withTheme, withStyles } from '@material-ui/core/styles'
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
})

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Group: false,
      Harp: false,
      Flute: false,
      Violin: false
    }
    this.placeHolder = {
      height: '100%',
      width: '100%',
      backgroundColor: '#fff'
    }
    this.imageMarked = {
      height: 3,
      width: 18,
      backgroundColor: props.theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: props.theme.transitions.create('opacity')
    }
    this.imageTitle = {
      position: 'relative',
      padding: `${props.theme.spacing(2)}px ${props.theme.spacing(4)}px ${props.theme.spacing(1) + 6}px`,
      fontSize: '30px'
    }
    this.buttonImageRoot = {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
      paddingBottom: '5px'
    }
    this.menuRoot = {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '20,0,0,0'
    }
    this.buttonImage = {
      position: 'relative',
      height: 200,
      width: '100%',
      [props.theme.breakpoints.down('xs')]: {
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
    }
    this.focusVisible = {}
    this.imageButton = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: props.theme.palette.common.white
    }
    this.imageSrc = {
      Group: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundImage: `url(${groupButton})`
      },
      Harp: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundImage: `url(${vivianButton})`
      },
      Flute: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundImage: `url(${paulButton})`
      },
      Violin: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        backgroundImage: `url(${sarahButton})`
      }
    }
    this.imageSrcPlaceHolder = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
      height: '100%',
      width: '100%',
      backgroundColor: '#fff'
    }
    this.imageBackdrop = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: props.theme.palette.common.black,
      opacity: 0.2,
      transition: props.theme.transitions.create('opacity')
    }
  }

  render () {
    const { classes, theme } = this.props
    return (
      <div className={classes.menuRoot}>
        {buttonImages.map((image, index) => (
          <div key={index} className={classes.buttonImageRoot}>
            {console.log(`${index} is ${image.title} loaded 1: ${this.state[image.title]}`)}
            <ButtonBase
              href={`${image.path}?token=123`}
              focusRipple
              key={image.title}
              className={classes.buttonImage}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width
              }}
              target='_blank'
            >
              <Fade in={this.state[image.title]} timeout={1000}>
                <span
                  className={classes.imageSrc}
                  style={this.state[image.title] ? {
                    backgroundImage: `url(${image.url})`
                  } : this.placeHolder}
                >
                  {this.state[image.title] ? null
                    : <img
                      style={{ display: 'none' }} alt='preloader' src={image.url} onLoad={() => {
                        this.setState({ [image.title]: true })
                        console.log(`is ${image.title} loaded 2: ${this.state[image.title]}`)
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
}

// <div style={this.menuRoot}>
//         {buttonImages.map((image, index) => (
//           <div key={index} style={this.buttonImageRoot}>
//             {console.log(`${index} is ${image.title} loaded 1: ${this.state[image.title]}`)}
//             <ButtonBase
//               href={`${image.path}?token=123`}
//               focusRipple
//               key={image.title}
//               style={this.buttonImage}
//               focusVisibleClassName={this.focusVisible}
//               // style={{
//               //   width: image.width
//               // }}
//               target='_blank'
//               // onClick={() => { history.push(image.path) }}
//             >
//               <Fade in={this.state[image.title]} timeout={1000}>
//                 <span
//                   style={this.state[image.title] ? this.imageSrc[image.title] : this.imageSrcPlaceHolder}
//                 >
//                   {this.state[image.title] ? null
//                     : <img
//                       style={{ display: 'none' }} alt='preloader' src={image.url} onLoad={() => {
//                         this.setState({ [image.title]: true })
//                         console.log(`is ${image.title} loaded 2: ${this.state[image.title]}`)
//                       }}
//                     />}
//                 </span>
//               </Fade>
//               <span style={this.imageBackdrop} />
//               <span style={this.imageButton}>
//                 <Typography
//                   component='span'
//                   variant='subtitle1'
//                   color='inherit'
//                   style={this.imageTitle}
//                 >
//                   {image.title}
//                   <span style={this.imageMarked} />
//                 </Typography>
//               </span>
//             </ButtonBase>
//           </div>
//         ))}
//       </div>

// function Menu (props) {
//   const classes = useStyles()
//   const history = useHistory()
//   const placeHolder = {
//     height: '100%',
//     width: '100%',
//     backgroundColor: '#fff'
//   }
//   console.log('Menu component called')
//   return (
//     <div className={classes.menuRoot}>
//       {buttonImages.map((image, index) => (
//         <div key={index} className={classes.buttonImageRoot}>
//           {console.log(`${index} is ${image.title} loaded 1: ${props.isMenuImageLoaded[image.title]}`)}
//           <ButtonBase
//             href={`${image.path}?token=123`}
//             focusRipple
//             key={image.title}
//             className={classes.buttonImage}
//             focusVisibleClassName={classes.focusVisible}
//             style={{
//               width: image.width
//             }}
//             target='_blank'
//             // onClick={() => { history.push(image.path) }}
//           >
//             <Fade in={props.isMenuImageLoaded[image.title]} timeout={1000}>
//               <span
//                 className={classes.imageSrc}
//                 style={props.isMenuImageLoaded[image.title] ? {
//                   backgroundImage: `url(${image.url})`
//                 } : placeHolder}
//               >
//                 {props.isMenuImageLoaded[image.title] ? null
//                   : <img
//                     style={{ display: 'none' }} alt='preloader' src={image.url} onLoad={() => {
//                       props.setMenuImageLoaded(image.title)
//                       console.log(`is ${image.title} loaded 2: ${props.isMenuImageLoaded[image.title]}`)
//                     }}
//                     />}
//               </span>
//             </Fade>
//             <span className={classes.imageBackdrop} />
//             <span className={classes.imageButton}>
//               <Typography
//                 component='span'
//                 variant='subtitle1'
//                 color='inherit'
//                 className={classes.imageTitle}
//               >
//                 {image.title}
//                 <span className={classes.imageMarked} />
//               </Typography>
//             </span>
//           </ButtonBase>
//         </div>
//       ))}
//     </div>
//   )
// }

export default withStyles(useStyles, { withTheme: true })(Menu)
