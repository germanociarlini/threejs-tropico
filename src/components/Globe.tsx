import React from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../styles/Globe.css';
import { Location } from "../types";
import { MathUtils } from "../utils/MathUtils";

export class Globe extends React.Component {

  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private controls: OrbitControls
  private earthMesh: THREE.Mesh

  private locations: Location[]

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
      this.initializeRenderer(container)
      this.setupScene()
      this.setupLights()
      this.initializeEarth()
      this.fetchLocations()
      this.animate()
    }
  }

  private handleWindowResize() {
    const innerWidth = this.renderer.domElement.clientWidth
    const innerHeight = this.renderer.domElement.clientHeight

    this.camera.aspect = innerWidth / innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(innerWidth, innerHeight)
  }

  private initializeRenderer(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)
  }

  private setupScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x00ff00)
    this.camera = new THREE.PerspectiveCamera(55, this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight, 0.01, 5)
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
    // ref: https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_fly.html
    const earthMaterial = new THREE.MeshPhongMaterial({
      specular: 0x333333,
      shininess: 15,
      map: textureLoader.load("textures/earth_atmos_2048.jpg"),
      specularMap: textureLoader.load("textures/earth_specular_2048.jpg"),
      normalMap: textureLoader.load("textures/earth_normal_2048.jpg"),

      // y scale is negated to compensate for normal map handedness.
      normalScale: new THREE.Vector2(0.85, - 0.85)
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
          const pointLight = new THREE.PointLight(0xffffff, .7)
          pointLight.position.set(x, y, z)
          this.scene.add(pointLight)
        })
      })
    })
  }

  private async fetchLocations() {
    const response = await (await fetch('locations.json')).json()
    this.locations = response.locations
    this.locations.forEach((location: Location) => {
      this.initializePointOfInterest(location.coordinates.latitude, location.coordinates.longitude)
    })
  }

  private initializePointOfInterest(latitude: number, longitude: number) {
    const coord = MathUtils.latAndLongToSphereSurface(latitude, longitude, .5)
    const coordGeometry = new THREE.SphereBufferGeometry(.005)
    const coordMaterial = new THREE.MeshBasicMaterial({
      color: 'orange'
    })

    const coordMesh = new THREE.Mesh(coordGeometry, coordMaterial)
    coordMesh.position.set(coord.x, coord.y, coord.z)
    this.scene.add(coordMesh)
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
      <div id="globe-container"></div>
    )
  }
}