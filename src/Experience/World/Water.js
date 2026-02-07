import * as THREE from 'three'
import Experience from '../Experience.js'

// Shaders
import waterVertexShader from '/src/shaders/water/vertex.glsl'
import waterFragmentShader from '/src/shaders/water/fragment.glsl'

export default class Water {

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.debugObject = {}
        this.debugFolder = this.debug.gui.addFolder('water')

        this.debugObject.waterColorOut = '#d6d6d6'
        this.debugObject.waterColorIn = '#adadad'

        this.setMesh()
        this.setDebug()
    }

    setMesh()
    {
        this.waterMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(40, 40, 128, 128),
            new THREE.ShaderMaterial({
                vertexShader: waterVertexShader,
                fragmentShader: waterFragmentShader,
                uniforms: {
                    uTime: { value: 0},
                    uFrequency: { value: new THREE.Vector2(10, 5)},
                    uColorOut: { value: new THREE.Color('#d6d6d6')},
                    uColorIn: { value: new THREE.Color('#adadad')},
                }
            })
        )
        this.scene.add(this.waterMesh)
        this.waterMesh.rotation.x = - Math.PI / 2
        this.waterMesh.position.y = 0.125
        this.waterMesh.position.z = -5

        this.count = this.waterMesh.geometry.attributes.position.count
        this.randoms = new Float32Array(this.count)

        for(let i = 0; i < this.count; i++)
        {
            this.randoms[i] = Math.random()
        }

        this.waterMesh.geometry.setAttribute('aRandom', new THREE.BufferAttribute(this.randoms, 1))
    }

    setDebug()
    {
        this.debugFolder
        .addColor(this.debugObject, 'waterColorOut')
        .onChange(() => 
        {
            this.waterMesh.material.uniforms.uColorOut.value.set(this.debugObject.waterColorOut)
        })

        this.debugFolder
        .addColor(this.debugObject, 'waterColorIn')
        .onChange(() => 
        {
            this.waterMesh.material.uniforms.uColorIn.value.set(this.debugObject.waterColorIn)
        })
    }

    update()
    {
        this.waterMesh.material.uniforms.uTime.value += this.time.delta * 0.0025
    }
}