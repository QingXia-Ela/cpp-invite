import * as React from 'react'
import Styles from './index.module.scss'
import OccupationListItem from './Item'

function OccupationList() {
  return (
    <div className={Styles.occupation_list}>
      <OccupationListItem>视觉</OccupationListItem>
      <OccupationListItem>后端</OccupationListItem>
      <OccupationListItem>安卓</OccupationListItem>
      <OccupationListItem>前端</OccupationListItem>
      <OccupationListItem>UI</OccupationListItem>
    </div>
  )
}

export default OccupationList
