import * as React from 'react'
import Styles from './index.module.scss'
import smallLogo from '@/assets/images/smallLogo.png'
import TextContent from './Text'
import ScrollTip from '@/layouts/ScrollTip'

function Congralution() {
  return (
    <div className={Styles.congralution}>
      <div className={Styles.left_top_logo}>
        <img src={smallLogo} />
      </div>
      <TextContent />
      <ScrollTip />
    </div>
  )
}

export default Congralution
