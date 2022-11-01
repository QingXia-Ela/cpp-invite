import * as React from 'react'
import Styles from './index.module.scss'
import WebGL from './WebGL'

const WebGLMask: React.FunctionComponent<{}> = () => {
  const [support, setSupport] = React.useState(true)
  React.useState(() => {
    if (!WebGL.isWebGLAvailable()) setSupport(false)
  })
  return (
    support
      ? (<></>)
      : (<div className={Styles.webgl_mask}>
        <p className={Styles.face}>{':('}</p>
        <p>您当前浏览器内核不支持WebGL，请升级您的浏览器</p>
        <p>或使用 <a href="https://www.google.cn/chrome/">Google Chrome</a>、<a href="http://www.firefox.com.cn/download">Firefox</a> 等高级浏览器，即可进入本页面进行体验！</p>
      </div>)
  )
}

export default WebGLMask
