import * as THREE from 'three'
import { ParticleModelProps } from '@/declare/THREE'
import kv from '@/assets/models/cpkv3'
import g from '@/assets/images/gradient.png'

import { addCnt } from '@/store/hasEnter/action'
import store from '@/store'
import isMobile from '@/utils/isMobile'

let q = 0
const texture = new THREE.TextureLoader().load(g)

const Models: ParticleModelProps[] = [{
  name: 'logo',
  path: new URL('../../assets/models/cpp.obj', import.meta.url).href,
  onLoadComplete(Geometry) {
    Geometry.rotateX(Math.PI * 0.5)
    if (isMobile()) {
      const s = 4500
      Geometry.scale(s, s, s)
      Geometry.translate(-510, -400, 0)
    } else {
      const s = 6000
      Geometry.scale(s, s, s)
      Geometry.translate(200, -650, 100)
    }
    store.dispatch(addCnt())
  },
  onEnterEnd(PointGeometry) {
    const m = PointGeometry.material
    /** @ts-expect-error */
    m.map = texture
  }
},
{
  name: 'kv',
  geometry: (() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(kv.vertices, 3))
    return g
  })(),
  onLoadComplete(Geometry) {
    const s = 200
    Geometry.scale(s, s, s)
    Geometry.translate(0, -1100, -1300)
    store.dispatch(addCnt())
  },
  onAnimationFrameUpdate(PerfromPoint, TweenList, g) {
    const p = PerfromPoint.geometry.getAttribute('position'); const sg = g.getAttribute('position')
    let a = 0
    TweenList.forEach((val, i) => {
      if (val.isPlaying === false) {
        a = Math.sqrt(Math.pow(val.x, 2) + Math.pow(val.z, 2))
        p.setY(i, (Math.sin(a / 70 + q) * a) / 30 + sg.getY(i))
        val.y = p.getY(i)
      }
    })
    p.needsUpdate = true
    q -= 0.015
  },
  onEnterEnd(PointGeometry) {
    const m = PointGeometry.material
    /** @ts-expect-error */
    m.map = texture
  }
},
{
  name: 'qr',
  path: new URL('../../assets/models/qr/qr1.obj', import.meta.url).href,
  onLoadComplete(Geometry) {
    const s = 100
    Geometry.scale(s, s, s)
    Geometry.rotateX(Math.PI * 0.5)
    Geometry.translate(0, 0, 500)
    store.dispatch(addCnt())
  },
  onEnterStart(PointGeometry) {
    const m = PointGeometry.material
    /** @ts-expect-error */
    m.map = null
  }
}]

export default Models
