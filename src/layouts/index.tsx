import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import Loading, { LoadingMethods } from './Loading'

function Layout() {
  const LoadingRef = React.createRef<LoadingMethods>()

  React.useEffect(() => {
    setTimeout(() => {
      LoadingRef.current?.FinishLoad()
    }, 5000)
  })
  return (
    <div className={Styles.layout}>
      <Loading onRef={LoadingRef} />
      <IndexPage />
    </div>
  )
}

export default Layout
