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
        // for new game clear the set of flowers: 
        gameState.flowerSet = new Set();

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
            this.scene.start('Scene2');
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

    preload(){
        // background table
        this.load.image('table', 'sprites/tableTexture.png');

        // bowl
        this.load.image('bowl', 'sprites/bowl.png');

        // jar sprites
        this.load.image('blackLeaf_jar', 'sprites/flower_jar/blackLeaf_jar.png');
        this.load.image('butterflyPea_jar', 'sprites/flower_jar/butterflyPea_jar.png');
        this.load.image('carnation_jar', 'sprites/flower_jar/carnation_jar.png');
        this.load.image('chamomile_jar', 'sprites/flower_jar/chamomile_jar.png');
        this.load.image('chrysanthemum_jar', 'sprites/flower_jar/chrysanthemum_jar.png');
        this.load.image('cornflower_jar', 'sprites/flower_jar/cornflower_jar.png');
        this.load.image('greenLeaf_jar', 'sprites/flower_jar/greenLeaf_jar.png');
        this.load.image('hibiscus_jar', 'sprites/flower_jar/hibiscus_jar.png');
        this.load.image('jasmine_jar', 'sprites/flower_jar/jasmine_jar.png');
        this.load.image('lavender_jar', 'sprites/flower_jar/lavender_jar.png');
        this.load.image('mallow_jar', 'sprites/flower_jar/mallow_jar.png');
        this.load.image('marigold_jar', 'sprites/flower_jar/marigold_jar.png');
        this.load.image('mint_jar', 'sprites/flower_jar/mint_jar.png');
        this.load.image('rose_jar', 'sprites/flower_jar/rose_jar.png');
        this.load.image('violet_jar', 'sprites/flower_jar/violet_jar.png');
        this.load.image('whiteLeaf_jar', 'sprites/flower_jar/whiteLeaf_jar.png');

        // crushed flower sprites
        this.load.image('blackLeaf_crushed', 'sprites/flowers_crushed/blackLeaf_crushed.png');
        this.load.image('butterflyPea_crushed', 'sprites/flowers_crushed/butterflyPea_crushed.png');
        this.load.image('carnation_crushed', 'sprites/flowers_crushed/carnation_crushed.png');
        this.load.image('chamomile_crushed', 'sprites/flowers_crushed/chamomile_crushed.png');
        this.load.image('chrysanthemum_crushed', 'sprites/flowers_crushed/chrysanthemum_crushed.png');
        this.load.image('cornflower_crushed', 'sprites/flowers_crushed/cornflower_crushed.png');
        this.load.image('greenLeaf_crushed', 'sprites/flowers_crushed/greenLeaf_crushed.png');
        this.load.image('hibiscus_crushed', 'sprites/flowers_crushed/hibiscus_crushed.png');
        this.load.image('jasmine_crushed', 'sprites/flowers_crushed/jasmine_crushed.png');
        this.load.image('lavender_crushed', 'sprites/flowers_crushed/lavender_crushed.png');
        this.load.image('mallow_crushed', 'sprites/flowers_crushed/mallow_crushed.png');
        this.load.image('marigold_crushed', 'sprites/flowers_crushed/marigold_crushed.png');
        this.load.image('mint_crushed', 'sprites/flowers_crushed/mint_crushed.png');
        this.load.image('rose_crushed', 'sprites/flowers_crushed/rose_crushed.png');
        this.load.image('violet_crushed', 'sprites/flowers_crushed/violet_crushed.png');
        this.load.image('whiteLeaf_crushed', 'sprites/flowers_crushed/whiteLeaf_crushed.png');

    }

    create(){
        this.add.image(0,0,"table").setOrigin(0,0);
        this.add.text(200,20, 'CLICK then DRAG \n tea to the bowl', {fill: 'fff', fontSize:'30px', fontStyle: 'bold'}).setOrigin(0,0);
        this.add.rectangle(0,0, 180, 512, "0x00000", 0.7).setOrigin(0,0);

        this.bowl = this.add.image(225,200,'bowl').setOrigin(0,0).setInteractive(); // basket
        this.bowl.setScale(0.25); 

        // make basket a drop zone
        this.bowl.input.dropZone = true;


        // All jars (up to 16) - replace with your own logic
        this.jars = [];
        const currFlowers = Array.from(gameState.flowerSet);
        for (let i = 0; i < currFlowers.length; i++) {  // CHANGE BACK TO currFlowers.length
            let jarStr = currFlowers[i] + "_jar"; 
            let teaStr = currFlowers[i] + "_crushed"; 
            // let jarStr = flowerList[i] + "_jar"; 
            // let teaStr = flowerList[i] + "_crushed"; 
            this.jars.push({ key: jarStr, teaKey: teaStr});
        }

        this.currentPage = 0;   // start at page 0
        this.jarsPerPage = 4;   // how many jars to show at once

        // Draw first page
        this.showPage(this.currentPage);

        // --- Global drag handling (for tea proxies) ---
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            //if (this.draggedTea && gameObject === this.draggedTea) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            //}
        });

        this.input.on('drop', (pointer, gameObject, bowl) => {
           // if (this.draggedTea && gameObject === this.draggedTea) {
                if(bowl === this.bowl) {
                    button.setVisible(true);
                }
            //}
        });

        // Arrow buttons
        this.nextBtn = this.add.text(100, 480, "↓", { fontSize: "32px", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => {
                if ((this.currentPage + 1) * this.jarsPerPage < this.jars.length) {
                    this.currentPage++;
                    this.showPage(this.currentPage);
                }
            });

        this.prevBtn = this.add.text(50, 480, "↑", { fontSize: "32px", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.showPage(this.currentPage);
                }
            });
        

        const button = this.add.text(430,450,'->', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {x:10, y:5}
        });
        button.setInteractive({useHandCursor:true}); // gives the button the ability to give code to it :)
        button.setVisible(false);
        button.on('pointerdown', () => {  // when pointer is clicked
            //console.log('Button clicked!');
            this.scene.stop('Scene2');
            this.scene.start('Scene3');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button
    }

    showPage(page) {
        // Remove old jars
        if (this.displayedJars) {
            this.displayedJars.forEach(j => j.destroy());
            this.displayedText.forEach(j => j.destroy());
        }
        this.displayedJars = [];
        this.displayedText = [];

        // Which jars to display
        let start = page * this.jarsPerPage;
        let end = start + this.jarsPerPage;
        let jarsToShow = this.jars.slice(start, end);

        // Layout jars vertically in the rectangle
        let x = 90; // center inside 180px panel
        let yStart = 60;
        let spacing = 120; // space between jars

        jarsToShow.forEach((jarData, i) => {
            let jar = this.add.image(x, yStart + i * spacing, jarData.key);  // show jar
            jar.setScale(4);

            // jar label
            let jarLabel = this.add.text(jar.x,   jar.y + jar.displayHeight / 2 + 10, jarData.key.slice(0, -4), {color: '#fff', fontSize:'15px'}).setOrigin(0.5,0);

            // so they can be cleared when new page is loaded
            this.displayedJars.push(jar);
            this.displayedText.push(jarLabel);

            // 🔹 Make jar interactive for spawning tea
            jar.setInteractive({ useHandCursor: true });
            jar.on('pointerdown', (pointer) => {
                this.draggedTea = this.add.image(pointer.x, pointer.y, jarData.teaKey)
                    .setScale(3)
                    .setAlpha(0.8)
                    .setInteractive({ draggable: true });
            });

        });
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
            this.scene.start('SceneCup');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button

        // pink, orange, green, blue, purple
        this.selectedButton = null;  // track the currently selected one
        this.buttons = [];           // store all button references

        const colors = ["#ff00ff","#ff9900ff" , "#00ff00", "#0000ff", "#bf00ffff"];
        const labels = ["pink", "orange", "green", "blue", "purple"];

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

class SceneCup extends Phaser.Scene {
    constructor(){
        super({key:'SceneCup'});
    }

    preload(){
        this.load.image('shelf', 'sprites/cupShelf.png');

        this.load.image('copperCup', 'sprites/copperCup.png');
        this.load.image('dripCup', 'sprites/dripCup.png');
        this.load.image('fancyCup', 'sprites/fancyGoldCup.png');
        this.load.image('frogCup', 'sprites/frogCup.png');
    }

    create(){
        this.add.image(0,0,'shelf').setOrigin(0,0);
        this.add.text(40,450, 'Pick a cup for your tea!', {color: '#fff', fontSize:'30px'}).setOrigin(0,0);

        // COPPER CUP
        let copper = this.add.image(130, 165, 'copperCup').setScale(5).setInteractive({ useHandCursor: true });
        // Pointer events
        copper.on('pointerdown', () => {
            gameState.chosenCup = "copperCup";
            this.scene.stop('SceneCup');
            this.scene.start('Scene4');
        });
        copper.on('pointerover', () => {copper.setTint(0xaaaaaa); });  //hover effect
        copper.on('pointerout', () => {copper.clearTint(); });  // remove hover effect

        // FROG CUP
        let frog = this.add.image(380, 165, 'frogCup').setScale(5).setInteractive({ useHandCursor: true });
        // Pointer events
        frog.on('pointerdown', () => {
            gameState.chosenCup = "frogCup";
            this.scene.stop('SceneCup');
            this.scene.start('Scene4');
        });
        frog.on('pointerover', () => {frog.setTint(0xaaaaaa); });  //hover effect
        frog.on('pointerout', () => {frog.clearTint(); });  // remove hover effect

        // FANCY CUP
        let fancy = this.add.image(140, 365, 'fancyCup').setScale(4.5).setInteractive({ useHandCursor: true });
        // Pointer events
        fancy.on('pointerdown', () => {
            gameState.chosenCup = "fancyCup";
            this.scene.stop('SceneCup');
            this.scene.start('Scene4');
        });
        fancy.on('pointerover', () => {fancy.setTint(0xaaaaaa); });  //hover effect
        fancy.on('pointerout', () => {fancy.clearTint(); });  // remove hover effect

        // DRIP CUP
        let drip = this.add.image(380, 365, 'dripCup').setScale(5).setInteractive({ useHandCursor: true });
        // Pointer events
        drip.on('pointerdown', () => {
            gameState.chosenCup = "dripCup";
            this.scene.stop('SceneCup');
            this.scene.start('Scene4');
        });
        drip.on('pointerover', () => {drip.setTint(0xaaaaaa); });  //hover effect
        drip.on('pointerout', () => {drip.clearTint(); });  // remove hover effect

    }
}

class Scene4 extends Phaser.Scene {
    // Intro scene (Just the title screen)
    constructor(){
        super({key:'Scene4'});
    }

    preload(){
        // Table Background
        this.load.image('table', 'sprites/tableTexture.png');

        // Water Heating
        this.load.image('heater', 'sprites/teaHeater.png');
        this.load.image('fire', 'sprites/teaFire.png');
        this.load.image('teapot', 'sprites/teapot.png');

        // Cups
        this.load.image('copperCup', 'sprites/copperCup.png');
        this.load.image('dripCup', 'sprites/dripCup.png');
        this.load.image('fancyCup', 'sprites/fancyGoldCup.png');
        this.load.image('frogCup', 'sprites/frogCup.png');

        // Blends
        this.load.image('greenBlend', 'sprites/greenBlend.png');
        this.load.image('greenJar', 'sprites/greenBlend_jar.png');

        this.load.image('pinkBlend', 'sprites/pinkBlend.png');
        this.load.image('pinkJar', 'sprites/pinkBlend_jar.png');

        this.load.image('purpleBlend', 'sprites/purpleBlend.png');
        this.load.image('purpleJar', 'sprites/purpleBlend_jar.png');

        this.load.image('whiteBlend', 'sprites/whiteBlend.png');
        this.load.image('whiteJar', 'sprites/whiteBlend_jar.png');
    }

    create(){
        this.add.image(0,0,'table').setOrigin(0,0);
        const blendColor = sortFlowers(); //sortFlowers();
        this.add.image(250,380, gameState.chosenCup).setScale(5.5);  //gameState.chosenCup
        


        // Teapot Interactions
        let teapot = this.add.image(350, 100, 'teapot').setScale(6.5).setInteractive({ draggable: true });
        let originalX = teapot.x;
        let originalY = teapot.y;

        this.input.setDraggable(teapot);
        teapot.on('drag', (pointer, dragX, dragY) => {
            teapot.x = dragX;
            teapot.y = dragY;
        });

        teapot.on('dragend', () => {
            teapot.x = originalX;
            teapot.y = originalY;
        });

        // Heater Interactions
        let heater = this.add.image(350, 230, 'heater').setScale(6.5).setInteractive({ useHandCursor: true });
        let fire = this.add.image(345,232, 'fire').setScale(6.5).setVisible(false);

        // Pointer events
        heater.on('pointerdown', () => {
            fire.setVisible(!fire.visible);
        });
        heater.on('pointerover', () => {heater.setTint(0xaaaaaa); });  //hover effect
        heater.on('pointerout', () => {heater.clearTint(); });  // remove hover effect


        // Tea Jar Interactions
        let blendJar = this.add.image(100,100, blendColor+"Jar").setScale(8).setInteractive({ useHandCursor: true });

        // When clicking the jar, spawn a draggable tea image
        blendJar.on('pointerdown', (pointer) => {
            this.draggedTea = this.add.image(pointer.x, pointer.y, blendColor+"Blend") // use correct tea key
                .setScale(3)
                .setAlpha(0.8)
                .setInteractive({ draggable: true });
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                gameObject.x = dragX;
                gameObject.y = dragY;
        });


        // BUTTON
        const button = this.add.text(420,450,'->', {
            fontSize: '35px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {x:10, y:5}
        });
        button.setInteractive({useHandCursor:true}); // gives the button the ability to give code to it :)
        button.on('pointerdown', () => {  // when pointer is clicked
            //console.log('Button clicked!');
            this.scene.stop('Scene4');
            this.scene.start('Scene5');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button
    }
}

class Scene5 extends Phaser.Scene {
    constructor(){
        super({key:'Scene5'});
    }

    preload(){
        //background
        this.load.image('teaScene', 'sprites/teaPartyScene.png');

        // Cups
        this.load.image('copperCup', 'sprites/copperCup.png');
        this.load.image('dripCup', 'sprites/dripCup.png');
        this.load.image('fancyCup', 'sprites/fancyGoldCup.png');
        this.load.image('frogCup', 'sprites/frogCup.png');

        // Cake
        this.load.image('base', 'sprites/blankCake.png');
        this.load.image('blue', 'sprites/blueFrosting.png');
        this.load.image('green', 'sprites/greenFrosting.png');
        this.load.image('orange', 'sprites/orangeFrosting.png');
        this.load.image('pink', 'sprites/pinkFrosting.png');
        this.load.image('purple', 'sprites/purpleFrosting.png');
    }

    create(){
        this.add.image(0,0, 'teaScene').setOrigin(0,0);

        this.add.image(265,380, 'base').setScale(5);
        this.add.image(265,325, gameState.frostingColor).setScale(5);  // change to gameState.frostingColor

        this.add.image(180, 460, gameState.chosenCup).setScale(3); // change to gameState.chosenCup


        const button = this.add.text(350,470,'Play Again', {
            fontSize: '20px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: {x:10, y:5}
        });
        button.setInteractive({useHandCursor:true}); // gives the button the ability to give code to it :)
        button.on('pointerdown', () => {  // when pointer is clicked
            //console.log('Button clicked!');
            this.scene.stop('Scene5');
            this.scene.start('Scene1');
        })
        button.on('pointerover', () => button.setStyle({ fill: '#ff0' })); // when pointer hovers over button
        button.on('pointerout', () => button.setStyle({ fill: '#fff' })); // when pointer is not over button
    }
}

// Helper function: Gets random int, inclusive of min and max
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sortFlowers(){
    const currFlowers = Array.from(gameState.flowerSet);
    console.log(currFlowers);
    let purple=0, pink=0, white=0, green = 0;
    for(let i = 0; i < currFlowers.length; i++){
        console.log(currFlowers[i]);
        if(currFlowers[i] === "lavender" || currFlowers[i] === "violet" 
            || currFlowers[i] === "cornflower" || currFlowers[i] === "butterflyPea" || currFlowers[i] === "mallow"){
            purple++;
        }
        if(currFlowers[i] === "jasmine"|| currFlowers[i] ==="chamomile"|| currFlowers[i] ==="whiteLeaf"){
            white++;
        }
        if(currFlowers[i] === "rose"|| currFlowers[i] ==="marigold"|| currFlowers[i] ==="chrysanthemum"||
            currFlowers[i] ==="blackLeaf"|| currFlowers[i] ==="carnation"|| currFlowers[i] ==="hibiscus"
        ){
            pink++;
        }
        if(currFlowers[i] ==="mint"|| currFlowers[i] ==="greenLeaf"){
            green++;
        }
    }

    const blend = Math.max(purple, pink, white, green);

    if(blend === purple){ return "purple";}
    else if(blend === pink){ return "pink";}
    else if(blend === white){ return "white";}
    else { return "green"};

}

const flowerList = ['blackLeaf', 'butterflyPea', 'carnation', 'chamomile', 
    'chrysanthemum', 'cornflower','greenLeaf', 'hibiscus', 
    'jasmine', 'lavender', 'mallow', 'marigold', 'mint', 'rose', 'violet', 'whiteLeaf'];

const gameState = {
    flowerSet: new Set(), // store collected flowers from scene1
    frostingColor: "",
    chosenCup: ""
}

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    pixelArt: true, // keeps pixelart from getting blurry
    backgroundColor: 0xE0B0FF,
    scene: [StartScene, Scene1, SceneMid, Scene2, Scene3, SceneCup, Scene4, Scene5]
    //scene: Scene4
};

const game = new Phaser.Game(config);