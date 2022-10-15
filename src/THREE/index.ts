import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader'

import Tween from '@tweenjs/tween.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import g from '@/assets/images/gradient.png'

const _MODEL_PATH_ = [
  new URL('models/examples/AngularSphere.obj', import.meta.url).href,
  new URL('models/examples/cone.obj', import.meta.url).href
  // require("../../models/examples/cube.obj"),
  // require("../../models/examples/AngularSphere.obj"),
]

function getRangeRandom(e: number, t: number) {
  return Math.random() * (t - e) + e
}

type THREE_POINT = THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>

class ParticleSystem {
  private readonly CanvasWrapper: HTMLDivElement
  private readonly modelList: THREE_POINT[]
  private _LOAD_COUNT_: number
  private ModelPointer: number
  private maxParticlesCount: number
  private WIDTH: number
  private HEIGHT: number
  private scene?: THREE.Scene
  private camera?: THREE.PerspectiveCamera
  private renderer?: THREE.WebGLRenderer
  private readonly orbitControls?: OrbitControls
  private stats?: Stats
  private composer?: EffectComposer
  private PointMaterial?: THREE.PointsMaterial
  private AnimateEffectParticle?: THREE_POINT

  // 新编写的物体添加核心
  constructor(CanvasWrapper: HTMLDivElement) {
    this.CanvasWrapper = CanvasWrapper
    /* 宽高 */
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth
    /** 模型列表  */
    this.modelList = []
    /** 已加载的模型数量统计 */
    this._LOAD_COUNT_ = 0
    /** 模型指针 */
    this.ModelPointer = 0
    /** 载入模型中粒子的最大数量 */
    this.maxParticlesCount = 0
    // 创建场景
    this.createScene()
    // 性能监控插件
    this.initStats()
    // 载入模型
    this._addModels()
    // 效果器
    this.createEffect()
    // 轨道控制插件（鼠标拖拽视角、缩放等）
    this.orbitControls = new OrbitControls(
      this.camera!,
      this.renderer!.domElement
    )
    this.orbitControls.autoRotate = true
    // 循环更新渲染场景
    this.update()
  }

  createScene() {
    // 创建场景
    this.scene = new THREE.Scene()
    // 在场景中添加雾的效果，参数分别代表‘雾的颜色’、‘开始雾化的视线距离’、刚好雾化至看不见的视线距离’
    this.scene.fog = new THREE.FogExp2(328972, 5e-4)
    // 创建相机
    const aspectRatio = this.WIDTH / this.HEIGHT
    const fieldOfView = 100
    const nearPlane = 1
    const farPlane = 5e4

    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )

    // 设置相机的位置
    this.camera.position.x = 300
    this.camera.position.z = 0
    this.camera.position.y = 0

