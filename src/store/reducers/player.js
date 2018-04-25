import {
    TOGGLE_VOLUME,
    TOGGLE_PLAY,
  } from '../actions/player'

  import {
    LOADING,
    READY,
    PLAYING,
    PAUSED,
    STOPPED,
    MUTED,
  } from '../../misc/states'

  const initialState = {
    isFullScreen: false,
    isPlaying: false,
    shouldFollow: false,
    isMute: false,
    volume: 0.5,
    video: 'INIT',
    sources: [{src: '', type: 'video/mp4'}],
    videoEl: null,
    canvasEl: null,
  }

  const player = (state =  initialState, action) => {
    switch (action.type) {
      case TOGGLE_VOLUME:
        return {
          ...state,
          volume: state.volume ? 0 : 0.5,
        }
      case TOGGLE_PLAY:
        return {
          ...state,
          isPlaying: !state.isPlaying,
          video: state.isPlaying ? PAUSED : PLAYING,
        }
      default:
        return state
    }
  }

  export default player
