import * as React from 'react'
import Styles from './index.module.scss'
import logo from '@/assets/cpp.svg'
import Progress from './Progress'

function Loading(props: any) {
  const [showUp, changeShowUp] = React.useState(true)
  return (
    showUp
      ? (
        <div className={`${Styles.loading}`}>
          <div className={Styles.logo_svg}>
            <img src={logo} alt="CppTeam" />
          </div>
          <div className={Styles.description}>2022 CppTeam Invitation</div>
          <Progress></Progress>
        </div>)
      : (<></>)
  )
}

export default Loading
