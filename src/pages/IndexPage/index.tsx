import * as React from 'react'
import Styles from './index.module.scss'
import ParticleSystem from '@/THREE'
import { useEffect, useRef } from 'react'
import AtmosphereParticle from '@/THREE/atmosphere'
import { ParticleModelProps } from '@/declare/THREE'
import * as THREE from 'three'
import Tween from '@tweenjs/tween.js'
import type SwiperClass from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Congralution from './Congralution'
import QRCode from './QRCode'
import { CSSTransition } from 'react-transition-group'

function IndexPage() {
  const wrapper = useRef<HTMLDivElement | null>(null)
  const MainParticle: ParticleSystem | null = null
  let swiperObj: SwiperClass

  const TurnBasicNum = { firefly: 0.002 }
  const al = 1500

  const tween2 = new Tween.Tween(TurnBasicNum).easing(Tween.Easing.Exponential.In)
  const tween1 = new Tween.Tween(TurnBasicNum).easing(Tween.Easing.Exponential.In)
  /*
  const Atomsphere1 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 500,
    renderUpdate: (Point) => {
      Point.rotation.x -= TurnBasicNum.firefly
    },
    callback: (Point) => {
      Point.position.z = -1 * al
    },
    onChangeModel: () => {
      tween2.stop()
      tween1.stop().to({ firefly: 0.04 }, 1500).chain(tween2)
      tween2.to({ firefly: 0.002 }, 1500)
      tween1.start()
    }
  })
  const Atomsphere2 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 500,
    renderUpdate: (Point) => {
      Point.rotation.y += TurnBasicNum.firefly
    },
    callback: (Point) => {
      Point.position.y = -0.2 * al
      Point.position.z = -1 * al
    }
  })
  const Atomsphere3 = new AtmosphereParticle({
    longestDistance: al,
    particleSum: 500,
    renderUpdate: (Point) => {
      Point.rotation.z += TurnBasicNum.firefly / 2
    },
    callback: (Point) => {
      Point.position.z = -1.2 * al
    }
  })
*/
  /*
  const Models: ParticleModelProps[] = [
    {
      name: 'ball',
      path: new URL('../../THREE/models/examples/ball.obj', import.meta.url).href,
      onLoadComplete(Geometry) {
        const s = 620
        Geometry.scale(s, s, s)
        Geometry.rotateX(Math.PI * 0.35)
        Geometry.rotateY(Math.PI * -0.06)
        Geometry.rotateZ(Math.PI * -0.1)
        Geometry.translate(-600, 100, -200)
        // MainParticle?.ListenMouseMove()
      }
    },
    {
      name: 'cpp',
      path: new URL('../../THREE/models/cpp.obj', import.meta.url).href,
      onLoadComplete(Geometry) {
        const s = 5000
        Geometry.scale(s, s, s)
        Geometry.rotateX(Math.PI * 0.5)
        Geometry.translate(-1200, -600, 0)
        console.log(Geometry.getAttribute('position').count)
      }
    }
  ]
  */
  // @ts-expect-error
  window.changeModel = (name: string) => {
    if (MainParticle != null) {
      // MainParticle.ChangeModel(name)
    }
  }
  function getSwiper(swiper: SwiperClass) { swiperObj = swiper }
  function slideNext() { swiperObj.slideNext() }
  function slidePrev() { swiperObj.slidePrev() }
  let flag = true
  const t = (e: WheelEvent) => {
    if (flag) {
      flag = false
      e.deltaY > 0 ? slideNext() : slidePrev()
      setTimeout(() => {
        flag = true
      }, 800)
    }
  }

  useEffect(() => {
    window.addEventListener('wheel', t)
  }, [])

  return (
    <div className={Styles.index_page}>
      <div className={Styles.canvas_wrapper} ref={wrapper}></div>
      <Swiper
        className={Styles.main_swiper + ' swiper-no-swiping'}
        slidesPerView={1}
        speed={800}
        direction='vertical'
        mousewheel={true}
        noSwiping={true}
        onSwiper={getSwiper}
      >
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <CSSTransition
                in={isActive}
                timeout={1500}
                classNames={{
                  enterActive: Styles.o0,
                  enterDone: Styles.o1,
                  exitActive: Styles.o0
                }}
              >
                <Congralution />
              </CSSTransition>
            )
          }}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => {
            return (
              <CSSTransition
                in={isActive}
                timeout={1500}
                classNames={{
                  enterActive: Styles.o0,
                  enterDone: Styles.o1,
                  exitActive: Styles.o0
                }}
              >
                <QRCode />
              </CSSTransition>
            )
          }}
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default IndexPage
