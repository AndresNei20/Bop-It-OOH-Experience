

export class Home {

    preload(){
        logo = loadImage('img/logo.png')
    }
    
    myDraw(){
        background('black');

        image(logo, 311, 70)
    }
}
