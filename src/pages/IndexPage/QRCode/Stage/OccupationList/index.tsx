import * as React from 'react'
import Styles from './index.module.scss'
import OccupationListItem from './Item'

import { connect } from 'react-redux'
import { changeOccupation } from '@/store/occupation/action'

type OccupationListProps = React.PropsWithChildren<{
  changeOccupation: Function
  className: string
}>

const OccupationList = (props: OccupationListProps) => {
  return (
    <div className={`${Styles.occupation_list} ${props.className}`}>
      <OccupationListItem onClick={() => props.changeOccupation('视觉')}>视觉</OccupationListItem>
      <OccupationListItem onClick={() => props.changeOccupation('后端')}>后端</OccupationListItem>
      <OccupationListItem onClick={() => props.changeOccupation('安卓')}>安卓</OccupationListItem>
      <OccupationListItem onClick={() => props.changeOccupation('前端')}>前端</OccupationListItem>
      <OccupationListItem onClick={() => props.changeOccupation('UI')}>UI</OccupationListItem>
    </div>
  )
}

export default connect(({ OccupationStore }) => ({
  occupation: OccupationStore.occupation
}), {
  changeOccupation
})(OccupationList)
