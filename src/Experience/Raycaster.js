import * as THREE from 'three'
import Experience from './Experience.js'

export default class Raycaster {

    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera

        // Setup
        this.pointer = new THREE.Vector2()

        window.addEventListener("mousemove", (event) => 
        {
            this.pointer.x = (event.clientX / this.sizes.width) * 2 - 1
            this.pointer.y = - (event.clientY / this.sizes.height) * 2 + 1
        })


        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.Raycaster()
    }

    update()
    {
        this.instance.setFromCamera(this.pointer, this.camera.instance)
    }
}