import * as React from 'react'
import Styles from './index.module.scss'
import logo from '@/assets/cpp.svg'
import Progress from './Progress'
import Nprogress from 'nprogress'
import { unMuteBGM } from '@/store/volume/action'
import { connect } from 'react-redux'
import { enter } from '@/store/hasEnter/action'

export type LoadingProps = React.PropsWithRef<{
  onRef: React.Ref<any>
  onEnter?: Function
  unMuteBGM: Function
  enter: Function
}>

export interface LoadingMethods {
  FinishLoad: Function
}
let id: any

function Loading(props: LoadingProps) {
  const [showUp, changeShowUp] = React.useState(true)
  const [hide, changeHide] = React.useState(false)
  const [progress, changeProgress] = React.useState(100)

  React.useEffect(() => {
    Nprogress.start()
    if (id === undefined) {
      id = setInterval(() => {
        if (progress !== 100 && Nprogress.status != null) {
          changeProgress(parseInt((Nprogress.status * 100).toFixed(2)))
        }
      }, 1000)
    }
  })

  function FinishLoad() {
    changeProgress(100)
    clearInterval(id)
  }

  function Enter() {
    changeHide(true)
    props.unMuteBGM();
    (props.onEnter != null) && props.onEnter()
    props.enter()
    setTimeout(() => {
      changeShowUp(false)
    }, 900)
  }

  React.useImperativeHandle(props.onRef, (): LoadingMethods => {
    return {
      FinishLoad
    }
  })

  return (
    showUp
      ? (
        <div className={`${Styles.loading}${hide ? ` ${Styles.hide}` : ''}`}>
          <div className={Styles.logo_svg}>
            <img src={logo} alt="CppTeam" />
          </div>
          <div className={Styles.description}>2022 CppTeam Invitation</div>
          <Progress>{`${progress}%`}</Progress>
          {progress === 100 ? <div className={Styles.enter} onClick={Enter}>进入</div> : undefined}
        </div>)
      : (<></>)
  )
}

export default connect(() => ({}), { unMuteBGM, enter })(Loading)
