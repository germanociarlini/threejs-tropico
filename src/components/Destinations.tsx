import React from "react";
import * as THREE from 'three';
import '../styles/Destinations.css';

export class Destinations extends React.Component {

  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera

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
    this.camera = new THREE.PerspectiveCamera(55, this.innerWidth / this.innerHeight, 0.1, 5)
    this.camera.position.set(0, 0, 2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(ambientLight)
  }

  private initializeEarth() {
    const textureLoader = new THREE.TextureLoader()
    const earthGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('textures/earth-albedo.jpg'),
      bumpMap: textureLoader.load('textures/earth-bump.jpg'),
      specularMap: textureLoader.load('textures/earth-specular.jpg')
    })
    this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial)
    this.scene.add(this.earthMesh)
  }

  private animate() {
    requestAnimationFrame(this.animate)
    this.renderFrame()
  }

  private renderFrame() {
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