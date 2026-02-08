import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Raycaster from './Raycaster.js'
import Resources from './Utils/Resources.js'
import Renderer from './Renderer.js'
import LoadingScreen from './LoadingScreen.js'
import PostProcessing from './PostProcessing.js'
import World from './World/World.js'

import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(webgl)
    {
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = webgl

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.raycaster = new Raycaster()
        this.renderer = new Renderer()
        this.loadingScreen = new LoadingScreen()
        this.postprocessing = new PostProcessing()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        this.postprocessing.resize()
    }

    update()
    {
        this.camera.update()
        this.raycaster.update()
        this.world.update()
        this.renderer.update()
        this.postprocessing.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse
        this.scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                for(const key in child.material)
                {
                    const value = child.material[key]

                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }

            console.log(child)
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        this.postprocessing.effectComposer.dispose()
        this.postprocessing.unrealBloomPass.dispose()
        
        this.debug.gui.destroy()
    }
}