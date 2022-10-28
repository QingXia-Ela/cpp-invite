
import { Action } from 'redux'

import { FULLSCREEN, UNFULLSCREEN } from './constant'

const initState = {
  isFullScreen: false
}

function isFullscreen() {
  return (document.fullscreenElement != null)
};

function FullScreenStore(state = initState, action: Action<string>) {
  const newState = { ...state }
  const { type } = action
  switch (type) {
    case FULLSCREEN:
      if (!isFullscreen()) document.documentElement.requestFullscreen().catch(() => { })
      newState.isFullScreen = true
      break
    case UNFULLSCREEN:
      if (isFullscreen()) document.exitFullscreen().catch(() => { })
      newState.isFullScreen = false
      break

    default:
      break
  }

  return newState
}

export default FullScreenStore
