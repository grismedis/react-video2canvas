import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Radium from 'radium'


const KanvasStyles = {
  // display: 'block',
  // margin: '0 auto',
  // width: '1280px',
  // height: '720px',
  // minWidth: '60%',
  backgroundColor: 'red',
  // marginLeft: '620px',
  margin: '0'
}

class Kanvas extends Component {
  constructor(props){
    super(props)
  }

  draw = () => {
    const vidEl = this.props.videoEl.current
    const glCanvas = this.props.canvasRef.current
    if (vidEl.paused || vidEl.stopped) return false
    // console.log('vidEl.videoWidth', vidEl.videoWidth);
    // console.log('vidEl.videoHeigh', vidEl.videoHeigh);
    glCanvas.getContext('2d').drawImage(vidEl, 0, 0, 300, 150)
    setTimeout(this.draw, 30)
  }

  render() {
    const { canvasRef, shouldShowCanvas } = this.props
    const divStyle2 = shouldShowCanvas ? {display: 'block'} : {display: 'none'}
    console.log('should show Canvas', shouldShowCanvas)
    return (
      <canvas
        ref={canvasRef}
        className="glcanvas"
        style={ Object.assign(KanvasStyles, divStyle2) }
        onClick={ this.draw }
      >
        No love for WebGL in this browser.
      </canvas>
    )
  }

}

Kanvas.propTypes = {
  canvasEl: PropTypes.object,
  videoEl: PropTypes.object,
  onClick: PropTypes.func,
}

export default Radium(Kanvas)
