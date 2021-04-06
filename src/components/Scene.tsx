import React from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import './Scene.css';

export class Scene extends React.Component {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera

  private sun: THREE.Vector3
  private ocean: Water
  private sky: Sky
  private pmremGenerator: THREE.PMREMGenerator

  private sunParams = {
    inclination: 0.492,
    azimuth: 0.220
  }

  private mouseX: number
  private mouseY: number

  constructor(props: any) {
    super(props)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.animate = this.animate.bind(this)
  }

  public componentDidMount() {
    window.addEventListener('load', this.handleOnLoad)
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  public componentWillUnmount() {
    window.removeEventListener('load', this.handleOnLoad);
    window.addEventListener('resize', this.handleWindowResize)
  }

  private handleOnLoad() {
    const sceneContainer = document.getElementById("scene-container")
    if (sceneContainer) {
      this.initializeRenderer(sceneContainer)
      this.setupScene()
      this.animate()
    }
  }

  private handleWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private handleMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX
    this.mouseY = event.clientY
  }

  private initializeRenderer(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(this.renderer.domElement)
  }

  private setupScene() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000)
    this.camera.position.set(30, 30, 100)

    this.sun = new THREE.Vector3()

    this.initializeOcean()
    this.initializeSky()
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    this.updateSun()
  }

  private initializeOcean() {
    const oceanGeometry = new THREE.PlaneGeometry(10000, 10000)
    this.ocean = new Water(oceanGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined,
      waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', (texture: THREE.Texture) => {
        // On texture load
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      })
    })
    this.ocean.rotation.x = -Math.PI / 2
    this.scene.add(this.ocean)
  }

  private initializeSky() {
    this.sky = new Sky()
    this.sky.scale.setScalar(10000)
    this.scene.add(this.sky)

    const skyUniforms = this.sky.material.uniforms
    skyUniforms['turbidity'].value = 10
    skyUniforms['rayleigh'].value = 2
    skyUniforms['mieCoefficient'].value = 0.005
    skyUniforms['mieDirectionalG'].value = 0.8
  }

  private updateSun() {
    const theta = Math.PI * (this.sunParams.inclination - 0.5)
    const phi = 2 * Math.PI * (this.sunParams.azimuth - 0.5)

    this.sun.x = Math.cos(phi)
    this.sun.y = Math.sin(phi) * Math.sin(theta)
    this.sun.z = Math.sin(phi) * Math.cos(theta)

    this.sky.material.uniforms['sunPosition'].value = this.sun;
    (this.ocean.material as THREE.ShaderMaterial).uniforms['sunDirection'].value = this.sun.normalize()

    this.scene.environment = this.pmremGenerator.fromScene(this.sky as any).texture
  }

  private animate() {
    requestAnimationFrame(this.animate)
    this.renderFrame()
  }

  private renderFrame() {
    this.camera.rotation.x = (this.mouseY * 0.0001) * -1;
    this.camera.rotation.y = (this.mouseX * 0.0001) * -1;
    (this.ocean.material as THREE.ShaderMaterial).uniforms['time'].value += 1.0 / 60.0

    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (<div id="scene-container"></div>);
  }
}
