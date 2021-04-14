import React from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LocationContext } from "../contexts/LocationContext";
import '../styles/Globe.css';
import { Location } from "../types";
import { MathUtils } from "../utils/MathUtils";

export class Globe extends React.Component {

  public static contextType = LocationContext

  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera

  private minZoomAllowed = 3
  private maxZoomAllowed = .6
  private minZoomScale = 4
  private maxZoomScale = .6

  private controls: OrbitControls
  private earthMesh: THREE.Mesh

  private raycaster: THREE.Raycaster
  private mouseCoords: THREE.Vector2

  private locationsGroup: THREE.Group
  private locations: Location[]

  constructor(props: any) {
    super(props)
    this.raycaster = new THREE.Raycaster()
    this.mouseCoords = new THREE.Vector2()
    this.locationsGroup = new THREE.Group()
    this.animate = this.animate.bind(this)
  }

  public componentDidMount() {
    window.addEventListener('load', this.handleOnLoad)
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('mousemove', this.handleOnMouseMove)
    window.addEventListener('click', this.handleOnMouseClick)
  }

  public componentWillUnmount() {
    window.removeEventListener('load', this.handleOnLoad);
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('mousemove', this.handleOnMouseMove)
    window.removeEventListener('click', this.handleOnMouseClick)
  }

  private handleOnLoad = () => {
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

  private handleWindowResize = () => {
    const { width, height } = this.renderer.domElement.getBoundingClientRect()

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }

  private handleOnMouseMove = (event: MouseEvent) => {
    if (this.renderer.domElement) {
      const rect = this.renderer.domElement.getBoundingClientRect()
      this.mouseCoords.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      this.mouseCoords.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1
    }
  }

  private handleOnMouseClick = () => {
    this.raycaster.setFromCamera(this.mouseCoords, this.camera)
    const intersects = this.raycaster.intersectObjects(this.locationsGroup.children);
    if (intersects[0]) {
      const selectedLocation = this.locations.find((location: Location) => location.id === intersects[0].object.userData.id)
      if (selectedLocation) {
        this.context.setSelectedLocation(selectedLocation)
        return
      }
    }
    this.context.setSelectedLocation(null)
  }

  private initializeRenderer(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(this.renderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('textures/space-skybox.jpg', () => {
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(texture.image.height)
      cubeRenderTarget.fromEquirectangularTexture(this.renderer, texture)
      this.scene.background = cubeRenderTarget.texture
    })
  }

  private setupScene() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight, 0.01, 5)
    this.camera.position.set(0, 0, 2)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.minDistance = this.maxZoomAllowed
    this.controls.maxDistance = this.minZoomAllowed
    this.controls.enableDamping = false
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
      normalScale: new THREE.Vector2(0.85, - 0.85) // y scale is negated to compensate for normal map handedness.
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
      this.initializeLocation(location)
    })
    this.scene.add(this.locationsGroup)
  }

  private initializeLocation(location: Location) {
    const { latitude, longitude } = location.coordinates
    const coord = MathUtils.latAndLongToSphereSurface(latitude, longitude, .5)
    const coordGeometry = new THREE.SphereBufferGeometry(.005)
    const coordMaterial = new THREE.MeshBasicMaterial({
      color: 'orange'
    })

    const coordMesh = new THREE.Mesh(coordGeometry, coordMaterial)
    coordMesh.position.set(coord.x, coord.y, coord.z)
    coordMesh.userData.id = location.id
    this.locationsGroup.add(coordMesh)
  }

  private animate() {
    requestAnimationFrame(this.animate)
    this.renderFrame()
  }

  private renderFrame() {
    this.raycaster.setFromCamera(this.mouseCoords, this.camera)
    const intersects = this.raycaster.intersectObjects(this.locationsGroup.children);
    const cameraZoom = this.camera.position.distanceTo(this.earthMesh.position)
    const linearScale = this.minZoomScale + (this.maxZoomScale - this.minZoomScale) * (cameraZoom - this.minZoomAllowed) / (this.maxZoomAllowed - this.minZoomAllowed);
    (this.locationsGroup.children as THREE.Mesh[]).forEach((coordMesh: THREE.Mesh) => {
      (coordMesh.material as THREE.MeshBasicMaterial).color.set('orange')
      coordMesh.scale.set(linearScale, linearScale, linearScale)
    })
    if (intersects[0]) {
      ((intersects[0].object as THREE.Mesh).material as THREE.MeshBasicMaterial).color.set(0xff00ff);
      (intersects[0].object as THREE.Mesh).scale.multiplyScalar(1.2)
    }
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div id="globe-container"></div>
    )
  }
}