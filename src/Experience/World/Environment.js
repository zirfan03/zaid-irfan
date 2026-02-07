import * as THREE from 'three'
import Experience from  '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.scene.background = new THREE.Color( '#060505')

        // Debug
        this.debugFolder = this.debug.gui.addFolder('environment')

        this.setSunLight()
    }

    setSunLight()
    {
        this.sunLight = new THREE.AmbientLight('#ffffff', 5)
        this.scene.add(this.sunLight)

        this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)
    }
}