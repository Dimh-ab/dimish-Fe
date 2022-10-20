<script>

    // TODO:
    // - talk to Sven to be able to continue 
    // - first category becomes visible after talking with Sven
    // - button moves first time before talking to sven, after it is static
    // - styling

    // BUG: buttons are hard to click because of speech bubble images?

    import Sven from "./spriteAnimations/Sven.svelte"; 
    import InterSectionObserver from "svelte-intersection-observer";
    import {checkPoint} from "../stores"

    let speechBubble = '../images/speech-bubble.png'

    let element
    let intersecting
    let svenChat = ''
    let girlChat = ''
    let talkToSven = false
    let nextChat = 0
    let btnText = ''

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
    <button on:click={() => (talkToSven = !talkToSven)}>Talk with Sven</button>
    {:else}
    {#if nextChat === 2}
    <div id="girl-speech">
        <p>{girlChat}</p>
        <button class="nextBtn" on:click={handleNext}>{'next ->'}</button>
    </div>
    {:else}
    <div id="sven-speech">
        <p>{svenChat}</p>
        <button class="nextBtn" on:click={handleNext}>{btnText}</button>
    </div>
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
        height: 1px;
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
        z-index: 10;
    }

    .nextBtn{
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

    #sven-speech{
        rotate: 90deg;
        position: absolute;
        top: -110px;
        left: 80px;
        width: 250px;
        height: 200px;
        padding: 40px;
        background: url('../images/speech-bubble.png') no-repeat;
        background-size: contain;
        z-index: 2;
    }

    #girl-speech{
        rotate: 90deg;
        position: absolute;
        top: -400px;
        left: 180px;
        width: 250px;
        height: 200px;
        padding: 40px;
        background: url('../images/speech-bubble-reversed.png') no-repeat;
        background-size: contain;
        z-index: 2;
    }

    p{
        text-align: center;
        /* margin: -17px 0px; */
        width: 270px;
        font-size: 0.8em;
        letter-spacing: 1px;
        
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