
import { AnyAction } from 'redux'

import { CHANGEOCCUPATION } from './constant'

interface initStateType {
  occupation: string | null
}

const initState: initStateType = {
  occupation: null
}

function OccupationStore(state = initState, action: AnyAction) {
  const newState = { ...state }
  const { type, data } = action
  switch (type) {
    case CHANGEOCCUPATION:
      newState.occupation = (typeof data === 'string') ? data : null
      break

    default:
      break
  }

  return newState
}

export default OccupationStore
