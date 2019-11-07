import React from 'react'
import Grid from '@material-ui/core/Grid'
import webImage from '../static/images/WebImg.jpg'
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
      backgroundImage: `url(${webImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    this.timeout = 1000
  }

  render () {
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
