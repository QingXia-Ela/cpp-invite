import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import StateBar from './StateBar'
import Loading, { LoadingMethods } from './Loading'

function Layout() {
  const LoadingRef = React.createRef<LoadingMethods>()
  const onEnter = () => {
  }

  React.useEffect(() => {
    setTimeout(() => {
      LoadingRef.current?.FinishLoad()
    }, 5000)
  })
  return (
    <div className={Styles.layout}>
      <Loading onRef={LoadingRef} onEnter={onEnter} />
      <StateBar />
      <IndexPage />
    </div>
  )
}

export default Layout
