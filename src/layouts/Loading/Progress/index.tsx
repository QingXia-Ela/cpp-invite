import * as React from 'react'
import Styles from './index.module.scss'

function Progress(props: React.PropsWithChildren<{}>) {
  return (
    <div className={Styles.progress}>{props.children}</div>
  )
}

export default Progress
