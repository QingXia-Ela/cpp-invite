import * as React from 'react'
import Styles from './index.module.scss'
import ParticleSystem from '@/THREE'
import { useEffect, useRef } from 'react'
import Tween from '@tweenjs/tween.js'
import type SwiperClass from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Congralution from './Congralution'
import QRCode from './QRCode'
import Atomsphere from './Atomsphere'
import { CSSTransition } from 'react-transition-group'

import { connect } from 'react-redux'

import Models from './Models'
import { setParticleContext } from '@/store/particle/action'
import { changeOccupation } from '@/store/occupation/action'

interface IndexPageProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  scrollAble: boolean
  scroll: boolean
  hasEnter: boolean
  occupation: string | null
  onRef: React.Ref<any>
  setParticleContext: Function
  changeOccupation: Function
}

let couldScroll = false
let MainParticle: ParticleSystem | null = null

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
        Models,
        addons: Atomsphere
      })
      props.setParticleContext(MainParticle)
    }
  })

  function onSlideChange(swiper: SwiperClass) {
    if (swiper.activeIndex === 0) MainParticle?.ChangeModel('logo', 1500)
    else if (swiper.activeIndex === 1) {
      MainParticle?.ChangeModel('kv', 1500)
      props.changeOccupation(null)
    }
  }

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
          onSlideChange={onSlideChange}
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
    </>
  )
}

export default connect(({ HasEnterStore, OccupationStore }) => ({
  scrollAble: HasEnterStore.scrollAble,
  hasEnter: HasEnterStore.hasEnter,
  occupation: OccupationStore.occupation
}), {
  setParticleContext,
  changeOccupation
})(IndexPage)
