
import { AnyAction } from 'redux'

import { ENTER, SCROLLABLE, ADDCNT } from './constant'

const initState = {
  hasEnter: false,
  scrollAble: false,
  finishLoad: false,
  loadCnt: 0
}

const MainCount = 4

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
    case ADDCNT:
      newState.loadCnt++
      if (newState.loadCnt === MainCount) newState.finishLoad = true
      break

    default:
      break
  }

  return newState
}

export default HasEnterStore
