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

import { connect } from 'react-redux'

import Models from './Models'

interface IndexPageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  scrollAble: boolean
  scroll: boolean
  hasEnter: boolean
  onRef: React.Ref<any>
}

let couldScroll = false
let MainParticle: ParticleSystem | null = null
let changing = true

function IndexPage(props: IndexPageProps) {
  const wrapper = useRef<HTMLDivElement | null>(null)
  let swiperObj: SwiperClass

  // @ts-expect-error
  window.changeModel = (name: string) => {
    if (MainParticle != null) {
      MainParticle.ChangeModel(name)
    }
  }
  function getSwiper(swiper: SwiperClass) { swiperObj = swiper }
  function slideNext() { swiperObj?.slideNext() }
  function slidePrev() { swiperObj?.slidePrev() }
  function beginPerform() {
    MainParticle!.AnimateEffectParticle!.rotation.y = -3.14 * 0.8
    new Tween.Tween(MainParticle!.AnimateEffectParticle!.rotation).to({ y: 0 }, 10000).easing(Tween.Easing.Quintic.Out).start()
    setTimeout(() => {
      MainParticle?.ChangeModel('logo', 1500)
      setTimeout(() => {
        changing = false
      }, 1500)
    }, 1500)
  }
  let flag = true; let hasListen = false
  const t = (e: WheelEvent) => {
    if (couldScroll && flag) {
      flag = false
      e.deltaY > 0 ? slideNext() : slidePrev()
      setTimeout(() => {
        flag = true
      }, 2000)
    }
  }

  React.useImperativeHandle(props.onRef, () => {
    return {
      beginPerform
    }
  })

  useEffect(() => {
    if (props.scrollAble && props.scroll) couldScroll = true
    if (!hasListen) {
      window.addEventListener('wheel', t)
      hasListen = true
    }
    if ((MainParticle == null) && wrapper.current != null) {
      MainParticle = new ParticleSystem({
        CanvasWrapper: wrapper.current,
        Models
      })
    }
  })

  return (
    <>
      <div className={Styles.canvas_wrapper} ref={wrapper}></div>
      <div className={`${Styles.index_page} ${props.scroll ? '' : Styles.hidden}`}>
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
              if (!changing && isActive) MainParticle?.ChangeModel('logo', 1500)
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
              if (!changing && isActive) MainParticle?.ChangeModel('kv', 1500)
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
    </>
  )
}

export default connect(({ HasEnterStore }) => ({
  scrollAble: HasEnterStore.scrollAble,
  hasEnter: HasEnterStore.hasEnter
}), {})(IndexPage)
