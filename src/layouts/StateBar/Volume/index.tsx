import * as React from 'react'
import Styles from './index.module.scss'

export type VolumeProps = React.PropsWithChildren<{

} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

function Volume(props: VolumeProps) {
  const [mute, changeMute] = React.useState(false)
  return (
    <div {...props} className={`${typeof props.className === 'string' ? props.className : ''} ${Styles.volume}`}>
      {mute ? <div className="iconfont icon-24gl-volumeZero"></div> : <div className='iconfont icon-24gl-volumeMiddle'></div>}
    </div>
  )
}

export default Volume
