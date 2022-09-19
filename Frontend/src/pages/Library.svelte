<!-- 
    OBS: everything that is in Library.svelte has a transform: rotate(90deg) in their own components to turn them the correct way.
 -->
<script>
    import { onMount } from "svelte";
    // import MeetSven from "../components/MeetSven.svelte";
    import BarnOchUnga from "../components/categories/BarnOchUnga.svelte";
    import Ungdomar from "../components/categories/Ungdomar.svelte";
    import StödOchRörlighet from "../components/categories/StödOchRörlighet.svelte";
    import Primärvård from "../components/categories/Primärvård.svelte";
    import Informativt from "../components/categories/Informativt.svelte";
    import { checkPoint } from "../stores.js";
    // senses if the element is in the viewport
    import InterSectionObserver from "svelte-intersection-observer";
    import { claim_text } from "svelte/internal";

    let element;
    let intersecting;
    let key = "";
    let wrapperElem;
    let scrollingY;
    let scrollingX;

    // auto focuses the library so that the keyboard can be used to move around aswell
    onMount(() => wrapperElem.focus());

    //ver1

    // window.addEventListener("load", () => {
    //     const canvas = document.getElementById("canvas1");
    //     console.log(canvas);
    //     const ctx = canvas.getContext("2d");
    //     console.log(ctx);

    //     // const CANVAS_WIDTH = ()
    //     canvas.width = 9306;
    //     // const CANVAS_HEIGHT = ()
    //     canvas.height = 1185;

    //     class InputHandler {
    //         constructor() {
    //             this.keys = [];
    //             window.addEventListener("keydown", (e) => {
    //                 console.log(e.key);
    //                 if (
    //                     (e.key === "ArrowDown" ||
    //                         e.key === "ArrowUp" ||
    //                         e.key === "ArrowLeft" ||
    //                         e.key === "ArrowRight") &&
    //                     this.keys.indexOf(e.key) === -1
    //                 ) {
    //                     this.keys.push(e.key);
    //                 }
    //                 console.log(e.key, this.keys);
    //             });

    //             window.addEventListener("keyup", (e) => {
    //                 console.log(e.key);
    //                 if (
    //                     e.key === "ArrowDown" ||
    //                     e.key === "ArrowUp" ||
    //                     e.key === "ArrowLeft" ||
    //                     e.key === "ArrowRight"
    //                 ) {
    //                     this.keys.splice(this.keys.indexOf(e.key), 1);
    //                 }
    //                 console.log(e.key, this.keys);
    //             });
    //
    //         }
    //     }

    //     class Player {
    //         constructor(gameWidth, gameHeight) {
    //             this.gameWidth = gameWidth;
    //             this.gameHeight = gameHeight;
    //             this.width = 550.2;
    //             this.height = 775;
    //             this.x = 0;
    //             this.y = this.gameHeight - this.height;
    //             this.image = document.getElementById("playerImage");
    //             this.frameX = 0;
    //             this.frameY = 0;
    //             this.fps = 6;
    //             this.frameTimer = 0;
    //             this.frameInterval = 1000 / this.fps;
    //             this.maxFrame = 4;
    //             this.speed = 0;
    //             this.vy = 0;
    //             this.weight = 1;
    //         }
    //         draw(context) {
    //             // context.fillRect(this.x, this.y, this.width, this.height);
    //             context.drawImage(
    //                 this.image,
    //                 this.frameX * this.width,
    //                 this.frameY * this.height,
    //                 this.width,
    //                 this.height,
    //                 this.x,
    //                 this.y,
    //                 this.width,
    //                 this.height
    //             );
    //         }
    //         update(input, deltaTime) {
    //             //sprite animation

    //             //controls
    //             if (input.keys.indexOf("ArrowRight") > -1) {
    //                 this.speed = 6;
    //                 if (this.frameTimer > this.frameInterval) {
    //                     if (this.frameX >= this.maxFrame) this.frameX = 0;
    //                     else this.frameX++;
    //                     this.frameTimer = 0;
    //                 } else {
    //                     this.frameTimer += deltaTime;
    //                 }
    //             } else if (input.keys.indexOf("ArrowLeft") > -1) {
    //                 this.speed = -5;
    //                 if (this.frameTimer > this.frameInterval) {
    //                     if (this.frameX >= this.maxFrame) this.frameX = 0;
    //                     else this.frameX++;
    //                     this.frameTimer = 0;
    //                 } else {
    //                     this.frameTimer += deltaTime;
    //                 }
    //             } else if (
    //                 input.keys.indexOf("ArrowUp") > -1 &&
    //                 this.onGround()
    //             ) {
    //                 this.vy -= 30;
    //             } else {
    //                 this.speed = 0;
    //             }

    //             //horizontal movement
    //             this.x += this.speed;
    //             if (this.x < 0) this.x = 0;
    //             else if (this.x > this.gameWidth - this.width)
    //                 this.x = this.gameWidth - this.width;
    //             //vertical movement
    //             this.y += this.vy;
    //             if (!this.onGround()) {
    //                 this.vy += this.weight;
    //                 this.maxFrame = 3;
    //                 this.frame = 2;
    //             } else {
    //                 this.vy = 0;
    //                 this.maxFrame = 5;
    //                 this.frame = 0;
    //             }
    //             if (this.y > this.gameHeight - this.height)
    //                 this.y = this.gameHeight - this.height;
    //         }
    //         onGround() {
    //             return this.y >= this.gameHeight - this.weight;
    //         }
    //     }

    //     class Background {
    //         constructor(gameWidth, gameHeight) {
    //             this.gameWidth = gameWidth;
    //             this.gameHeight = gameHeight;
    //             this.image = document.getElementById("backgroundImage");
    //             this.x = 0;
    //             this.y = 0;
    //             this.width = 9306;
    //             this.height = 1185;
    //             this.speed = 20;
    //         }
    //         draw(context) {
    //             context.drawImage(
    //                 this.image,
    //                 this.x,
    //                 this.y,
    //                 this.width,
    //                 this.height
    //             );
    //         }
    //         update() {
    //             this.x -= this.speed;
    //             if (this.x < 0 - this.width) this.x = 0;
    //         }
    //     }

    //     const input = new InputHandler();
    //     const player = new Player(canvas.width, canvas.height);
    //     const background = new Background(canvas.width, canvas.height);
    //     let lastTime = 0;
    //     // player.draw(ctx);
    //     // player.update();

    //     function animate(timeStamp) {
    //         const deltaTime = timeStamp - lastTime;
    //         lastTime = timeStamp;
    //         ctx.clearRect(0, 0, canvas.width, canvas.height);
    //         background.draw(ctx);
    //         // background.update();
    //         player.draw(ctx);
    //         player.update(input, deltaTime);
    //         requestAnimationFrame(animate);
    //     }
    //     animate(0);
    // });

    //ver2

    window.addEventListener("load", () => {
        const canvas = document.getElementById("canvas1");
        console.log(canvas);
        const ctx = canvas.getContext("2d");
        console.log(ctx);

        // const CANVAS_WIDTH = ()
        canvas.width = 600;
        // const CANVAS_HEIGHT = ()
        canvas.height = 800;

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

                window.addEventListener("wheel", (e) => {
                    console.log(e);
                    if (
                        e.deltaY === 100 ||
                        (e.deltaY === -100 &&
                            this.keys.indexOf(e.deltaY) === -1)
                    ) {
                        this.keys.push(e.deltaY);
                    } else {
                       
                    }
                    console.log(e.deltaY, this.keys);
                });
            }
        }

        class Player {
            constructor(gameWidth, gameHeight) {
                this.gameWidth = gameWidth;
                this.gameHeight = gameHeight;
                this.width = 550.2;
                this.height = 775;
                this.x = 0;
                this.y = this.gameHeight - this.height;
                this.image = document.getElementById("playerImage");
                this.frameX = 0;
                this.frameY = 0;
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
                    input.keys.indexOf(100) > -1
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
                    input.keys.indexOf(-100) > -1
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

        function animate(timeStamp) {
            const deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            player.draw(ctx);
            player.update(input, deltaTime);
            requestAnimationFrame(animate);
        }
        animate(0);
    });

    //ver3

    //  onMount( () => {
    // const girlAnimate = () =>
    // window.addEventListener("load", () => {
    //     let canvas = document.getElementById("canvas1");
    //     console.log(canvas);
    //     const ctx = canvas.getContext("2d");
    //     console.log(ctx);

    //     const CANVAS_WIDTH = (canvas.width = 600);
    //     const CANVAS_HEIGHT = (canvas.height = 800);

    //     const playerImage = new Image();
    //     console.log(playerImage);
    //     playerImage.src = "../images/spritesheet.png";
    //     const spriteWidth = 550.2;
    //     const spriteHeight = 775;
    //     let playerState = "girl";
    //     let playerState2= "fairy"
    //     // let frameX = 0;
    //     // let frameY = 0;
    //     let gameFrame = 0;
    //     const staggerFrames = 12;
    //     const spriteAnimations = [];
    //     const animationStates = [
    //         {
    //             name: "girl",
    //             frames: 5,
    //         },
    //         {
    //             name: "fairy",
    //             frames: 5,
    //         },
    //         {
    //             name: "flyup",
    //             frames: 4,
    //         },
    //         {
    //             name: "flydown",
    //             frames: 4,
    //         },
    //         {
    //             name: "fairydust",
    //             frames: 5,
    //         },
    //     ];
    //     animationStates.forEach((state, index) => {
    //         let frames = {
    //             loc: [],
    //         };
    //         for (let j = 0; j < state.frames; j++) {
    //             let positionX = j * spriteWidth;
    //             let positionY = index * spriteHeight;
    //             frames.loc.push({ x: positionX, y: positionY });
    //         }
    //         spriteAnimations[state.name] = frames;
    //     });

    //     console.log(spriteAnimations);

    //     class InputHandler {
    //         constructor() {
    //             this.keys = [];
    //             window.addEventListener("keydown", (e) => {
    //                 console.log(e.key);
    //                 if (
    //                     (e.key === "ArrowDown" ||
    //                         e.key === "ArrowUp" ||
    //                         e.key === "ArrowLeft" ||
    //                         e.key === "ArrowRight") &&
    //                     this.keys.indexOf(e.key) === -1
    //                 ) {
    //                     this.keys.push(e.key);
    //                 }
    //                 console.log(e.key, this.keys);
    //             });

    //             window.addEventListener("keyup", (e) => {
    //                 console.log(e.key);
    //                 if (
    //                     e.key === "ArrowDown" ||
    //                     e.key === "ArrowUp" ||
    //                     e.key === "ArrowLeft" ||
    //                     e.key === "ArrowRight"
    //                 ) {
    //                     this.keys.splice(this.keys.indexOf(e.key), 1);
    //                 }
    //                 console.log(e.key, this.keys);
    //             });

    //         }
    //     }

    //     const input = new InputHandler();

    //     function animate() {
    //         let position;
    //         let frameX;
    //         let frameY;

    //         ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //         if (input.keys.indexOf("ArrowDown") > -1 || input.keys.indexOf("ArrowUp") > -1) {
    //             position =
    //             Math.floor(gameFrame / staggerFrames) %
    //             spriteAnimations[playerState].loc.length;
    //             frameX = spriteWidth * position;
    //             frameY = spriteAnimations[playerState].loc[position].y;
    //         } else {
    //             position = 0 ;
    //             frameX = spriteWidth * position;
    //             frameY = spriteAnimations[playerState].loc[position].y;
    //         }

    //         ctx.drawImage(
    //             playerImage,
    //             frameX,
    //             frameY,
    //             spriteWidth,
    //             spriteHeight,
    //             0,
    //             0,
    //             spriteWidth,
    //             spriteHeight
    //         );

    //         /*             if (gameFrame % staggerFrames == 0) {
    //             if (frameX < 4) frameX++;
    //                 else frameX = 0;
    //         } */

    //         gameFrame++;
    //         requestAnimationFrame(animate);
    //     }
    //     animate();
    // });

    $: intersecting ? ($checkPoint = $checkPoint = 0) : "";

    $: console.log(key, scrollingY, scrollingX);
    $: console.log($checkPoint);

    const moveForward = () => {
        console.log("moving forward");
        scrollingX = scrollingX + 10;
        console.log(scrollingX);
    };
