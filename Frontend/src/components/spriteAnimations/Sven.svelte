<script>
    import {onMount} from 'svelte'
    let svenSprite = '../images/sven-sprite-01-01.png'
    // export let nextChat
    import {nextChat} from '../../stores'

    $: console.log($nextChat)

    onMount(() => svenSpriteAnimation())

    const svenSpriteAnimation = () => {
        const canvas = document.getElementById('svenCanvas')
        const ctx = canvas.getContext('2d')
        const cWidth = canvas.width = 1000
        const cHeight = canvas.height = 1400
    
        const playerImage = new Image()
        playerImage.src = svenSprite
        const spriteWidth = 992 // sprite sheet width / sprite sheet columns
        const spriteHeight = 1359 // sprite sheet height (if there were multiple sprites in one sheet this would be devided by the amount of rows)
        let frameX = 0
        let frameY = 0
        let gameFrame = 0
        let staggerFrames = 0

        const animate = () => {
            ctx.clearRect(0, 0, cWidth, cHeight)
            ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)

            if(gameFrame % staggerFrames == 0){
                if(frameX < 3){
                    frameX++
                } else {
                    frameX = 0
                }
            }

            if( $nextChat === 1){
                staggerFrames = 15
            } else if( $nextChat === 2){
                staggerFrames = 0
            } else if ( $nextChat === 3){
                staggerFrames = 15
            } else{
                staggerFrames = 0
            }

            gameFrame++

            requestAnimationFrame(animate)
        }
    
        animate()
    }




</script>


<canvas id="svenCanvas" />
<svelte:window on:load={svenSpriteAnimation}/>


<style>

    #svenCanvas{
        position: absolute;
        width: 320px;
        height: 420px;
        z-index: 15;
        bottom: 30%;
        right: 70px;
    }
</style>