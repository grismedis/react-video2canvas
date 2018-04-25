import React from 'react'
import { render }  from 'react-dom'
import { StyleRoot } from 'radium'
import { AppContainer } from 'react-hot-loader'

import App from './components/App'
import configureStore from './store/configure-store'

const initialState = {
  player :{
    isFullScreen: false,
    isPlaying: false,
    isMute: false,
    volume: 0.5,
    videoState: 'INIT',
    sources: [{src: '', type: 'video/mp4'}],
    videoEl: null,
    canvasEl: null,
  }
}

const store = configureStore.store(initialState)

const rootEl = document.getElementById('root')

let pageStyle = {
  bottom: 0,
  left: 0,
  margin: 0,
  padding: 0,
  position: 'fixed',
  right: 0,
  top: 0
}

// Global renderer!
const renderComponent = (Component) => {
  render(
    configureStore.wrapStoreProviderWithApp(store,(
      <AppContainer>
        <StyleRoot style={pageStyle}>
          <Component />
        </StyleRoot>
      </AppContainer>
    )),
    rootEl
  )
}

renderComponent(App)

// Hot Module Replacement API
if (module.hot) {
  console.log(module.hot)
  module.hot.accept('./components/App', () => {
    renderComponent(App)
  })
}
