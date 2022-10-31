import * as React from 'react'
import Styles from './index.module.scss'

import { connect } from 'react-redux'
import { changeOccupation } from '@/store/occupation/action'
import ParticleSystem from '@/THREE'

type DetailQRCodeProps = React.PropsWithChildren<{
  changeOccupation: Function
  className: string
  occupation?: any
  ParticleContext: ParticleSystem
}>
let temp = ''

const DetailQRCode = (props: DetailQRCodeProps) => {
  React.useEffect(() => {
    if (props.occupation != null) temp = props.occupation
  })
  return (
    <div className={`${Styles.detail_qr_code} ${props.className}`}>
      <div className={Styles.back} onClick={() => {
        props.ParticleContext.ChangeModel('kv')
        props.changeOccupation(null)
      }}>
        返回
      </div>
      <div className={Styles.text_tip}>{temp}二轮考核群</div>
    </div>
  )
}

export default connect(({ OccupationStore, ParticleContextStore }) => ({
  occupation: OccupationStore.occupation,
  ParticleContext: ParticleContextStore.ParticleContext
}), {
  changeOccupation
})(DetailQRCode)
