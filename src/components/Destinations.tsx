import React from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../styles/Destinations.css';

export class Destinations extends React.Component {

  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls

  private globeContainer: HTMLElement
  private innerWidth = 1
  private innerHeight = 1

  private earthMesh: THREE.Mesh

  constructor(props: any) {
    super(props)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
    this.animate = this.animate.bind(this)
  }

  public componentDidMount() {
    window.addEventListener('load', this.handleOnLoad)
    window.addEventListener('resize', this.handleWindowResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('load', this.handleOnLoad);
    window.removeEventListener('resize', this.handleWindowResize)
  }

  private handleOnLoad() {
    const container = document.getElementById("globe-container")
    if (container) {
      this.globeContainer = container
      this.initializeRenderer()
      this.setupScene()
      this.setupLights()
      this.initializeEarth()
      this.animate()
    }
  }

  private handleWindowResize() {
    this.updateGlobeContainerDimensions()

    this.camera.aspect = this.innerWidth / this.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(this.innerWidth, this.innerHeight)
  }

  private initializeRenderer() {
    this.updateGlobeContainerDimensions()
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.innerWidth, this.innerHeight)
    this.globeContainer.appendChild(this.renderer.domElement)
  }

  private updateGlobeContainerDimensions() {
    const { width, height } = this.globeContainer.getBoundingClientRect()
    this.innerWidth = width
    this.innerHeight = height
  }

  private setupScene() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, this.innerWidth / this.innerHeight, 0.01, 5)
    this.camera.position.set(0, 0, 2)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.minDistance = .6
    this.controls.maxDistance = 5
    this.controls.enableDamping = true
    this.controls.update()
  }

  private initializeEarth() {
    const textureLoader = new THREE.TextureLoader()
    const earthGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('textures/earth-albedo.jpg'),
      bumpMap: textureLoader.load('textures/earth-bump.jpg'),
      bumpScale: .8,
      specularMap: textureLoader.load('textures/earth-specular.jpg'),
    })
    this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
    this.scene.add(this.earthMesh)
  }

  private setupLights() {
    const xCoords = [2, -2]
    const yCoords = [2, -2]
    const zCoords = [2, -2]

    xCoords.forEach((x: number) => {
      yCoords.forEach((y: number) => {
        zCoords.forEach((z: number) => {
          const pointLight = new THREE.PointLight(0xffffff, .5)
          pointLight.position.set(x, y, z)
          this.scene.add(pointLight)
        })
      })
    })
  }

  private animate() {
    requestAnimationFrame(this.animate)
    this.renderFrame()
  }

  private renderFrame() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div className="destinations-container">
        <span className='title'>Destinations</span>
        <div className="destinations-content">
          <div id="globe-container"></div>
          <div className="info-container">Info</div>
        </div>
      </div>
    )
  }
}