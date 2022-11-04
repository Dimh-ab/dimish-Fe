<script>

    import { allKidsBooksRead, adolescenceBooksRead, primaryBooksRead, mobilityBooksRead, informativeBooksRead, gotWand} from "../../stores";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import Smoke from './Smoke.svelte'

    let key = "";
    let girlTransform = 0;

    //ver2

    // so it loads the girl the first time you go to library
    onMount(() => avatarSpriteAnimation());

    // instead of window.addEventlistener('load' () => {})
    // the avatarSpriteAnimation function is connected to <svelte:window />
    const avatarSpriteAnimation = () => {
        const canvas = document.getElementById("canvas1");
        // console.log(canvas);
        const ctx = canvas.getContext("2d");
        // console.log(ctx);

        // const CANVAS_WIDTH = ()
        canvas.width =1100;
        // const CANVAS_HEIGHT = ()
        canvas.height = 1550;

        class InputHandler {
            constructor() {
                this.keys = [];
                window.addEventListener("keydown", (e) => {
                    console.log(e.key);
                    if (
                        (e.key === "ArrowDown" ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowLeft" ||
                            e.key === "ArrowRight") &&
                        this.keys.indexOf(e.key) === -1
                    ) {
                        this.keys.push(e.key);
                    }
                    console.log(e.key, this.keys);
                });

                window.addEventListener("keyup", (e) => {
                    console.log(e.key);
                    if (
                        e.key === "ArrowDown" ||
                        e.key === "ArrowUp" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight"
                    ) {
                        this.keys.splice(this.keys.indexOf(e.key), 1);
                    }
                    console.log(e.key, this.keys);
                });

                // window.addEventListener("wheel", (e) => {
                //     // console.log(e);
                //     if (
                //         e.deltaY === 100 ||
                //         (e.deltaY === -100 &&
                //             this.keys.indexOf(e.deltaY) === -1)
                //     ) {
                //         this.keys.push(e.deltaY);
                //     } else {

                //     }
                //     console.log(e.deltaY, this.keys);
                // });

                const onScrollStop = (callback) => {
                    let isScrolling;
                    window.addEventListener(
                        "wheel",
                        (e) => {
                            clearTimeout(isScrolling);
                            isScrolling = setTimeout(() => {
                                callback();
                            }, 150);
                            if (
                                e.deltaY === 150 ||
                                (e.deltaY === -150 &&
                                    this.keys.indexOf(e.deltaY) === -1)
                            ) {
                                this.keys.push(e.deltaY);
                            } else {
                            }
                            console.log(e.deltaY, this.keys);
                        },
                        false
                    );
                };
                onScrollStop(() => {
                    this.keys.splice(0,this.keys.length);
                    console.log(this.keys);
                    console.log("The user has stopped scrolling");
                });
            }
        }

        class Player {
            constructor(gameWidth, gameHeight) {
                this.gameWidth = gameWidth;
                this.gameHeight = gameHeight;
                this.width = 1100;
                this.height = 1550;
                this.x = 0;
                this.y = this.gameHeight - this.height;
                this.image = document.getElementById("playerImage");
                this.frameX = 0;
                this.frameY = girlTransform;
                this.fps = 6;
                this.frameTimer = 0;
                this.frameInterval = 1000 / this.fps;
                this.maxFrame = 4;
                this.speed = 0;
                this.vy = 0;
                this.weight = 1;
            }
            draw(context) {
                // context.fillRect(this.x, this.y, this.width, this.height);
                context.drawImage(
                    this.image,
                    this.frameX * this.width,
                    this.frameY * this.height,
                    this.width,
                    this.height,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }
            update(input, deltaTime) {
                //sprite animation

                //controls
                if (
                    input.keys.indexOf("ArrowDown") > -1 ||
                    input.keys.indexOf(150) > -1
                ) {
                    this.speed = 8;
                    if (this.frameTimer > this.frameInterval) {
                        if (this.frameX >= this.maxFrame) this.frameX = 0;
                        else this.frameX++;
                        this.frameTimer = 0;
                    } else {
                        this.frameTimer += deltaTime;
                    }
                } else if (
                    input.keys.indexOf("ArrowUp") > -1 ||
                    input.keys.indexOf(-150) > -1
                ) {
                    this.speed = -5;
                    if (this.frameTimer > this.frameInterval) {
                        if (this.frameX >= this.maxFrame) this.frameX = 0;
                        else this.frameX++;
                        this.frameTimer = 0;
                    } else {
                        this.frameTimer += deltaTime;
                    }
                } else {
                    this.speed = 0;
                    this.frameX = 0;
                }
            }
        }

        const input = new InputHandler();
        const player = new Player(canvas.width, canvas.height);
        let lastTime = 0;
        // player.draw(ctx);
        // player.update();

        // const updateSpriteFrame = () => {
        //     player.constructor
        // }

        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.draw(ctx);
            player.update(input, deltaTime);
            requestAnimationFrame(animate);
        }
        animate(0);
    };

    let transformAvatar = false;

    $:  if ($allKidsBooksRead === true){
        transformAvatar = true
        girlTransform = 2
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 1000);
    } 

    $: if($adolescenceBooksRead === true){
        setTimeout(() => {   
            girlTransform = 1
            transformAvatar = true
        }, 3000);
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 4000);
    }

    $: if($mobilityBooksRead === true){
        girlTransform = 4
        transformAvatar = true
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 1000);
    }

    $: if($primaryBooksRead === true){
        girlTransform = 3
        transformAvatar = true
        // console.log(girlTransform)
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 1000);
    }

    $: if($informativeBooksRead === true){
        // setTimeout(() => {
            
            girlTransform = 5
            avatarSpriteAnimation()
            console.log(girlTransform)
        // }, 30000);
    }

    $: if($gotWand === true){
        girlTransform = 5
        avatarSpriteAnimation()
    }

    // $: console.log(girlTransform, transformAvatar)

