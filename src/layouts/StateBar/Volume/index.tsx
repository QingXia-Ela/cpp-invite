import * as React from 'react'
import Styles from './index.module.scss'
import { connect } from 'react-redux'
import { muteBGM, unMuteBGM } from '@/store/volume/action'

export type VolumeProps = React.PropsWithChildren<{
  muteBGM: Function
  unMuteBGM: Function
  mute: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>

function Volume(props: VolumeProps) {
  function switchMute() {
    props.mute ? props.unMuteBGM() : props.muteBGM()
  }

  return (
    <div className={`${typeof props.className === 'string' ? props.className : ''} ${Styles.volume}`} onClick={switchMute}>
      {props.mute ? <div className="iconfont icon-24gl-volumeZero"></div> : <div className='iconfont icon-24gl-volumeMiddle'></div>}
    </div>
  )
}

export default connect(({ VolumeStore }) => ({
  mute: VolumeStore.mute
}), {
  muteBGM,
  unMuteBGM
})(Volume)
