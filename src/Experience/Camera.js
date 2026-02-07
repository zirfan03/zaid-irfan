import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import Experience from './Experience.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.debugFolder = this.debug.gui.addFolder('camera')

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 500)
        this.instance.position.set(0, 3.5, 4.5)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.025
        this.controls.enablePan = false
        this.controls.maxAzimuthAngle = Math.PI * 0.125
        this.controls.minAzimuthAngle = - Math.PI * 0.125
        this.controls.maxPolarAngle = Math.PI * 0.375
        this.controls.minPolarAngle = - Math.PI * 0.375
        this.controls.maxDistance = 6.25
        this.controls.minDistance = 4

        this.debugFolder
        .add(this.controls, 'enablePan')
        .name('cameraPanning')
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}