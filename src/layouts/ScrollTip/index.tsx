import * as React from 'react'
import Styles from './index.module.scss'

function ScrollTip() {
  return (
    <div className={`${Styles.scroll_tip}`}>
      <p>SCROLL</p>
      <div className={Styles.arrow}></div>
      <div className={Styles.arrow}></div>
      <div className={Styles.arrow}></div>
    </div>
  )
}

export default ScrollTip
