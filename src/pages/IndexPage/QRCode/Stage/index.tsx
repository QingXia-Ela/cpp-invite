import * as React from 'react'
import Styles from './index.module.scss'
import OccupationList from './OccupationList'
import DetailQRCode from './DetailQRCode'
import { CSSTransition } from 'react-transition-group'

import { connect } from 'react-redux'
import { changeOccupation } from '@/store/occupation/action'

function Stage(props: any) {
  const [ol, changeOl] = React.useState(Styles.o1)
  const [dl, changeDl] = React.useState(Styles.o0)
  return (
    <div className={Styles.stage}>
      <div className="w100 h100 por">
        <CSSTransition
          in={props.occupation === null}
          timeout={1500}
          classNames={{
            enterActive: Styles.enter,
            exitActive: Styles.exit
          }}
          onEntered={() => {
            changeOl(Styles.o1)
          }}
          onExit={() => {
            changeOl(Styles.o0)
          }}
          unmountOnExit
        >
          <OccupationList className={ol} />
        </CSSTransition>
        <CSSTransition
          in={props.occupation !== null}
          timeout={1500}
          classNames={{
            enterActive: Styles.enter,
            exitActive: Styles.exit
          }}
          onEntered={() => {
            changeDl(Styles.o1)
          }}
          onExit={() => {
            changeDl(Styles.o0)
          }}
          unmountOnExit
        >
          <DetailQRCode className={dl} />
        </CSSTransition>
      </div>
    </div>
  )
}

export default connect(({ OccupationStore }) => ({
  occupation: OccupationStore.occupation
}), {
  changeOccupation
})(Stage)
