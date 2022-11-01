import { Action } from 'redux'
import * as THREE from 'three'

import { MUTE, UNMUTE } from './constant'

import store from '@/store'
import { addCnt } from '../hasEnter/action'

const listener = new THREE.AudioListener()
const sound = new THREE.Audio(listener)
const audioLoader = new THREE.AudioLoader()
audioLoader.load(new URL('../../assets/audio/bgm.mp3', import.meta.url).href, (buffer) => {
  sound.setBuffer(buffer).setLoop(true).setVolume(0.2)
  store.dispatch(addCnt())
})

const initState = {
  SoundCtx: sound,
  mute: false
}

function VolumeStore(state = initState, action: Action<string>) {
  const newState = { ...state }
  const { type } = action
  switch (type) {
    case MUTE:
      newState.mute = true
      sound.setVolume(0)
      break
    case UNMUTE:
      if (!sound.isPlaying) sound.play()
      newState.mute = false
      sound.setVolume(0.2)
      break

    default:
      break
  }

  return newState
}

export default VolumeStore
