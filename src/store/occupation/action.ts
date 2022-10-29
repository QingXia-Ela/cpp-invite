import { AnyAction } from 'redux'
import { CHANGEOCCUPATION } from './constant'

type A = AnyAction

export const changeOccupation = (data: string | null): A => ({ type: CHANGEOCCUPATION, data })
