import * as React from 'react'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import StateBar from './StateBar'
import Loading, { LoadingMethods } from './Loading'
import { connect } from 'react-redux'
import { scroll } from '@/store/hasEnter/action'

interface LayoutProps {
  enter: boolean
  scrollAble: boolean
  scroll: Function
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const LoadingRef = React.createRef<LoadingMethods>()
  const onEnter = () => {
  }

  const [outerScroll, setOuterScroll] = React.useState(false)

  React.useEffect(() => {
    if (props.enter) {
      setTimeout(() => {
        props.scroll()
        setOuterScroll(true)
      }, 5000)
    }
    setTimeout(() => {
      LoadingRef.current?.FinishLoad()
    }, 5000)
  }, [props.enter])
  return (
    <div className={Styles.layout}>
      <Loading onRef={LoadingRef} onEnter={onEnter} />
      <StateBar />
      <IndexPage scroll={outerScroll} />
    </div>
  )
}

export default connect(({ HasEnterStore }) => ({
  enter: HasEnterStore.hasEnter
}), { scroll })(Layout)
