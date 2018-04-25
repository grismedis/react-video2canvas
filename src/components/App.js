import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import KanvasContainer from '../containers/KanvasContainer'
import VideoContainer from '../containers/VideoContainer'

const ComponentStyles = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }

  class App extends Component {
    constructor(props){
      super(props)
      this.state = {
        videoEl: React.createRef(),
        canvasEl: React.createRef(),
        sources: [{
          src: "https://coverr.co/s3/mp4/Mini-boat.mp4",
          type: "video/mp4"}],
      }
    }

    componentDidMount(){
      const { dispatch } = this.props
    }

    render() {
      return (
        <div className="tempcontainer" style={ComponentStyles}>
          {/* <KanvasContainer /> */}
          <VideoContainer  />
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

  export default connect(mapStateToProps, null, null, { withRef: true })(Radium(App))