</script>

<canvas id="canvas1" />
<img
    class="forward"
    src="../images/transformation-spritesheet.png"
    alt="player"
    id="playerImage"
/>

{#if !$informativeBooksRead}
<Smoke transformAvatar={transformAvatar}/>
{/if}
<svelte:window on:keydown={(e) => (key = e.key)} on:load={avatarSpriteAnimation}/>

<style>
    /* .glitter-smoke {
        background-color: #6f2dff;
        position: sticky;
        width: 200px;
        height: 200px;
        border-radius: 200px;
        
        left: 100px;
        bottom: 770px;
        display: flex;
        z-index: 5;
        transform: rotate(90deg) rotateY(0deg);
       
        box-shadow: 0 0 50px 50px #6f2dff,
         0 0 80px 80px #4c00ff9f,
         0 0 100px 100px #8800ff90
        scale: 0;
        transition: all 1s;
    }

    .glitter-smoke.visible {
        display: block;
        scale: 1.3;
        transition-duration: 1s;
        animation: shake 1s;
        animation-iteration-count: infinite;
    }

    @keyframes shake {
        0% {
            transform: translate(5px, 5px) rotate(0deg);
        }
        10% {
            transform: translate(-5px, -4px) rotate(-1deg);
        }
        20% {
            transform: translate(-7px, 2px) rotate(1deg);
        }
        30% {
            transform: translate(5px, 3px) rotate(0deg);
        }
        40% {
            transform: translate(1px, -1px) rotate(1deg);
        }
        50% {
            transform: translate(-13px, 8px) rotate(-1deg);
        }
        60% {
            transform: translate(-6px, 5px) rotate(0deg);
        }
        70% {
            transform: translate(13px, 5px) rotate(-1deg);
        }
        80% {
            transform: translate(-6px, -4px) rotate(1deg);
        }
        90% {
            transform: translate(5px, 7px) rotate(0deg);
        }
        100% {
            transform: translate(10px, -12px) rotate(-1deg);
        }
    } */

    @keyframes glow {
        from {
            box-shadow: 
            0 0 10px 5px #6f2dff94,
            0 0 30px 15px #4c00ff6d,
            0 0 50px 25px #8800ff6f;
        }
        to {
            box-shadow: 
            0 0 40px 20px #6f2dff94,
             0 0 60px 30px #4c00ff6d,
             0 0 110px 60px #8800ff6f;
        }
    }

    #canvas1 {
        position: sticky;
        width: 360px;
        height: 500px;
        left: 30px;
        bottom: 69%;
        display: flex;
        z-index: 13;
        transform: rotate(90deg) rotateY(0deg);
    }

    #playerImage {
        display: none;
    }


</style>