    // 坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(50)
    this.scene.add(axesHelper)
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      // 在 css 中设置背景色透明显示渐变色
      alpha: true
      // 开启抗锯齿
      // antialias: true,
    })
    // 自动清理，解决 bloomPass 效果器冲突
    this.renderer.autoClear = false
    // 渲染背景颜色同雾化的颜色
    this.renderer.setClearColor(this.scene.fog.color)
    // 定义渲染器的尺寸；在这里它会填满整个屏幕
    this.renderer.setSize(this.WIDTH, this.HEIGHT)

    // 打开渲染器的阴影地图
    this.renderer.shadowMap.enabled = true
    // this.renderer.shadowMapSoft = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // 在 HTML 创建的容器中添加渲染器的 DOM 元素
    this.CanvasWrapper.appendChild(this.renderer.domElement)
    // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener(
      'resize',
      this.handleWindowResize,
      false
    )
    window.addEventListener('dblclick', () => {
      this.changeModel()
    })
  }

  // 窗口大小变动时调用
  handleWindowResize = () => {
    // 更新渲染器的高度和宽度以及相机的纵横比
    this.HEIGHT = window.innerHeight
    this.WIDTH = window.innerWidth
    this.renderer?.setSize(this.WIDTH, this.HEIGHT)
    if (this.camera != null) {
      this.camera.aspect = this.WIDTH / this.HEIGHT
      this.camera.updateProjectionMatrix()
    }
  }

  // 性能监控
  initStats() {
    this.stats = Stats()
    if (this.stats != null) {
      // 将性能监控屏区显示在左上角
      this.stats.domElement.style.position = 'absolute'
      this.stats.domElement.style.bottom = '0px'
      this.stats.domElement.style.top = '0px'
      this.stats.domElement.style.zIndex = '100'
      this.CanvasWrapper.appendChild(this.stats.domElement)
    }
  }

  // 效果器
  createEffect() {
    this.composer = new EffectComposer(this.renderer!)
    const renderPass = new RenderPass(this.scene!, this.camera!)
    const bloomPass = new BloomPass(0.6)
    const filmPass = new FilmPass(0.5, 0.5, 1500, 0)
    const shaderPass = new ShaderPass(FocusShader)
    shaderPass.uniforms.screenWidth.value = window.innerWidth
    shaderPass.uniforms.screenHeight.value = window.innerHeight
    shaderPass.renderToScreen = true

    this.composer.addPass(renderPass)
    this.composer.addPass(bloomPass)
    this.composer.addPass(filmPass)
    this.composer.addPass(shaderPass)
  }

  // 添加模型
  _addModels() {
    const loader = new OBJLoader()
    this.PointMaterial = new THREE.PointsMaterial({
      // 粒子大小
      size: 1.5,
      // false:粒子尺寸相同 ;true：取决于摄像头远近
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      map: new THREE.TextureLoader().load(g)
    })
    // 读取预置列表
    for (const i of _MODEL_PATH_) {
      const finalGeometry = new THREE.BufferGeometry()
      let finalVertices = new Float32Array([])
      loader.load(i, (group) => {
        for (const i of group.children) {
          // @ts-expect-error 不知道是什么原因导致 ts 判断出错
          const arr = i.geometry.attributes.position.array
          finalVertices = new Float32Array([...finalVertices, ...arr])
        }
        finalGeometry.setAttribute('position', new THREE.BufferAttribute(finalVertices, 3))
        finalGeometry.scale(200, 200, 200)
        const FinalPoints = new THREE.Points(finalGeometry, this.PointMaterial)
        this.modelList.push(FinalPoints)
        this._LOAD_COUNT_++
        // 所有模型加载完后触发播放事件
        if (this._LOAD_COUNT_ === _MODEL_PATH_.length) this._finishLoadModal()
      })
    }
  }

  // 完成模型加载
  _finishLoadModal() {
    // 获得最大的粒子数量
    let maxParticlesCount = 0
    this.modelList.forEach(
      (val) => {
        maxParticlesCount = Math.max(maxParticlesCount, val.geometry.attributes.position.count)
      })

    this.maxParticlesCount = maxParticlesCount
    // 基于最大点构建一个动画载体
    const vertices = []
    for (let i = 0; i < maxParticlesCount; i++) {
      const x = getRangeRandom(-1 * 400, 400)
      const y = getRangeRandom(-1 * 400, 400)
      const z = getRangeRandom(-2 * 400, 400)
      vertices.push(x, y, z)
    }
    const AnimateEffectGeometry = new THREE.BufferGeometry()
    AnimateEffectGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3, false))
    this.AnimateEffectParticle = new THREE.Points(AnimateEffectGeometry, this.PointMaterial)
    this.scene?.add(this.AnimateEffectParticle)
  }

  changeModel() {
    if (this.ModelPointer === 1) {
      this.ModelPointer = 0
    } else {
      this.ModelPointer = 1
    }
    const targetModel = this.modelList[this.ModelPointer].geometry.getAttribute('position')
    // !使用断言
    const sourceModel = this.AnimateEffectParticle!.geometry.getAttribute('position')
    const arr = sourceModel.array
    for (let i = 0; i < this.maxParticlesCount; i++) {
      const tween = new Tween.Tween({ x: arr[i * 3], y: arr[i * 3 + 1], z: arr[i * 3 + 2] })
      const cur = i % targetModel.count
      tween.stop().to(
        {
          x: targetModel.array[cur * 3],
          y: targetModel.array[cur * 3 + 1],
          z: targetModel.array[cur * 3 + 2]
        },
        2000
      ).delay(2000 * Math.random()).easing(Tween.Easing.Exponential.In).start().onUpdate((o) => {
        sourceModel.setXYZ(i, o.x, o.y, o.z)
        sourceModel.needsUpdate = true
      })
    }
  }

  // 循环更新渲染
  update() {
    // 动画插件
    Tween.update()
    // 性能监测插件
    this.stats?.update()
    this.orbitControls?.update()
    // 渲染器执行渲染
    // this.renderer.render(this.scene, this.camera);
    // 效果器执行渲染，如果不需要效果器请使用上方的渲染模式
    this.composer!.render()
    // this.scene.rotation.y -= 0.01;
    // 循环调用
    requestAnimationFrame(() => {
      this.update()
    })
  }
}

export default ParticleSystem