</script>

<!-- <InterSectionObserver {element} bind:intersecting> -->

<div class="horizontal-scroll-wrapper">
    <!-- wrapper is a button element so that it can be autofocused for accessibility purposes like moving with keyboard -->
    <button
        class="wrapper"
        bind:this={wrapperElem}
        data-point={$checkPoint}
        alt="Background created by Inga Viitanen"
    >
        <div class="forwardWrap">
            <button on:mousedown={moveForward} class="forward">forward</button>
        </div>
        <button class="backward">backward</button>

        <canvas id="canvas1" />
        <img
            class="forward"
            src="../images/spritesheet.png"
            alt="player"
            id="playerImage"            
        />
        <!--<img
            src="../images/wideframe-3.jpg"
            alt="background"
            id="backgroundImage"
        /> -->
        <!-- <div class="avatar" /> -->

        <!-- <MeetSven /> -->
        <section class="category">
            <div bind:this={element} />
        </section>

        <section class="category">
            <BarnOchUnga {key} />
        </section>

        <section class="category">
            <Ungdomar {key} />
        </section>

        <section class="category">
            <StödOchRörlighet {key} />
        </section>

        <section class="category">
            <Primärvård {key} />
        </section>

        <section class="category">
            <Informativt {key} />
        </section>
    </button>
