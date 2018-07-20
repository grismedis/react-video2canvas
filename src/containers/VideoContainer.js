import { connect } from 'react-redux'

import VideoPlayer from '../components/Video'
import { toggleVolume, togglePlay } from '../store/actions/player';

const mapStateToProps = (state) => {
  return {
    volume: state.player.volume,
    videoSource: state.player.videoSource,
    // videoEl: state.player.videoEl,
  }
}

const mapDispatchToProps = dispatch => ({
  onPlayClick: () => {
    dispatch(togglePlay())
  },
  onVolumeClick: () => {
    dispatch(toggleVolume())
  }
})

const VideoContainer = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(VideoPlayer)
export default VideoContainer
