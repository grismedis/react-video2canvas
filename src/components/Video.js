import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import PropTypes from 'prop-types'
import plyr from 'plyr'

import { PLYR_CONFIG } from '../misc/plyr-config'
import {
  LOADING,
  READY,
  PLAYING,
  PAUSED,
  STOPPED,
  MUTED,
} from '../misc/states'

const VideoStyles = {
  display: 'block',
  margin: '0 auto',
  maxWidth: '10%',
}

class VideoPlayer extends Component {
  constructor(props) {
    super(props)

    this.player = null
  }

  componentDidMount() {
    this.setPlayer()
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props
    switch (player.video) {
      case LOADING:
        // only can playvideo if the videoItem has changed
        if (prevProps.player !== player) {
          this.playVideo()
        }
        break
      case PLAYING:
        this.player.volume(this.props.volume)
        break
      case STOPPED:
        this.player.stop()
        break
      case PAUSED:
        this.player.pause()
        break
      default:
        break
    }
  }

  componentWillUnmount () {
    this.player && this.player.destroy()
  }

  setPlayer(){
    console.log('this.props', this.props)
    const selector = this.props.videoEl.current
    this.player =  new plyr(selector, PLYR_CONFIG)
  }

  setPlayerEvents() {
    this.player.on('canplay', () => {
        this.props.videoLoaded(this.props.sources.src)
        this.player.play()
      }
    )
    this.player.on('pause', () => {
        this.player.pause()
      }
    )
    this.player.on('error', () => {
        this.props.stopPlayback('this.props.videoItem.url')
        this.stop()
      }
    )
  }

  render() {
    const { sources, videoEl } = this.props
    return(
        <video
          ref={videoEl}
          className={"video-player"}
          preload={this.props.preload}
          poster={this.props.poster}
          style={ VideoStyles }
        >
          {sources.map((source, index) =>
            <source
              key={index}
              src={source.src}
              type={source.type}
            />
          )}
        </video>
    )
  }
}

VideoPlayer.propTypes = {
  type: PropTypes.oneOf(['video', 'youtube']),
  className: PropTypes.string,
  poster: PropTypes.string,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  volume: PropTypes.number,
  videoEl: PropTypes.object,
}

VideoPlayer.defaultProps = {
  type: 'video',
  enabled: true,
  volume: 0.5,
}

export default Radium(VideoPlayer)