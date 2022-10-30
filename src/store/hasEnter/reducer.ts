
import { AnyAction } from 'redux'

import { ENTER, SCROLLABLE } from './constant'

const initState = {
  hasEnter: false,
  scrollAble: false
}

function HasEnterStore(state = initState, action: AnyAction) {
  const newState = { ...state }
  const { type } = action
  switch (type) {
    case ENTER:
      newState.hasEnter = true
      break

    case SCROLLABLE:
      newState.scrollAble = true
      break

    default:
      break
  }

  return newState
}

export default HasEnterStore
