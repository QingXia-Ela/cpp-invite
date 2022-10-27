import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import Loading from './Loading'

function Layout() {
  return (
    <div className={Styles.layout}>
      <Loading />
      <IndexPage />
    </div>
  )
}

export default Layout
