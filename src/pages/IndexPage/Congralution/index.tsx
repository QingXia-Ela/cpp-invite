import * as React from 'react'
import Styles from './index.module.scss'
import smallLogo from '@/assets/images/smallLogo.png'
import TextContent from './Text'

function Congralution() {
  return (
    <div className={Styles.congralution}>
      <div className={Styles.left_top_logo}>
        <img src={smallLogo} />
      </div>
      <TextContent />
    </div>
  )
}

export default Congralution
