import * as React from 'react'
import Styles from './index.module.scss'
import FullScreen from './FullScreen'
import Volume from './Volume'

function StateBar(props: any) {
  return (
    <div className={Styles.state_bar}>
      <FullScreen className={Styles.module} />
      <Volume className={Styles.module} />
    </div>
  )
}

export default StateBar
