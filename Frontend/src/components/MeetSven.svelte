<script>

    // BUG: buttons are hard to click 

    import Sven from "./spriteAnimations/Sven.svelte"; 
    import InterSectionObserver from "svelte-intersection-observer";
    import {checkPoint, hasTalkedToSven} from "../stores"

    let element
    let intersecting
    let svenChat = ''
    let girlChat = ''
    let talkToSven = false
    let nextChat = 0
    let btnText = ''

    const talk = () => {
        talkToSven = !talkToSven
        if(talkToSven){
            $hasTalkedToSven += 1
        }
    }

    const handleNext = () => {
        nextChat += 1;
        console.log(nextChat)
    }

    $: if(talkToSven){
        nextChat = 1
        svenChat = 'Hello there! I am so happy you are here! I seem to have misplaced some books in the library and I need you to help me find them.'
        btnText = 'next ->'
    }

    $: if(nextChat === 2){
        girlChat = 'I would love to help you!'
    } else if(nextChat === 3){
        svenChat = 'I am forever grateful! If you just SCROLL deeper into the library, I am sure you will have no trouble in finding them along the way. If scrolling makes movement too quick for your taste, you are welcome to PRESS DOWN and slow things around.'
        btnText = 'continue ->'
    }
    
    $: if( nextChat > 3){
        talkToSven = false
        nextChat = 0
    }

    $: console.log('checkpoint', intersecting ? $checkPoint = $checkPoint = 0 : '')

</script>

<InterSectionObserver {element} bind:intersecting>
<section id="lobby">
<div class="welcome clickSven" >
    {#if !talkToSven}
    <button class={"talk-to-sven " + ($hasTalkedToSven >= 1 ? 'stopAnimation' : '')} on:click={talk}>Talk to Sven</button>
    {:else}
    {#if nextChat === 2}
    <img id="girl-speech" src='../images/speech-bubble-reversed.png' alt="">
    <!-- <div id="girl-speech"></div> -->
        <p class="girl-chat">{girlChat}</p>
        <button id="girl-button" class="nextBtn" on:click={handleNext}>{'next ->'}</button>
    {:else}
    <img id="sven-speech" class={(nextChat === 3 ? 'last' : '')} src="../images/speech-bubble.png" alt="">
        <p class={"sven-chat " + (nextChat === 3 ? 'last-chat' : '')}>{svenChat}</p>
        <button id="sven-button" class={"nextBtn " + (nextChat === 3 ? 'continue' : '')} on:click={handleNext}>{btnText}</button>
    {/if}
    {/if}
    <div class="box" bind:this={element}>
        <Sven nextChat={nextChat}/>
    </div>
</div>
</section>
</InterSectionObserver>

<style>
    section{
        position: absolute;
		top: 0px;
		left: 0px;
		background: url(../images/cat-bg/bckg00-01.jpg) no-repeat;
		width: 1128px;
		height: 1800px;
		background-size: contain;
    }
    .welcome{
        background-color: transparent;
        height: 100px;
        position: absolute;
        top: 40%;
        left: 40px;
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

    button{
        cursor: pointer;
        rotate: 90deg;
        position: absolute;
        top: 40%;
        left: 140px;
        width: 120px;
        /* z-index: ; */
    }

    .talk-to-sven{
        font-family: "Cabin Sketch", cursive;
        font-size: 1.2em;
        padding: 10px;
        background-color: #222;
        border: 2px solid #fff;
        /* border-radius: 90px; */
        color: #fff;
        width: 105%;
        animation: jump 0.8s ease-in-out infinite alternate;
        transition: all 0.4s;
    }

    .talk-to-sven:hover{
        scale: 1.1;
    }

    .talk-to-sven.stopAnimation{
        animation: none;
    }

    @keyframes jump {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(5px, 5px) rotate(5deg); }
    50% { transform: translate(0, 0) rotate(0deg); }
    75% { transform: translate(-5px, 5px) rotate(-5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
    }

    .nextBtn{
        width: 120px;
        cursor: pointer;
        background: transparent;
        border: none;
        margin-top: 30px;
        text-align: center;
        rotate: 0deg;
        color: gold;
        font-size: 1.3em;
        z-index: 15;
    }

    .nextBtn.continue{
        top: -40px;
        left: 150px;
        width: 150px;
    }

    #sven-speech{
        rotate: 90deg;
        position: absolute;
        top: -150px;
        left: 50px;
        width: 320px;
        height: 270px;
        padding: 40px;
        z-index: 2;
    }

    #sven-speech.last{
        top: -180px;
        left: 70px;
        width: 350px;
        height: 300px;
    }

    .sven-chat{
        rotate: 90deg;
        position: absolute;
        top: -30px;
        left: 140px;
        font-size: 1.2em;
    }

    .sven-chat.last-chat{
        font-size: 1em;
        top: -65px;
        left: 180px;
    }

    #sven-button{
        rotate: 90deg;
        position: absolute;
        top: -10px;
        left: 140px;
    }

    #sven-button.continue{
        left: 150px;
        top: -40px;
    }

    #girl-speech{
        rotate: 90deg;
        position: absolute;
        top: -400px;
        left: 180px;
        width: 250px;
        height: 200px;
        padding: 40px;
        /* background: url('../images/speech-bubble-reversed.png') no-repeat; */
        /* background-size: contain; */
        z-index: 2;
    }

    .girl-chat{
        rotate: 90deg;
        position: absolute;
        top: -360px;
        left: 170px;
        width: 250px;
        height: 200px;
        font-size: 1.7em;
    }

    #girl-button{
        rotate: 90deg;
        position: absolute;
        top: -260px;
        left: 255px;
    }

    p{
        text-align: center;
        /* margin: -17px 0px; */
        width: 270px;
        font-size: 0.8em;
        letter-spacing: 1px;
        z-index: 5;
    }

    ::-webkit-scrollbar {
    display: none;
    }

    @media only screen and (max-width: 1200px){
        section{
            width: 100%;
		    height: 250%;
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