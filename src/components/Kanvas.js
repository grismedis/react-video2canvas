import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Radium from 'radium'


const KanvasStyles = {
  display: 'block',
  margin: '0 auto',
  maxWidth: '100%',
  minWidth: '60%',
  backgroundColor: 'red',
}

class Kanvas extends Component {
  constructor(props){
    super(props)
  }

  draw = () => {
    const vidEl = this.props.videoEl.current
    const glCanvas = this.props.canvasRef.current
    if (vidEl.paused || vidEl.stopped) return false
    glCanvas.getContext('2d').drawImage(vidEl, 0, 0, 300, 150)
    setTimeout(this.draw, 30)
  }

  render() {
    const { canvasRef } = this.props
    return (
      <canvas
        ref={canvasRef}
        className="glcanvas"
        style={ KanvasStyles }
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
