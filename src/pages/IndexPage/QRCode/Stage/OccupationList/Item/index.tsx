import * as React from 'react'
import Styles from './index.module.scss'

type OccupationListItemProps = React.PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLDivElement>
}>

function OccupationListItem(props: OccupationListItemProps) {
  return (
    <div className={Styles.item} onClick={props.onClick}>
      <div className={Styles.text}>
        {props.children}
      </div>
    </div>
  )
}

export default OccupationListItem
