import ParticleSystem from '@/THREE'
import { AnyAction } from 'redux'
import { SETPARTICLECONTEXT } from './constant'

type A = AnyAction

export const setParticleContext = (data: ParticleSystem): A => ({ type: SETPARTICLECONTEXT, data })
