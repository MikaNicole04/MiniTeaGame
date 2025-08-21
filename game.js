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

        this.basket = this.add.image(0,345,'basket').setOrigin(0,0).setInteractive(); // basket

        // make basket a drop zone
        this.basket.input.dropZone = true;

        this.input.on('drop', (pointer, flower, basket) => {
            if(basket === this.basket) {
                button.setVisible(true);
                gameState.flowerSet.add(flower.type);
                console.log(gameState.flowerSet);  // add flower to global set of flowers picked
                
                // Keep flowers inside basket (player cannot take flowers out once picked)
                flower.on('drag', (pointer, dragX, dragY) => {
                    let basketBounds = this.basket.getBounds();

                    // clamp X and Y so it stays inside basket
                    flower.x = Phaser.Math.Clamp(dragX, basketBounds.left, basketBounds.right);
                    flower.y = Phaser.Math.Clamp(dragY, basketBounds.top, basketBounds.bottom);
                });
            }

            //flower.disableInteractive();
        })

        const button = this.add.text(430,350,'->', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {x:10, y:5}
        });
        button.setInteractive({useHandCursor:true}); // gives the button the ability to give code to it :)
        button.setVisible(false);
        button.on('pointerdown', () => {  // when pointer is clicked
            //console.log('Button clicked!');
            this.scene.stop('Scene1');
            this.scene.start('SceneMid');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button

        // Add flowers "randomly" accross screen
        let cols = 6;
        let rows = 5;
        let cellWidth = (525-60)/cols;
        let cellHeight = (340-50)/rows;
        for(let row = 0; row<rows; row++){
            for(let col=0; col < cols; col++){
                //Phaser.Math.Between chooses a random offset within the grid, 
                // so flowers aren't just in lines
                let xVal = 60+col * cellWidth + Phaser.Math.Between(-15,15); 
                let yVal = 50+row * cellHeight + Phaser.Math.Between(-15,15);

                let flowerNum = getRandomIntInclusive(0,15);
                this.createFlower(xVal, yVal, flowerNum);
            }
        }
        
    }  

   createFlower(x, y, flowerNum) {
        let flowerKey = flowerList[flowerNum]
        let flower = this.add.image(x, y, flowerKey).setInteractive();
        flower.setScale(5.5);

        flower.type = flowerKey;

        this.input.setDraggable(flower);
        flower.on('drag', (pointer, dragX, dragY) => {
            if (flower instanceof Phaser.GameObjects.Image) {  // Check if it's the correct type
                flower.x = dragX;
                flower.y = dragY;
            } else {
                console.warn('Expected a Phaser image object but got:', flower);
            }
        });
    }

}

class SceneMid extends Phaser.Scene {
    // Intro scene (Just the title screen)
    constructor(){
        super({key:'SceneMid'});
    }

    create(){
        this.add.text(10,150, 'Cue flowers being sorted \n and dried :)', {fill: 'fff', fontSize:'30px'}).setOrigin(0,0);

        const button = this.add.text(200,400,'->', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {x:10, y:5}
        });
        button.setInteractive({useHandCursor:true}); // gives the button the ability to give code to it :)
        button.on('pointerdown', () => {  // when pointer is clicked
            //console.log('Button clicked!');
            this.scene.stop('SceneMid');
            this.scene.start('Scene3');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button
    }
}

class Scene2 extends Phaser.Scene {
    // Intro scene (Just the title screen)
    constructor(){
        super({key:'Scene2'});
    }

    create(){
        this.add.text(10,150, 'SCENE 2: TEA', {fill: 'fff', fontSize:'30px'}).setOrigin(0,0);
    }
}

class Scene3 extends Phaser.Scene {
    // Intro scene (Just the title screen)
    constructor(){
        super({key:'Scene3'});
    }

    preload(){
        this.load.image('orderForm', 'sprites/cakeOrder.png');
    }

    create(){
        this.add.text(10,150, 'SCENE : TEA', {fill: 'fff', fontSize:'30px'}).setOrigin(0,0);
        this.add.image(0,0,'orderForm').setOrigin(0,0);

        const button = this.add.text(430,350,'->', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {x:10, y:5}
        });
        button.setInteractive({useHandCursor:true}); // gives the button the ability to give code to it :)
        button.setVisible(false);
        button.on('pointerdown', () => {  // when pointer is clicked
            //console.log('Button clicked!');
            this.scene.stop('Scene3');
            this.scene.start('SceneMid');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button

        // pink, orange, green, blue, purple
        this.selectedButton = null;  // track the currently selected one
        this.buttons = [];           // store all button references

        const colors = ["#ff00ff","#ff9900ff" , "#00ff00", "#0000ff", "#bf00ffff"];
        const labels = ["Pink", "Orange", "Green", "Blue", "Purple"];

        for (let i = 0; i < 5; i++) {
            let btn = this.add.text(125 + i * 55, 380, "   ", {
                fontSize: "10px",
                fill: "#fff",
                backgroundColor: colors[i]   // normal color
            })
            .setPadding(10)
            .setInteractive();

            btn.baseColor = colors[i];  // save original color
            btn.color = labels[i];

            btn.on("pointerdown", () => {
                this.selectButton(btn);
                gameState.frostingColor = btn.color;
                button.setVisible(true);
                
            });

            this.buttons.push(btn);
        }
    }

    // function to select one button
    selectButton(btn) {
        // reset all buttons
        this.buttons.forEach(b => {
            b.setStyle({stroke: '#000000', strokeThickness: 0});
        });

        // highlight only the clicked one
        btn.setStyle({stroke: '#448cafff', strokeThickness: 8});  // highlight style
        this.selectedButton = btn;
    }

}

// Helper function: Gets random int, inclusive of min and max
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const flowerList = ['blackLeaf', 'butterflyPea', 'carnation', 'chamomile', 
    'chrysanthemum', 'cornflower','greenLeaf', 'hibiscus', 
    'jasmine', 'lavender', 'mallow', 'marigold', 'mint', 'rose', 'violet', 'whiteLeaf'];

const gameState = {
    flowerSet: new Set(), // store collected flowers from scene1
    frostingColor: ""
}

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    pixelArt: true, // keeps pixelart from getting blurry
    backgroundColor: 0xE0B0FF,
    //scene: [StartScene, Scene1, SceneMid, Scene3]
    scene: Scene2
};

const game = new Phaser.Game(config);