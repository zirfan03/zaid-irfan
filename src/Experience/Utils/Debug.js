import GUI from 'lil-gui'

export default class Debug
{
    constructor()
    {
        // Setup
        this.gui = new GUI({
        width: 300,
        title: 'Debug UI',
        closeFolders: true
        })

        this.gui.hide()
        
        // Controls
        window.addEventListener('keydown', (event) =>
        {
        if(event.key == 'j')
            this.gui.show(this.gui._hidden)
        })

    }
}