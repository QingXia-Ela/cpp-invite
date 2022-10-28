import * as React from 'react'
import Styles from './index.module.scss'

export type FullScreenProps = React.PropsWithChildren<{

} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

function FullScreen(props: FullScreenProps) {
  const [fullscreen, changeFullscreen] = React.useState(false)
  return (
    <div className={`${typeof props.className === 'string' ? props.className : ''} ${Styles.full_screen}`}>
      {fullscreen ? <div className="iconfont icon-24gl-fullScreenExit2"></div> : <div className='iconfont icon-24gl-fullScreenEnter2'></div>}
    </div>
  )
}

export default FullScreen
