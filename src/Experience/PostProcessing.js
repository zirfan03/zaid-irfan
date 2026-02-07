import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/Addons.js'
import { RenderPass } from 'three/examples/jsm/Addons.js'
import { UnrealBloomPass } from 'three/examples/jsm/Addons.js'
import Experience from './Experience.js'

export default class PostProcessing {

    constructor()
    {
        this.experience = new Experience()
        this.renderer = this.experience.renderer
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug

        this.debugFolder = this.debug.gui.addFolder('post processing')

        // Setup
        this.effectComposer = new EffectComposer(this.renderer.instance)
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)

        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.effectComposer.addPass(this.renderPass)

        this.unrealBloomPass = new UnrealBloomPass()
        this.effectComposer.addPass(this.unrealBloomPass)
        this.unrealBloomPass.strength = 0.25
        this.unrealBloomPass.radius = 1
        this.unrealBloomPass.threshold = 0.5

        this.debugFolder.add(this.unrealBloomPass, 'enabled')
        this.debugFolder.add(this.unrealBloomPass, 'strength').min(0).max(2).step(0.0001)
        this.debugFolder.add(this.unrealBloomPass, 'radius').min(0).max(2).step(0.0001)
        this.debugFolder.add(this.unrealBloomPass, 'threshold').min(0).max(1).step(0.0001)
    }

    resize()
    {
        this.effectComposer.setSize(this.sizes.width, this.sizes.height)
        this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.effectComposer.render()
    }
}