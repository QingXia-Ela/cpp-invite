import * as React from 'react'
import * as THREE from 'three'
import Styles from './index.module.scss'
import IndexPage from '@/pages/IndexPage'
import StateBar from './StateBar'
import Loading, { LoadingMethods } from './Loading'

const listener = new THREE.AudioListener()
const sound = new THREE.Audio(listener)
const audioLoader = new THREE.AudioLoader()
audioLoader.load(new URL('../assets/audio/bgm.mp3', import.meta.url).href, (buffer) => {
  sound.setBuffer(buffer)
  sound.setLoop(true)
  sound.setVolume(0.2)
})

function Layout() {
  const LoadingRef = React.createRef<LoadingMethods>()

  const onEnter = () => {
    sound.play()
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
