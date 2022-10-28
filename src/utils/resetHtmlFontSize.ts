import { throttle } from 'lodash'

function resizeFunc() {
  const html = document.querySelector('html')
  // 高度
  const newHeightFontSize = ((html!.clientHeight / 930) * 50).toFixed(2)
  const result = newHeightFontSize

  document
    .querySelector('html')!
    .setAttribute('style', 'font-size:' + result + 'px !important')
}

const ResizeHtmlFontSize = () => {
  resizeFunc()
  window.addEventListener('resize', throttle(resizeFunc, 200))
}

export default ResizeHtmlFontSize
