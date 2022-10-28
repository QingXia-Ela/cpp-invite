import { Action } from 'redux'
import { MUTE, UNMUTE } from './constant'

type A = Action<string>

export const muteBGM = (): A => ({ type: MUTE })
export const unMuteBGM = (): A => ({ type: UNMUTE })
