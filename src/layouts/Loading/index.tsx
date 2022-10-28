import * as React from 'react'
import Styles from './index.module.scss'
import logo from '@/assets/cpp.svg'
import Progress from './Progress'
import Nprogress from 'nprogress'

export type LoadingProps = React.PropsWithRef<{
  onRef: React.Ref<any>
  onEnter?: Function
}>

export interface LoadingMethods {
  FinishLoad: Function
}
let id: any

function Loading(props: LoadingProps) {
  const [showUp, changeShowUp] = React.useState(false)
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
    setTimeout(() => {
      changeShowUp(false);
      (props.onEnter != null) && props.onEnter()
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

export default Loading
