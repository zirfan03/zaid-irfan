import Experience from '../Experience.js'
import Environment from './Environment.js'
import Rifts from './Rifts.js'
import Water from './Water.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () =>
        {
            // Setup
            this.rifts = new Rifts()
            this.water = new Water()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.rifts)
            this.rifts.update()

        if(this.water)
            this.water.update()
    }
}