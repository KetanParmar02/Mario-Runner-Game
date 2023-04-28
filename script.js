const canva = document.querySelector('canvas')

let image = document.getElementById('platform')
let background = document.getElementById('background')
let hills = document.getElementById('hills')
let platformSmallTall = document.getElementById('platformSmallTall')

let spriteRunLeft = document.getElementById('spriteRunLeft')
let spriteRunRight = document.getElementById('spriteRunRight')
let spriteStandLeft = document.getElementById('spriteStandLeft')
let spriteStandRight = document.getElementById('spriteStandRight')

const c = canva.getContext('2d')

canva.width = 1024
canva.height = 576

const gravity = 1.5
class Player {
    constructor(){
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 66
        this.height = 150
        this.image = spriteStandRight
        this.frames = 0
        this.sprites = {
            stand : {
                right : spriteStandRight,
                left : spriteStandLeft,
                cropWidth : 177,
                width : 66
            },
            run : {
                right : spriteRunRight,
                left : spriteRunLeft,
                cropWidth : 341,
                width : 127.875
            }
        }

        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }

    draw(){
        c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.frames++

        if(this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)){
            this.frames = 0
        }
        else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)){
            this.frames = 0
        }

        if(this.frames > 28){
            this.frames = 0
        }
        this.draw()

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.velocity.y + this.height <= canva.height) {
            this.velocity.y += gravity 
        }   
    }
}

class Platform{
    constructor({x,y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height

    }

    draw(){
        c.drawImage(this.image,this.position.x, this.position.y)
    }
}

class GenericObject{
    constructor({x,y, image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height

    }

    draw(){
        c.drawImage(this.image,this.position.x, this.position.y)
    }
}

    let player = new Player()
    let platforms = []

    let genericObjects = []
    // let currentKey
    const keys = {
        right: {
            pressed : false
        },
        left: {
            pressed : false
        }
    }

    let scrollOffset = 0

function init(){

    player = new Player()
    platforms = [
        new Platform({x: image.width * 4 + 300 - 2 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 6 + 119 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 8 - 161 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 10 - 161 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 12 - 34 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 14 - 127 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 16 - 161 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 18 - 108 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 20 - 285 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 22 - 470 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 24 - 545 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: image.width * 26 - 623 + image.width - platformSmallTall.width, y: 270, image : platformSmallTall}),
        new Platform({x: -1, y:470, image}), 
        new Platform({x: image.width - 3, y: 470, image}),
        new Platform({x: image.width * 2 + 100, y: 470, image}),
        new Platform({x: image.width * 3 + 300, y: 470, image}),
        new Platform({x: image.width * 4 + 300 - 2, y: 470, image}),
        new Platform({x: image.width * 5 + 700 - 2, y: 470, image}),
        new Platform({x: image.width * 6 + 1000 - 2, y: 470, image}),
        new Platform({x: image.width * 7 + 1500 - 2, y: 470, image}),
        new Platform({x: image.width * 8 + 1500 - 4, y: 470, image}),
        new Platform({x: image.width * 9 + 2000 - 4, y: 470, image}),
        new Platform({x: image.width * 10 + 2200 - 6, y: 470, image}),
        new Platform({x: image.width * 11 + 2300 - 5, y: 470, image}),
        new Platform({x: image.width * 12 + 2450 - 7, y: 470, image}),
        new Platform({x: image.width * 13 + 2800 - 8, y: 470, image}),
        new Platform({x: image.width * 14 + 3200 - 4, y: 470, image}),
        new Platform({x: image.width * 15 + 3600 - 8, y: 470, image}),
        new Platform({x: image.width * 16 + 4100 - 5, y: 470, image}),
        new Platform({x: image.width * 17 + 4600 - 4, y: 470, image}),
        new Platform({x: image.width * 18 + 5100 - 1, y: 470, image}),
        new Platform({x: image.width * 19 + 5800 - 2, y: 470, image}),
    ]
    

    genericObjects = [
        new GenericObject({
            x :-1,
            y:-1,
            image : background
        }),
        new GenericObject({
            x :-1,
            y:-1,
            image : hills
        })
    ]

    scrollOffset = 0
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0,0, canva.width, canva.height)

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    }else if((keys.left.pressed && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0){
        player.velocity.x = -player.speed  
    }
    else{
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })

            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.66
            })
        }else if(keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })

            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.66
            })
        }
    }

    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0   
        }
    })

    

    // win codition
    if (scrollOffset > image.width * 5 + 700 - 2) {
       console.log('you win')
    }

    // lose condition
    if(player.position.y > canva.height){
        init()
    }
}

init()
animate()

window.addEventListener('keydown', ({ keyCode }) =>{
    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break;

        case 83:
            console.log('down')
            break;
                
        case 68:
            console.log('right')
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break;

        case 87:
            console.log('up')
            player.velocity.y -= 20
            break;
    }

    console.log(keys.right.pressed)
})

window.addEventListener('keyup', ({ keyCode }) =>{
    switch(keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = false
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break;

        case 83:
            console.log('down')
            break;
                
        case 68:
            console.log('right')
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break;

        case 87:
            console.log('up')
            player.velocity.y -= 20
            break;
    }

    console.log(keys.right.pressed)
})