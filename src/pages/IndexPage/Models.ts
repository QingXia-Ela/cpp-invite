import * as THREE from 'three'
import { ParticleModelProps } from '@/declare/THREE'
import kv from '@/assets/models/cpkv3'

import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier'

let q = 0

const Models: ParticleModelProps[] = [{
  name: 'logo',
  path: new URL('../../assets/models/cpp.obj', import.meta.url).href,
  onLoadComplete(Geometry) {
    const s = 6000
    Geometry.scale(s, s, s)
    Geometry.rotateX(Math.PI * 0.5)
    Geometry.translate(200, -650, 100)
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
    Geometry.translate(0, -950, -1200)
  },
  onAnimationFrameUpdate(PerfromPoint, TweenList, g) {
    const p = PerfromPoint.geometry.getAttribute('position'); const sg = g!.getAttribute('position')
    let a = 0
    let s = 0
    TweenList.forEach((val, i) => {
      if (val.isPlaying === false) {
        a = Math.sqrt(Math.pow(val.x, 2) + Math.pow(val.z, 2))
        s = p.getY(i)
        p.setY(i, (Math.sin(a / 70 + q) * a) / 30 + sg.getY(i))
        val.y = p.getY(i)
      }
    })
    p.needsUpdate = true
    q -= 0.015
  }
}]

export default Models
