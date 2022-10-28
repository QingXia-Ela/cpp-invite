import * as React from 'react'
import './App.scss'
import Layout from './layouts'

import ResizeHtmlFontSize from '@/utils/resetHtmlFontSize'
let hasListenResize = false

function App() {
  React.useEffect(() => {
    if (!hasListenResize) {
      ResizeHtmlFontSize()
      hasListenResize = true
    }
  })

  return (
    <Layout />
  )
}

export default App
