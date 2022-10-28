import * as React from 'react'
import Styles from './index.module.scss'

function TextContent() {
  return (
    <div className={Styles.text_content}>
      <p>嗨，恭喜你通过 Cpp 团队的一轮考核</p>
      <p>此时你已经在学习的方向上有所成就</p>
      <p>希望你能在未来的学习与考核中继续努力</p>
      <p>朝乾夕惕，功不唐捐</p>
      <p>期待你在二轮考核的表现</p>
    </div>
  )
}

export default TextContent
