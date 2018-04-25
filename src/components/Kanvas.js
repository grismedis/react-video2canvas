import React, { Component } from 'react'
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
  constructor(){
    super()

    this.gl = null
    this.videoEl = null
  }

  componentWillMount() {
    console.log('Kanvas about to mount')
  }

  componentDidMount() {
    this.setWebGl()
  }

  componentWillUnmount(){
    console.log('destroy Kanvas')
  }

  setWebGl = () => {
    const glEl = this.props.canvasRef.current
    this.gl = this.initWebGL(glEl)
    console.log('this.gl', this.gl)
  }

  initWebGL = (elCanvas) => {
    try {
      return elCanvas.getContext('webgl') || elCanvas.getContext('experimental-webgl')
    } catch (e) {
      alert('Browser does not support webGL')
      console.log('error with webGL init', e)
    }
  }

  getVideoEl = () => {
    this.videoEl = this.props.videoEl
    console.log('this.videoEl', this.videoEl)
  }

  draw = () => {
    this.videoEl = this.props.videoEl
    if (this.vidEl.paused || this.vidEl.stopped) return false
    this.gl.canvas.getContext('2d').drawImage(this.videoEl.current, 0, 0, 300, 150)
    setTimeout(this.draw, 30)
  }

  render() {
    return (
      <canvas
        ref={this.props.canvasEl}
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
