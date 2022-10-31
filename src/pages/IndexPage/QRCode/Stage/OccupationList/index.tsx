import * as React from 'react'
import Styles from './index.module.scss'
import OccupationListItem from './Item'

import { connect } from 'react-redux'
import { changeOccupation } from '@/store/occupation/action'
import ParticleSystem from '@/THREE'

type OccupationListProps = React.PropsWithChildren<{
  changeOccupation: Function
  className: string
  ParticleContext: ParticleSystem
}>

const OccupationList = (props: OccupationListProps) => {
  function changeOccupation(target: string) {
    props.ParticleContext.ChangeModel('qr')
    props.changeOccupation(target)
  }
  return (
    <div className={`${Styles.occupation_list} ${props.className}`}>
      <OccupationListItem onClick={() => changeOccupation('视觉')}>视觉</OccupationListItem>
      <OccupationListItem onClick={() => changeOccupation('后端')}>后端</OccupationListItem>
      <OccupationListItem onClick={() => changeOccupation('安卓')}>安卓</OccupationListItem>
      <OccupationListItem onClick={() => changeOccupation('前端')}>前端</OccupationListItem>
      <OccupationListItem onClick={() => changeOccupation('UI')}>UI</OccupationListItem>
    </div>
  )
}

export default connect(({ OccupationStore, ParticleContextStore }) => ({
  occupation: OccupationStore.occupation,
  ParticleContext: ParticleContextStore.ParticleContext
}), {
  changeOccupation
})(OccupationList)
