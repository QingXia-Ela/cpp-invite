import { AnyAction } from 'redux'
import { ENTER, SCROLLABLE } from './constant'

type A = AnyAction

export const enter = (): A => ({ type: ENTER })
export const scroll = (): A => ({ type: SCROLLABLE })
