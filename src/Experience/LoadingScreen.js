import gsap from 'gsap'
import Experience from './Experience.js'

export default class LoadingScreen {

    constructor()
    {
        this.experience = new Experience()
        this.loadingManager = this.experience.resources.loadingManager

        // Setup

        this.setLoadingAnimation()
    }

    setLoadingAnimation()
    {
        this.loadingBackground = document.querySelector('.loading-background')
        this.loadingSpinner = document.querySelector('.loading-spinner')

        this.backgroundFade = (background) => {
            background.style.display = "block"

            gsap.to(background, {
                opacity: 0,
                duration: 0,
                ease: "power2.inOut"
            })
        }

        this.spinnerLoading = (spinner) => {

            spinner.style.display = "block"

            this.timeline1 = gsap.timeline()

            this.timeline1.to(spinner, {
                rotate: "45deg",
                duration: 1.5,
                delay: 0.5,
                ease: "power2.inOut",
            }).to(spinner, {
                rotate: "-90deg",
                duration: 1.5,
                delay: 0.5,
                ease: "power2.inOut"
            }).to(spinner, {
                scale: 20,
                duration: 1.25,
                delay: 0.5,
                ease: "power2.inOut",
                onComplete: () => {
                    this.backgroundFade(this.loadingBackground)
                }
            }).to(spinner, {
                opacity: 0,
                duration: 0.25,
                delay: 0.125,
                ease: "power2.inOut",
                onComplete: () => {
                    this.loadingSpinner.remove()
                    this.loadingBackground.remove()
                }
            })
        }
            
        this.loadingManager.onLoad = () => {
            this.spinnerLoading(this.loadingSpinner)
        }
    }
}