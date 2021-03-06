import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Kanvas from './Kanvas'
import VideoContainer from '../containers/VideoContainer'

const ComponentStyles = {
    width: '640px',
    height: 'auto',
    // display: 'flex',
    // flexDirection: 'column',
    flexWrap: 'nowrap',
    // justifyContent: 'flex-start',
    // alignItems: 'stretch',
    backgroundColor: 'pink',
    // overflow: 'hidden',
    margin: '0',
  }

  class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        videoEl: null,
        canvasEl: null,
        videoRef: React.createRef(),
        canvasRef: React.createRef(),
        shouldShowCanvas: true,
      }
    }
    componentWillMount(){
      const videoEl = this.state.videoRef
      const canvasEl = this.state.canvasRef
      this.setState({ videoEl, canvasEl })
    }
    componentDidMount(){
      const { dispatch } = this.props
    }

    render() {
      return (
        <div className="tempcontainer" style={ComponentStyles}>
          <VideoContainer  videoRef ={ this.state.videoRef }/>
          <Kanvas
            canvasRef={ this.state.canvasRef }
            videoEl= { this.state.videoEl }
            shouldShowCanvas={this.state.shouldShowCanvas}
          />
          <button onClick={(e) => this.setState({shouldShowCanvas: !this.state.shouldShowCanvas})}>
            Click Me
          </button>
        </div>
      )
    }
  }

  App.propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  const mapStateToProps = (state) => {
    return { state }
  }

  export default connect(mapStateToProps, null)(Radium(App))
