<script>
     import InterSectionObserver from "svelte-intersection-observer";
     import {checkPoint} from "../stores"

    let element
    let intersecting

    let chatWithSven = "";

    $: secondsLeft = 10;

    const interval = setInterval(() => {
        svenSaysHello()
        if(secondsLeft <= 0){
        clearInterval(interval);
    }
  secondsLeft -= 1;
}, 1000);

    const svenSaysHello = () => {
        if(secondsLeft === 9){
        chatWithSven = "Hello you !"
        }else if(secondsLeft === 6){
        chatWithSven = "Scroll to move around."
        } else if(secondsLeft === 3){
        chatWithSven = "Click on the books to read."
        } 
    };

    const talkToSvenAgain = () => {
        secondsLeft = 10;
        if(secondsLeft === 10){
            setInterval()
        }
    }

    $: console.log('checkpoint', intersecting ? $checkPoint = $checkPoint = 0 : '')

</script>

<InterSectionObserver {element} bind:intersecting>
<div class="welcome clickSven" id="lobby">
    <div></div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="box" bind:this={element}>
        <!-- <p class={(chatWithSven !== "" ? "speech-bubble" : "")} value={secondsLeft}>{chatWithSven}</p> -->
        <iframe src="https://embed.lottiefiles.com/animation/7249"></iframe>
        <!-- <button class="clickSven" on:click={() => talkToSvenAgain()}>talk to Sven again</button> -->
    </div>
</div>
</InterSectionObserver>

<style>
    .welcome{
        background-color: transparent;
        height: 1px;
        display: grid;
        grid-template-rows: 350px 300px 300px 300px;
    }

    .box{
        transform: rotate(90deg);
        width: 240px;
        height: 300px;
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


    iframe{
        border: none;
        margin: 4em 0;
    }

    ::-webkit-scrollbar {
    display: none;
    }

    @media (hover: hover){

        .welcome{
            grid-template-rows: 600px 300px 300px 300px;
        }
        .box{
            width: 340px;
            height: 300px;
        }
    }
</style>