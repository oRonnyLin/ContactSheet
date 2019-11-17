import React from 'react'
import Grid from '@material-ui/core/Grid'
import webImage1 from '../static/images/WebImg1.jpg'
import webImage2 from '../static/images/WebImg2.jpg'
import webImage3 from '../static/images/WebImg3.jpg'
import webImage4 from '../static/images/WebImg4.jpg'
import webImage5 from '../static/images/WebImg5.jpg'
import { Fade } from '@material-ui/core'
const webImages = [
  webImage1,
  webImage2,
  webImage3,
  webImage4,
  webImage5
]

class LeftGrid extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.displayImage = null
    this.placeHolder = {
      height: '100%',
      width: '100%',
      backgroundColor: '#fff'
    }
    this.webImage = webImages[Math.floor(Math.random() * 5)]
    this.style = {
      backgroundImage: `url(${this.webImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }

    this.timeout = 1000
  }

  setImage () {
    const randImageIdx = Math.floor(Math.random() * 5)
    const webImage = this.webImages[randImageIdx]
    this.style.backgroundImage = `url(${webImage})`
    this.displayImage = webImage
  }

  render () {
    // this.setImage()
    return (
      <Fade in={this.state.loaded} timeout={this.timeout}>
        <Grid item xs={false} sm={4} md={7} style={this.state.loaded ? this.style : this.placeHolder}>
          {this.state.loaded ? null : <img style={{ display: 'none' }} alt='preloader' src={this.webImage} onLoad={() => { this.setState({ loaded: true }) }} />}
        </Grid>
      </Fade>
    )
  }
}

export default LeftGrid