</div>
<!-- </InterSectionObserver> -->

<svelte:window
    bind:scrollX={scrollingX}
    bind:scrollY={scrollingY}
    on:keydown={(e) => (key = e.key)}
/>

<style>
    .forward {
        position: absolute;
        left: 0;
    }

    /* #canvas1 {
         border: 5px solid black;  
        position: sticky;
        width: 600px;
        height: 800px;
        top: 150px;
         left: -530px; 
        display: flex;
        z-index: 3;
        transform: rotate(90deg) rotateY(0deg);
    } */

    #canvas1 {
        /* border: 5px solid black; */
        position: sticky;
        width: 600px;
        height: 800px;
        top: 150px;
        left: 50px;
        display: flex;
        z-index: 3;
        transform: rotate(90deg) rotateY(0deg);
    }

    #playerImage {
        display: none;
    }
    /* 
    .avatar {
        position: sticky;
        width: 180px;
        height: 200px;
        background: url(../images/sprite-07.jpg);
        top: 150px;
        left: 70px;
        z-index: 3;
        transform: rotate(90deg) rotateY(0deg);
        text-align: right;
        background-size: cover;
    }
 */
    .category {
        height: 2380px;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    .horizontal-scroll-wrapper {
        background-color: transparent;
        width: 100vh;
        height: 100vw;
        overflow-x: hidden;
        transform: rotate(-90deg) translateY(-100vh);
        transform-origin: right top;
    }

    .wrapper {
        background: url(../images/wide-2-01.jpg);
        background-size: 100%;
        /* transition: 3s; */
        z-index: -1;
        width: 100vh;
        /* height: 100vw; */
        border: none;
    }
    /* 
    .wrapper[data-point="0"]{
        background: url(../images/bckg00-01.jpg);        
        background-size: 101%;
    }

    .wrapper[data-point="1"]{
        background: url(../images/bckg01.jpg), linear-gradient(rgba(186, 0, 0, 0.4),rgba(186,0,0,0.4));
        background-size: 100%;
       
    }

    .wrapper[data-point="2"]{
        background: url(../images/bckg02.jpg), linear-gradient(rgba(178, 32, 240, 0.4),rgba(205, 26, 221, 0.4));
        background-size: 100%;
       
    }

    .wrapper[data-point="3"]{
        background: url(../images/bckg03.jpg), linear-gradient(rgba(107, 181, 255, 0.4),rgba(62, 171, 255, 0.4));
        background-size: 100%;
        background-blend-mode: overlay;
    }

    .wrapper[data-point="4"]{
        background: url(../images/bckg04.jpg), linear-gradient(rgba(108, 240, 32, 0.4),rgba(29, 221, 26, 0.4));
        background-size: 100%;
        background-blend-mode: overlay; 
    }

    .wrapper[data-point="5"]{
        background: url(../images/bckg05.jpg), linear-gradient(rgba(32, 240, 216, 0.4),rgba(26, 65, 221, 0.4));
        background-size: 100%;
    } */

    /* .wrapper[data-point="0"]{
        background: url(../images/bg4.jpg);        
        background-size: 100%;
    }

    .wrapper[data-point="1"]{
        background: url(../images/bg4.jpg);
        background-size: 100%;
         background-blend-mode: overlay; 
    }

    .wrapper[data-point="2"]{
        background: url(../images/bg4.jpg);
        background-size: 100%;
    }

    .wrapper[data-point="3"]{
        background: url(../images/bg4.jpg) center, linear-gradient(rgba(107, 181, 255, 0.2),rgba(62, 171, 255, 0.2));
         background-blend-mode: overlay; 
    }

    .wrapper[data-point="4"]{
        background: url(../images/bg4.jpg) center, linear-gradient(rgba(77, 111, 57, 0.2),rgba(29, 221, 26, 0.2));
        background-blend-mode: overlay;
    }

    .wrapper[data-point="5"]{
        background: url(../images/bg4.jpg) center, linear-gradient(rgba(32, 240, 216, 0.2),rgba(26, 65, 221, 0.2));
        background-blend-mode: overlay;
    } */

    ::-webkit-scrollbar {
        display: none;
    }

    /* @media (hover: none){
        .horizontal-scroll-wrapper {
            overflow-x: visible;
        }
    } */
</style>
