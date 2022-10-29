import * as React from 'react'
import Styles from './index.module.scss'
import Stage from './Stage'

function QRCode() {
  return (
    <div className={Styles.qr_code}>
      <div className={Styles.title}>
        <div className={Styles.line_left}></div>
        快开启你的二轮挑战吧
        <div className={Styles.line_right}></div>
      </div>
      <Stage />
    </div>
  )
}

export default QRCode
