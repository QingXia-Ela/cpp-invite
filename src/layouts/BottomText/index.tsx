import * as React from 'react'
import Styles from './index.module.scss'

function BottomText() {
  return (
    <div className={Styles.bottom_text}>
      <div className={Styles.left}>Copyright © 2022 - CppTeam</div>
      <div className={Styles.right}>Powered by &nbsp;
        <a href="https://github.com/QingXia-Ela/Up2017-Particles-Effect-Template" target='_blank' rel="noreferrer">
          Up2017-Particles-Effect-Template
        </a>
      </div>
    </div>
  )
}

export default BottomText
