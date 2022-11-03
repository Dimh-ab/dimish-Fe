<script>
    import { onMount } from "svelte";

    onMount(() => homepageAvatarAnimation());

    const homepageAvatarAnimation = () => {
        const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext("2d");

        const CANVAS_WIDTH = (canvas.width = 591);
        const CANVAS_HEIGHT = (canvas.height = 354.25);

        const playerImage = new Image();
        playerImage.src = "../images/homepage-girl-sprite-01.png";
        const spriteWidth = 591;
        const spriteHeight = 354.25;
        let frameX = 0;
        let frameY = 0;
        let gameFrame = 0;
        const staggerFrames = 25;

        function animate() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            let position = Math.floor(gameFrame/staggerFrames) % 2;
            frameY = spriteWidth * position;
            ctx.drawImage(
                playerImage,
                frameX ,
                frameY * spriteHeight,
                spriteWidth,
                spriteHeight,
                0,
                0,
                spriteWidth,
                spriteHeight
            );
            
            gameFrame++;
            requestAnimationFrame(animate);
        }
        animate();
    };
</script>

<canvas id="canvas1" />

<!-- <img
    class="forward"
    src="../images/homepage-girl-sprite-01.png"
    alt="player"
    id="playerImage"
/> -->
<style>
    #canvas1 {
        position: absolute;
        /* border: 5px solid black; */
        width: 250px;
        height: 130px;
        top: 50%;
        left: 50%;
        /* display: flex; */
        z-index: 13;
        transform: rotate(90deg) rotateY(0deg);
    }
</style>
