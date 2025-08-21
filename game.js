class StartScene extends Phaser.Scene {
    // Intro scene (Just the title screen)
    constructor(){
        super({key:'StartScene'});
    }

    create(){
        this.add.text(10,150, 'Super Awesome Tea mini game', {fill: 'fff', fontSize:'30px'}).setOrigin(0,0);

        const button = this.add.text(200,400,'Begin', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {x:10, y:5}
        });
        button.setInteractive({useHandCursor:true}); // gives the button the ability to give code to it :)
        button.on('pointerdown', () => {  // when pointer is clicked
            //console.log('Button clicked!');
            this.scene.stop('StartScene');
            this.scene.start('Scene1');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button
    }
}

class Scene1 extends Phaser.Scene {
    // Intro scene (Just the title screen)
    constructor(){
        super({key:'Scene1'});
    }

    preload() {
        this.load.image('field',  'sprites/field.png');
        this.load.image('basket', 'sprites/basket.png');

        this.load.image('blackLeaf', 'sprites/flowers/blackLeaf.png');
        this.load.image('butterflyPea', 'sprites/flowers/butterflyPea.png');
        this.load.image('carnation', 'sprites/flowers/carnation.png');
        this.load.image('chamomile', 'sprites/flowers/chamomile.png');
        this.load.image('chrysanthemum', 'sprites/flowers/chrysanthemum.png');
        this.load.image('cornflower', 'sprites/flowers/cornflower.png');
        this.load.image('greenLeaf', 'sprites/flowers/greenLeaf.png');
        this.load.image('hibiscus', 'sprites/flowers/hibiscus.png');
        this.load.image('jasmine', 'sprites/flowers/jasmine.png');
        this.load.image('lavender', 'sprites/flowers/lavender.png');
        this.load.image('mallow', 'sprites/flowers/mallow.png');
        this.load.image('marigold', 'sprites/flowers/marigold.png');
        this.load.image('mint', 'sprites/flowers/mint.png');
        this.load.image('rose', 'sprites/flowers/rose.png');
        this.load.image('violet', 'sprites/flowers/violet.png');
        this.load.image('whiteLeaf', 'sprites/flowers/whiteLeaf.png');
    }

    create(){
        this.add.image(0,0,'field').setOrigin(0,0);  // field background
        //this.add.text(10,150, 'SCENE 1: PLANTS', {fill: 'fff', fontSize:'30px'}).setOrigin(0,0);

        this.add.image(0,345,'basket').setOrigin(0,0); // basket

        this.createFlower(100,100);
        
    }

   createFlower(x, y) {
        let flower = this.add.image(x, y, 'violet').setInteractive();
        flower.setScale(5.5);

        this.input.setDraggable(flower);
        flower.on('drag', (pointer,dragX, dragY) => {
            if (flower instanceof Phaser.GameObjects.Image) {  // Check if it's the correct type
            flower.x = dragX;
            flower.y = dragY;
            } else {
            console.warn('Expected a Phaser image object but got:', flower);
            }
        });
    }

}

const flowerList = ['blackLeaf', 'butterflyPea', 'carnation', 'chamomile', 
    'chrysanthemum', 'cornflower','greenLeaf', 'hibiscus', 
    'jasmine', 'lavender', 'mallow', 'marigold', 'mint', 'rose', 'violet', 'whiteleaf'];

const gameState = {}

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    pixelArt: true, // keeps pixelart from getting blurry
    backgroundColor: 0xE0B0FF,
    //scene: [StartScene, Scene1]
    scene: Scene1
};

const game = new Phaser.Game(config);