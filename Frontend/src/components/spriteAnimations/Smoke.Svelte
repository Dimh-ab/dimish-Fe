<script>
    import {onMount} from 'svelte'
    import { allKidsBooksRead } from '../../stores';
    let smokeSprite = '../images/smoke-spritesheet.png'
    export let transformAvatar

    onMount(() => smokeSpriteAnimation())

    const smokeSpriteAnimation = () => {
        const canvas = document.getElementById('smokeCanvas')
        const ctx = canvas.getContext('2d')
        const cWidth = canvas.width = 430
        const cHeight = canvas.height = 430
    
        const playerImage = new Image()
        playerImage.src = smokeSprite
        const spriteWidth = 354 // sprite sheet width / sprite sheet columns
        const spriteHeight = 354 // sprite sheet height (if there were multiple sprites in one sheet this would be devided by the amount of rows)
        let frameX = 12
        let frameY = 0
        let gameFrame = 0
        let fps = 0

        const animate = () => {
            ctx.clearRect(0, 0, cWidth, cHeight)
            ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

            if(gameFrame % fps == 0){
                if(frameX < 14){
                    frameX++
                } else {
                    frameX = 0
                }
                gameFrame++
            }


            if(transformAvatar){
               fps = 1
            }

            if(frameX === 10){
                fps = 0
                frameX = 12
                console.log('frameX is 10', fps, frameX)
            }

            
            // BUG: animation lags af

            // if( nextChat === 1){
            //     staggerFrames = 9
            // } else if( nextChat === 2){
            //     staggerFrames = 0
            // } else if ( nextChat === 3){
            //     staggerFrames = 9
            // } else{
            //     staggerFrames = 0
            // }

            // gameFrame++

            requestAnimationFrame(animate)
        }
    
        animate()
    }




</script>

<div class="canvas-pos">    
    <canvas id="smokeCanvas" />
</div>
<svelte:window on:load={smokeSpriteAnimation}/>


<style>

    .canvas-pos{
        position: sticky;
        bottom: 58%;
        left: 0;
        z-index: 14;
    }

    #smokeCanvas{
        /* rotate: 90; */
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 15;
        /* width: 400px;
        height: 400px; */
        /* left: 60px;
        bottom: 670px;
        translate: -80px -60px; */
        /* border: 1px solid black; */
    }
</style>