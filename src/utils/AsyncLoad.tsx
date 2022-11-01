import * as React from 'react'
import Loadable from 'react-loadable'

export default (loader: any) => {
  return Loadable<any, any>({
    loader,
    loading() {
      return (<div> 正在加载组件</div>)
    },
    delay: 200
  })
}
