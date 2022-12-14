import { createStore, applyMiddleware, combineReducers } from 'redux'

import { cloneDeep } from 'lodash'

import { composeWithDevTools } from 'redux-devtools-extension'

import VolumeStore from './volume/reducer'
import FullScreenStore from './fullscreen/reducer'
import OccupationStore from './occupation/reducer'
import HasEnterStore from './hasEnter/reducer'
import ParticleContextStore from './particle/reducer'

import reduxThunk from 'redux-thunk'

const r = combineReducers({
  VolumeStore,
  FullScreenStore,
  OccupationStore,
  HasEnterStore,
  ParticleContextStore
})

const actionSanitizer = (action: any) => action

const stateSanitizer = (state: any) => {
  const newState: any = cloneDeep(state)
  // vol store hidden
  newState.VolumeStore.SoundCtx = 'Hidden on devtools'
  // particle context hidden
  if (newState.ParticleContextStore.ParticleContext !== null) newState.ParticleContextStore.ParticleContext = 'Context'
  return newState
}

const f = process.env.NODE_ENV === 'production'
  ? applyMiddleware(reduxThunk)
  : composeWithDevTools({
    actionSanitizer,
    stateSanitizer,
    traceLimit: 2
  })(applyMiddleware(reduxThunk))

export default createStore(r, f)
