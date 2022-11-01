<script>

    import { allKidsBooksRead, adolescenceBooksRead, primaryBooksRead, mobilityBooksRead, informativeBooksRead} from "../../stores";
    import { onMount } from "svelte";
    import Smoke from './Smoke.svelte'

    let key = "";
    let girlTransform = 0

    // TODO:
    // - girl transforms after placing down last book in category
    // - get award after transforming/storyline
    // - save progress in localstorage
    // -smoke sprite canvas and girls canvas gets in the way for clicking books


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
                this.width = 550.2;
                this.height = 775;
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

    $:  if ($allKidsBooksRead === true){
        transformAvatar = true
        girlTransform = 1
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 1000);
    } 

    $: if($adolescenceBooksRead === true){
        girlTransform = 2
        transformAvatar = true
        console.log(girlTransform)
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 1000);
    }

    $: if($mobilityBooksRead === true){
        girlTransform = 3
        transformAvatar = true
        console.log(girlTransform)
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 1000);
    }

    $: if($primaryBooksRead === true){
        girlTransform = 4
        transformAvatar = true
        console.log(girlTransform)
        setTimeout(() => {
            transformAvatar = false
            avatarSpriteAnimation()
        }, 1000);
    }

    $: console.log(girlTransform, transformAvatar)

    // add abilities to screen
    // 

        
</script>


<canvas id="canvas1" />
<img
    class="forward"
    src="../images/spritesheet.png"
    alt="player"
    id="playerImage"            
/>

<Smoke transformAvatar={transformAvatar}/>
<svelte:window
    on:keydown={(e) => (key = e.key)}
    on:load={avatarSpriteAnimation}
/>

<style>

    #canvas1 {
        /* border: 5px solid black; */
        position: sticky;
        width: 200px;
        height: 400px;
        /* top: 150px; */
        left: 80px;
        bottom: 60%;
        display: flex;
        z-index: 13;
        transform: rotate(90deg) rotateY(0deg);
    }

    #playerImage {
        display: none;
    }
   
</style>