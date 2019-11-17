import React from 'react'
import Grid from '@material-ui/core/Grid'
import webImage1 from '../static/images/WebImg1.jpg'
import webImage2 from '../static/images/WebImg2.jpg'
import webImage3 from '../static/images/WebImg3.jpg'
import webImage4 from '../static/images/WebImg4.jpg'
import webImage5 from '../static/images/WebImg5.jpg'
import { Fade } from '@material-ui/core'

class LeftGrid extends React.Component {
  constructor (props) {
    super(props)
    this.state = { loaded: false }
    this.placeHolder = {
      height: '100%',
      width: '100%',
      backgroundColor: '#fff'
    }
    this.style = {
      // backgroundImage: `url(${webImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    this.webImages = [
      `url(${webImage1})`,
      `url(${webImage2})`,
      `url(${webImage3})`,
      `url(${webImage4})`,
      `url(${webImage5})`
    ]
    this.timeout = 1000
  }

  render () {
    const randImageIdx = Math.floor(Math.random() * 5)
    const webImage = this.webImages[randImageIdx]
    this.style.backgroundImage = webImage
    return (
      <Fade in={this.props.isBGLoaded} timeout={this.timeout}>
        <Grid item xs={false} sm={4} md={7} style={this.props.isBGLoaded ? this.style : this.placeHolder}>
          {this.props.isBGLoaded ? null : <img style={{ display: 'none' }} alt='preloader' src={webImage} onLoad={() => { this.props.onBGLoad() }} />}
        </Grid>
      </Fade>
    )
  }
}

export default LeftGrid
