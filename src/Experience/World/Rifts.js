import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience.js'

// Shaders
import portalVertexShader from '/src/shaders/portal/vertex.glsl'
import portalFragmentShader from '/src/shaders/portal/fragment.glsl'

export default class Rifts
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.raycaster = this.experience.raycaster

        this.currentIntersect = this.raycaster.currentIntersect

        // Setup
        this.resource = this.resources.items.sceneModel

        this.setModel()
        this.setTextures()
        this.setMaterial()
        this.setModalAnimations()
        this.setModalMenus()
        this.setWorkDescriptions()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)

        this.portal1Mesh = this.model.children[2]
        this.portal2Mesh = this.model.children[1]
        this.portal3Mesh = this.model.children[0]
        this.bakeGroup1 = this.model.children[3]
        this.bakeGroup2 = this.model.children[4]
        this.bakeGroup3 = this.model.children[5]
    }

    setTextures()
    {
        this.textures = {}

        this.textures.bake1 = this.resources.items.bakeTexture1
        this.textures.bake1.flipY = false
        this.textures.bake1.colorSpace = THREE.SRGBColorSpace

        this.textures.bake2 = this.resources.items.bakeTexture2
        this.textures.bake2.flipY = false
        this.textures.bake2.colorSpace = THREE.SRGBColorSpace

        this.textures.bake3 = this.resources.items.bakeTexture3
        this.textures.bake3.flipY = false
        this.textures.bake3.colorSpace = THREE.SRGBColorSpace

    }

    setMaterial()
    {
        // Emissives


        this.portal1Mesh.material = new THREE.ShaderMaterial ({
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColorOut: { value: new THREE.Color('#ffffff')},
                uColorIn: { value: new THREE.Color('#000000')}
            }
        })

        this.portal2Mesh.material = new THREE.ShaderMaterial ({
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColorOut: { value: new THREE.Color('#ffffff')},
                uColorIn: { value: new THREE.Color('#000000')}
            }
        })

        this.portal3Mesh.material = new THREE.ShaderMaterial ({
            vertexShader: portalVertexShader,
            fragmentShader: portalFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColorOut: { value: new THREE.Color('#ffffff')},
                uColorIn: { value: new THREE.Color('#000000')}
            },

        })

        // Static

        this.bakeGroup1.material = new THREE.MeshBasicMaterial ({
            map: this.textures.bake1
        })

        this.bakeGroup2.material = new THREE.MeshBasicMaterial ({
            map: this.textures.bake2
        })

        this.bakeGroup3.material = new THREE.MeshBasicMaterial ({
            map: this.textures.bake3
        })
    }

    setModalMenus()
    {

        this.modals = {
            work: document.querySelector(".modal.work") ,
            info: document.querySelector(".modal.info")
        }

        this.journalLink = "https://www.are.na/share/mCOIQOv"

        this.isModalOpen = false
    }

    setModalAnimations()
    {
        this.showModal = (modal) => {

            this.isModalOpen = true
            
            modal.style.display = "block"
            document.body.style.cursor = "default"
            this.experience.camera.controls.enabled = false

            gsap.set(modal,
                {
                    opacity: 0
                }
            )

            gsap.to(modal, 
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.inOut"
                }
             )
        }

        this.hideModal = (modal) => {
            gsap.to(modal, 
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                    onComplete: () => {
                        modal.style.display = "none"
                        this.isModalOpen = false
                        this.experience.camera.controls.enabled = true
                    }
                }
            )
        }

        this.currentIntersect = null

        window.addEventListener('click', () =>
        {
            if(this.isModalOpen) return

            if(this.currentIntersect)
            {
                switch(this.currentIntersect.object)
                {
                case this.portal1Mesh:
                    this.showModal(this.modals.work)
                    break

                case this.portal2Mesh:
                    this.newWindow = window.open(this.journalLink)
                    this.newWindow.opener = null
                    this.newWindow.location = url
                    this.newWindow.target = "_blank"
                    this.newWindow.rel = "noopener noreferrer"
                    break

                case this.portal3Mesh:
                    this.showModal(this.modals.info)
                    break
                }
            }
        })

        document.querySelectorAll(".exit-button").forEach(button => 
        {
            button.addEventListener('click', (event) => {
                this.modal = event.target.closest(".modal")
                this.hideModal(this.modal)
            })
        })
    }

    setWorkDescriptions()
    {
        this.showViewer = (viewer) => {
            
            viewer.style.display = "block"

            gsap.set(viewer,
                {
                    opacity: 0
                }
            )

            gsap.to(viewer, 
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.inOut"
                }
             )
        }

        this.hideViewer = (viewer) => {
            gsap.to(viewer, 
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                    onComplete: () => {
                        viewer.style.display = "none"
                    }
                }
            )
        }

        this.projectViewers = {
            project1View: document.querySelector(".works-viewer.work1"),
            project2View: document.querySelector(".works-viewer.work2"),
            project3View: document.querySelector(".works-viewer.work3"),
            project4View: document.querySelector(".works-viewer.work4"),
            project5View: document.querySelector(".works-viewer.work5"),
            project6View: document.querySelector(".works-viewer.work6")
        }

        this.projectBtns = {
            project1Btn: document.querySelector(".works-nav-list.work1"),
            project2Btn: document.querySelector(".works-nav-list.work2"),
            project3Btn: document.querySelector(".works-nav-list.work3"),
            project4Btn: document.querySelector(".works-nav-list.work4"),
            project5Btn: document.querySelector(".works-nav-list.work5"),
            project6Btn: document.querySelector(".works-nav-list.work6")
        }
        
        this.projectBtns.project1Btn.addEventListener('click', () =>
        {
            this.showViewer(this.projectViewers.project1View)
            this.hideViewer(this.projectViewers.project2View)
            this.hideViewer(this.projectViewers.project3View)
            this.hideViewer(this.projectViewers.project4View)
            this.hideViewer(this.projectViewers.project5View)
            this.hideViewer(this.projectViewers.project6View)
        })

        this.projectBtns.project2Btn.addEventListener('click', () =>
        {
            this.showViewer(this.projectViewers.project2View)
            this.hideViewer(this.projectViewers.project1View)
            this.hideViewer(this.projectViewers.project3View)
            this.hideViewer(this.projectViewers.project4View)
            this.hideViewer(this.projectViewers.project5View)
            this.hideViewer(this.projectViewers.project6View)
        })

        this.projectBtns.project3Btn.addEventListener('click', () =>
        {
            this.showViewer(this.projectViewers.project3View)
            this.hideViewer(this.projectViewers.project2View)
            this.hideViewer(this.projectViewers.project1View)
            this.hideViewer(this.projectViewers.project4View)
            this.hideViewer(this.projectViewers.project5View)
            this.hideViewer(this.projectViewers.project6View)
        })

        this.projectBtns.project4Btn.addEventListener('click', () =>
        {
            this.showViewer(this.projectViewers.project4View)
            this.hideViewer(this.projectViewers.project2View)
            this.hideViewer(this.projectViewers.project3View)
            this.hideViewer(this.projectViewers.project1View)
            this.hideViewer(this.projectViewers.project5View)
            this.hideViewer(this.projectViewers.project6View)
        })

        this.projectBtns.project5Btn.addEventListener('click', () =>
        {
            this.showViewer(this.projectViewers.project5View)
            this.hideViewer(this.projectViewers.project2View)
            this.hideViewer(this.projectViewers.project3View)
            this.hideViewer(this.projectViewers.project4View)
            this.hideViewer(this.projectViewers.project1View)
            this.hideViewer(this.projectViewers.project6View)
        })

        this.projectBtns.project6Btn.addEventListener('click', () =>
        {
            this.showViewer(this.projectViewers.project6View)
            this.hideViewer(this.projectViewers.project2View)
            this.hideViewer(this.projectViewers.project3View)
            this.hideViewer(this.projectViewers.project4View)
            this.hideViewer(this.projectViewers.project5View)
            this.hideViewer(this.projectViewers.project1View)
        })
    }

    update()
    {   
        this.portal1Mesh.material.uniforms.uTime.value += this.time.delta * 0.00125
        this.portal2Mesh.material.uniforms.uTime.value += this.time.delta * 0.00125
        this.portal3Mesh.material.uniforms.uTime.value += this.time.delta * 0.00125

        if(this.isModalOpen) {

            document.body.style.cursor = "default"

            this.portal1Mesh.material.uniforms.uColorIn.value.set('#000000')
            this.portal2Mesh.material.uniforms.uColorIn.value.set('#000000')
            this.portal3Mesh.material.uniforms.uColorIn.value.set('#000000')

            this.currentIntersect = null
            
            return
        }

        this.raycasterObjects = [this.portal1Mesh, this.portal2Mesh, this.portal3Mesh]
        this.intersects = this.raycaster.instance.intersectObjects(this.raycasterObjects)

        for(this.object of this.raycasterObjects)
        {
            this.object.material.uniforms.uColorIn.value.set('#000000')

        }

        for (let i = 0; i < this.intersects.length; i++) {
            this.intersects[0].object.material.uniforms.uColorIn.value.set('#00bfff')
        }

        if(this.intersects.length)
        {
            if(this.currentIntersect === null)
            {
                document.body.style.cursor = "pointer"
            }
            
            this.currentIntersect = this.intersects[0]
        }
        else
        {
            if(this.currentIntersect)
            {
                document.body.style.cursor = "default"
            }

            this.currentIntersect = null
        }
    }
}