
import { AnyAction } from 'redux'

import { SETPARTICLECONTEXT } from './constant'

const initState = {
  ParticleContext: null
}

function ParticleContextStore(state = initState, action: AnyAction) {
  const newState = { ...state }
  const { type, data } = action
  switch (type) {
    case SETPARTICLECONTEXT:
      newState.ParticleContext = data
      break

    default:
      break
  }

  return newState
}

export default ParticleContextStore
