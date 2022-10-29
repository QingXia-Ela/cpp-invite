import * as React from 'react'
import Styles from './index.module.scss'
import OccupationList from './OccupationList'

function Stage() {
  return (
    <div className={Styles.stage}>
      <OccupationList />
    </div>
  )
}

export default Stage
