import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import StateBar from './StateBar'
import BottomText from './BottomText'
import Loading, { LoadingMethods } from './Loading'

import { connect } from 'react-redux'
import { scroll } from '@/store/hasEnter/action'

interface LayoutProps {
  enter: boolean
  scroll: Function
  finishLoadMark: boolean
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const LoadingRef = React.createRef<LoadingMethods>()
  const IndexRef = React.createRef<any>()
  const onEnter = () => {
    IndexRef?.current.beginPerform()
  }

  const [outerScroll, setOuterScroll] = React.useState(false)

  React.useEffect(() => {
    if (props.enter) {
      setTimeout(() => {
        props.scroll()
        setOuterScroll(true)
      }, 5000)
    }
    if (props.finishLoadMark) {
      LoadingRef.current?.FinishLoad()
    }
  }, [props.enter, props.finishLoadMark])

  return (
    <div className={Styles.layout}>
      <Loading onRef={LoadingRef} onEnter={onEnter} />
      <React.Suspense>
        <div className="w100 h100 por">
          <StateBar />
          <IndexPage onRef={IndexRef} scroll={outerScroll} />
          <BottomText />
        </div>
      </React.Suspense>
    </div>
  )
}

export default connect(({ HasEnterStore }) => ({
  enter: HasEnterStore.hasEnter,
  finishLoadMark: HasEnterStore.finishLoad
}), { scroll })(Layout)
