<script>

    import { allKidsBooksRead} from "../../stores";
    import { fade } from 'svelte/transition';
    import { onMount } from "svelte";

    let key = "";
    let girlTransform = 0

    // TODO:
    // - add smoke sprite animation when transforming character
    // - girl transforms after placing down last book in category


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

    // so it loads the girl the first time you go to library
    onMount(() => avatarSpriteAnimation())

    // instead of window.addEventlistener('load' () => {})
    // the avatarSpriteAnimation function is connected to <svelte:window /> 
    const avatarSpriteAnimation = () => {
        const canvas = document.getElementById("canvas1");
        // console.log(canvas);
        const ctx = canvas.getContext("2d");
        // console.log(ctx);

        // const CANVAS_WIDTH = ()
        canvas.width = 292;
        // const CANVAS_HEIGHT = ()
        canvas.height = 411;

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
                    // console.log(e);
                    if (
                        e.deltaY === 100 ||
                        (e.deltaY === -100 &&
                            this.keys.indexOf(e.deltaY) === -1)
                    ) {
                        this.keys.push(e.deltaY);
                    } else {
                       
                    }
                    // console.log(e.deltaY, this.keys);
                });
            }
        }

        class Player {
            constructor(gameWidth, gameHeight) {
                this.gameWidth = gameWidth;
                this.gameHeight = gameHeight;
                this.width = 291.6;
                this.height = 410.7;
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

    let transformAvatar = false

    $: if ($allKidsBooksRead === true){
        // TODO:
        // add some glittersmoke animation on top of girl when she transforms
        transformAvatar = true
        girlTransform = 1
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 2000);
    }

    $: console.log(girlTransform)



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


        
</script>


<canvas id="canvas1" />
<img
    class="forward"
    src="../images/transformation-spritesheet-02-1.png"
    alt="player"
    id="playerImage"            
/>

<div in:fade out:fade class={"glitter-smoke " + (transformAvatar ? 'visible' : '')} ></div>/> 


<svelte:window
    on:keydown={(e) => (key = e.key)}
    on:load={avatarSpriteAnimation}
/>

<style>
    .glitter-smoke{
        background-color: #6f2dff;
        position: sticky;
        width: 200px;
        height: 200px;
        border-radius: 200px;
        /* top: 150px; */
        left: 100px;
        bottom: 770px;
        display: flex;
        z-index: 5;
        transform: rotate(90deg) rotateY(0deg);
        /* display: none; */
        box-shadow:
    	0 0 50px 50px #6f2dff,  /* inner  */
    	0 0 80px 80px #4c00ff9f, /* middle  */
    	0 0 100px 100px #8800ff90; /* outer */
        scale: 0;
        transition: all 1s;
		/* animation: glow 2s ease-in-out infinite alternate; */
    }

    .glitter-smoke.visible{
        display: block;
        scale: 1.3;
        transition-duration: 1s;
        animation: shake 1s;
		animation-iteration-count: infinite;
    }

    @keyframes shake {
  0% { transform: translate(5px, 5px) rotate(0deg); }
  10% { transform: translate(-5px, -4px) rotate(-1deg); }
  20% { transform: translate(-7px, 2px) rotate(1deg); }
  30% { transform: translate(5px, 3px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-13px, 8px) rotate(-1deg); }
  60% { transform: translate(-6px, 5px) rotate(0deg); }
  70% { transform: translate(13px, 5px) rotate(-1deg); }
  80% { transform: translate(-6px, -4px) rotate(1deg); }
  90% { transform: translate(5px, 7px) rotate(0deg); }
  100% { transform: translate(10px, -12px) rotate(-1deg); }
}

    @keyframes glow {
		from{
			box-shadow:
    		0 0 10px 5px #6f2dff94,  /* inner  */
    		0 0 30px 15px #4c00ff6d, /* middle  */
    		0 0 50px 25px #8800ff6f; /* outer */
		}
		to{
			box-shadow:
    		0 0 40px 20px #6f2dff94,  /* inner  */
    		0 0 60px 30px #4c00ff6d, /* middle  */
    		0 0 110px 60px #8800ff6f;; /* outer  */
		}
	}

    #canvas1 {
        /* border: 5px solid black; */
        position: sticky;
        width: 292px;
        height: 411px;
        /* top: 150px; */
        left: 80px;
        bottom: 670px;
        display: flex;
        z-index: 3;
        transform: rotate(90deg) rotateY(0deg);
    }

    #playerImage {
        display: none;
    }
   
</style>