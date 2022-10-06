<script>

    // TODO:
    // - add sven sprite
    // - talk to sven to be able to continue 

    import InterSectionObserver from "svelte-intersection-observer";
    import {checkPoint} from "../stores"

    let element
    let intersecting
    let svenSprite = '../images/sven-sprite-01-01.png'


    // let chatWithSven = "";

    // $: secondsLeft = 10;

    // const interval = setInterval(() => {
    //     svenSaysHello()
    //     if(secondsLeft <= 0){
    //     clearInterval(interval);
    // }
    // secondsLeft -= 1;
    // }, 1000);

    // const svenSaysHello = () => {
    //     if(secondsLeft === 9){
    //     chatWithSven = "Hello you !"
    //     }else if(secondsLeft === 6){
    //     chatWithSven = "Scroll to move around."
    //     } else if(secondsLeft === 3){
    //     chatWithSven = "Click on the books to read."
    //     } 
    // };

    // const talkToSvenAgain = () => {
    //     secondsLeft = 10;
    //     if(secondsLeft === 10){
    //         setInterval()
    //     }
    // }

    $: console.log('checkpoint', intersecting ? $checkPoint = $checkPoint = 0 : '')

</script>

<InterSectionObserver {element} bind:intersecting>
<section id="lobby">
<div class="welcome clickSven" >
    <div></div>
    <div class="box" bind:this={element}>
        <!-- <p class={(chatWithSven !== "" ? "speech-bubble" : "")} value={secondsLeft}>{chatWithSven}</p> -->
        <!-- <iframe src="https://embed.lottiefiles.com/animation/7249"></iframe> -->
        <!-- <button class="clickSven" on:click={() => talkToSvenAgain()}>talk to Sven again</button> -->
        <!-- <canvas id="svenCanvas" /> -->
        <img src={svenSprite} alt="sven" id="svenImg" />
    </div>
</div>
</section>
</InterSectionObserver>

<!-- <svelte:window on:load={loadSven} /> -->

<style>

    /* #svenCanvas{
        position: absolute;
        width: 120px;
        height: 140px;
        z-index: 15;
        rotate: 90deg;
        border: 1px solid black;
    } */

    #svenImg{
        height: 175px;
        width: 256px;
    }



    section{
        position: absolute;
		/* width: 100vh; */
		/* height: 100%; */
		top: 0px;
		left: 0px;
		background: url(../images/cat-bg/bckg00-01.jpg) no-repeat;
		/* background-size: 100%; */
		width: 1128px;
		height: 1800px;
        /* width: 100%; */
        /* height: 100%; */
		background-size: contain;
    }
    .welcome{
        background-color: transparent;
        height: 1px;
        /* display: grid; */
        /* grid-template-rows: 350px 300px 300px 300px; */
        /* translate: 0 -2300px; */
        position: absolute;
        top: 40%;
        left: 20px;
    }

    .box{
        transform: rotate(90deg);
        width: 140px;
        height: 100px;
        background-color: transparent;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* .speech-bubble{
        position: absolute;
        top: 0;
        padding: 2em 1em;
        background-color: white;
        border-radius: 2em;
        border: 3px solid black;
        color: black;
    } */


/* button{
    cursor: pointer;
    margin: 0;
} */


    /* iframe{
        border: none;
        margin: 4em 0;
    } */

    ::-webkit-scrollbar {
    display: none;
    }

    /* @media (hover: hover){ */

        /* .welcome{
            grid-template-rows: 600px 300px 300px 300px;
        
        } */
        /* .box{
            width: 340px;
            height: 300px;
        } */
    /* } */

    @media only screen and (max-width: 1200px){
        section{
            width: 100%;
		    height: 250%;
            /* box-shadow: 0px 0 100px 0 rgb(0, 0, 0); */
        }

        .welcome{
            top: 30%;
        }
    }

    @media only screen and (max-height: 425px){
        section{
            width: 1000px;
            height: 1250px;
        }

        .welcome{
            top: 40%;
        }
    }

    @media only screen and (max-height: 390px){
        section{
            height: 1150px;
        }
    }
    @media only screen and (max-height: 375px){
        section{
            height: 1110px;
        }
    }
    @media only screen and (max-height: 345px){
        section{
            height: 1020px;
        }
    }
    @media only screen and (max-height: 325px){
        section{
            height: 960px;
        }
    }
</style>