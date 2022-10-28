import { Action } from 'redux'
import { FULLSCREEN, UNFULLSCREEN } from './constant'

type A = Action<string>

export const fullScreen = (): A => ({ type: FULLSCREEN })
export const unFullScreen = (): A => ({ type: UNFULLSCREEN })
