import * as React from 'react'
import Styles from './index.module.scss'
import { fullScreen, unFullScreen } from '@/store/fullscreen/action'
import { connect } from 'react-redux'

export type FullScreenProps = React.PropsWithChildren<{
  fullScreen: Function
  unFullScreen: Function
  fullscreen: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

function FullScreen(props: FullScreenProps) {
  function switchFullScreen() {
    props.fullscreen ? props.unFullScreen() : props.fullScreen()
  }

  return (
    <div className={`${typeof props.className === 'string' ? props.className : ''} ${Styles.full_screen}`} onClick={switchFullScreen}>
      {props.fullscreen ? <div className="iconfont icon-24gl-fullScreenExit2"></div> : <div className='iconfont icon-24gl-fullScreenEnter2'></div>}
    </div>
  )
}

export default connect(({ FullScreenStore }) => ({
  fullscreen: FullScreenStore.isFullScreen
}), { fullScreen, unFullScreen })(FullScreen)
