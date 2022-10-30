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
                  enter: 'poa',
                  exit: 'poa',
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
