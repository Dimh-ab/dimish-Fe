
<!-- 
    OBS: everything that is in Library.svelte has a transform: rotate(90deg) in their own components to turn them the correct way.
 -->
<script>
   	import { onMount } from 'svelte'
    import Ending from '../components/Ending.svelte'
    import MeetSven from "../components/MeetSven.svelte";
    import BarnOchUnga from "../components/categories/BarnOchUnga.svelte";
    import Ungdomar from "../components/categories/Ungdomar.svelte";
    import StödOchRörlighet from "../components/categories/StödOchRörlighet.svelte";
    import Primärvård from "../components/categories/Primärvård.svelte";
    import Informativt from "../components/categories/Informativt.svelte";
    import {checkPoint, allKidsBooksRead, hasTalkedToSven, adolescenceBooksRead, mobilityBooksRead, primaryBooksRead, informativeBooksRead, gotWand, story} from "../stores.js";
    import Girl from '../components/spriteAnimations/Girl.svelte'
    
    // senses if the element is in the viewport
    import InterSectionObserver from "svelte-intersection-observer";

    let element;
    let intersecting;
    let key = "";
    let wrapperElem;
    let scrollingY;
    let scrollingX;

    let rightCategory = ''
    let leftCategory = ''
    let leftGuide = ''
    let rightGuide = ''
    let IOSdevice = ''
    let fullscreenGuide = ''
    // let story = ''

    // auto focuses the library so that the keyboard can be used to move around aswell
    onMount(() => wrapperElem.focus());

    // changes storyline according to books being read
    $: if($allKidsBooksRead){
        $story = 'It seems reading books makes you get awards like these wings! Maybe you can use them to fly away in search for the rest of the books!'
    }
    $: if($adolescenceBooksRead){
        $story = 'WOW – you just got the spell casting ability! Just remember to cast some spells if you will be having trouble with finding Sven’s books!'
    }
    $: if($mobilityBooksRead){
        $story = 'You have been turning into quite a little fairy – first wings, then spell casting, and now fairy dust! I wonder if you will need to throw it in the next chapter to find those books!'
    }
    $: if($primaryBooksRead){
        $story = 'There seems to be some darkness approaching – good that you were awarded with the light. Keep on going and watch your step!'
    }
    $: if($informativeBooksRead){
        $story = 'You made it! You have found all Sven’s books and got the biggest award a fairy could wish for – a magic wand! Let us go and tell Sven about our adventures!!'
        setTimeout(() => {
            $gotWand = true
        }, 11000);
    }

    //controls the buttons you mmove with in mobile/Tablet view
    // changes storyline according to checkpoints
    $: if($checkPoint === 0){
        rightCategory = '#first-category'
        rightGuide = 'continue ->'
    } else if($checkPoint === 1){
        rightCategory = '#second-category'
        $story = 'It seems you have found some of Sven’s books! Best is to check them out to make sure you got the right ones!'
    }else if($checkPoint === 2){
        rightCategory = '#third-category'
    }else if($checkPoint === 3){
        rightCategory = '#fourth-category'
    }else if($checkPoint === 4){
        rightCategory = '#fifth-category'
    }


    $: if($checkPoint === 0){
        leftGuide = ''
    }else if($checkPoint === 1){
        leftCategory = '#lobby'
        leftGuide = '<- back to lobby'
    } else if($checkPoint === 2){
        leftCategory = '#first-category'
    }else if($checkPoint === 3){
        leftCategory = '#second-category'
    }else if($checkPoint === 4){
        leftCategory = '#third-category'
    }else if($checkPoint === 5){
        leftCategory = '#fourth-category'
    }

    //checks what device is being used
    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {    
    // console.log('This is a IOS device');
    fullscreenGuide = `För fullskärm: <br> 1. Vid webbläsarens adressfält finns en ikon 'aA'. <br> 2. Tryck på den och välj 'Göm verktygsfält'. <br> 3. Rotera skärmen.`
    IOSdevice = 'IOSdevice'
    } else {
    // console.log('This is Not a IOS device');
    fullscreenGuide = 'Rotera skärmen'
    IOSdevice = ''
    }


</script>

<div class="rotate-animation" >
    <video autoplay muted loop id="rotate-device">
        <source src="../images/rotate-device.mp4" type="video/mp4">
    </video>
    <p id="rotate-phone-message" class={IOSdevice}>{@html fullscreenGuide}</p>
</div>


<!-- <InterSectionObserver {element} bind:intersecting> -->
    
    {#if $gotWand}
    <Ending />
    {/if}
    <div class="horizontal-scroll-wrapper" >
        <!-- {:else} -->

        <!-- wrapper is a button element so that it can be autofocused for accessibility purposes like moving with keyboard -->
        <button class="wrapper" bind:this={wrapperElem} data-point={$checkPoint} alt="Background">


                <a href={leftCategory} class="moveButtons">
                    <button id="moveLeftBtn">{leftGuide}</button>
                </a>

                <a href={rightCategory} class="moveButtons">
                    <button id="moveRightBtn">{rightGuide}</button>
                </a>

                <Girl />

                <div class="imageQue">

                    <MeetSven />
                    
                        <div class="transition" />
                    
                    <!-- {#if $hasTalkedToSven >= 1} -->
                    <BarnOchUnga key={key}/>
                    <!-- {/if} -->

                        <div class="transition" />
                    
                    {#if $allKidsBooksRead === true}
                    <Ungdomar key={key}/>
                    {/if}

                    <div class="transition" />
                    
                    {#if $adolescenceBooksRead === true}
                    <StödOchRörlighet key={key}/>
                    {/if}

                        <div class="transition" />

                    {#if $mobilityBooksRead === true}
                    <Primärvård key={key}/>
                    {/if}

                        <div class="dark-transition" />
                    
                    {#if $primaryBooksRead === true}
                    <Informativt key={key}/>   
                    {/if}
                    
                </div>
        </button>
        <!-- {/if} -->
    </div>


<!-- </InterSectionObserver> -->

<svelte:window
    bind:scrollX={scrollingX}
    bind:scrollY={scrollingY}
    on:keydown={(e) => (key = e.key)}
/>


<style>

    .imageQue{
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        grid-template-rows: 100vw 98vh 100vw 98vh 100vw 98vh 100vw 98vh 100vw 98vh 100vw;
        grid-template-columns: 100vw;
    }

    .transition{
        background: url(../images/transition.png) no-repeat;
		width: 100%;
		height: 100%;
        background-size: contain;
    }

    .dark-transition{
        background: url(../images/transition.png) no-repeat rgba(0, 0, 0, 0.65);
		width: 100%;
		height: 100%;
        background-size: contain;
        background-blend-mode: overlay;
    }

    /* .transition1{
        background: url(../images/transition.png) no-repeat;
		width: 100%;
		height: 100%;
        background-size: contain;
    } */

    .moveButtons{
        z-index: 100;
    }


   #moveRightBtn{
    position: sticky;
    top: 0;
    bottom: 0;
    transform: rotate(90deg);
    border: none;
    background: transparent;
    height: 150px;
    width: 150px;
    color: gold;
    /* margin-left: -50px; */
    z-index: 10;
    translate: -100px 0px;
    }

   #moveLeftBtn{
    position: sticky;
    top: 0;
    bottom: 0;
    transform: rotate(90deg);
    border: none;
    background: transparent;
    color: gold;
    height: 150px;
    width: 150px;
    /* margin-left: -50px; */
    z-index: 10;
    translate: 50px -600px;
   }

   #moveRightBtn:active, #moveLeftBtn:active{
    color: gold;
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
        scroll-behavior: smooth;
    }


    .wrapper {
        /* background: url(../images/wide-2-01.jpg); */
        /* background-size: 100%; */
        /* background: linear-gradient(to right, #022B25 55%, #62A7A0 45%); */
        /* background-color: #022B25; */
        background-color: #000;
        z-index: -1;
        width: 100vh;
        height: 25000px;
        border: none;
    }


    /* .wrapper[data-point="0"]{C9BFAA 62A7A0
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

    .rotate-animation{
        background-color: transparent;
        position: relative;
        top: 380px;
        z-index: 1000;
    }

    #rotate-phone-message{
        position: absolute;
        left:0;
        right: 0;
        top: -80px;
        text-align: center;
        font-size: 1.5em;
        background-color: aliceblue;
        padding: 0.5em 2em;
    }

    #rotate-phone-message.IOSdevice{
        top: -220px
    }

    #rotate-device{
        border: 5px solid rgba(0, 0, 0, 0.53);
        border-radius: 350px;
        width: 200px;
        margin: auto;
        position: absolute;
        left:0;
        right: 0;
    }

    @media (orientation: landscape){

        .rotate-animation, #rotate-device,  #rotate-phone-message{
            display: none;
        }
    }

    @media (hover: hover){
        #moveLeftBtn, #moveRightBtn{
            display: none;
        }
    }

    @media only screen and (max-width: 1200px){

        .wrapper{
            height: 25000px;
        }
        #moveLeftBtn{
            translate: 50px -1010px;
        }
    }

    @media only screen and (max-width: 1030px){
        #moveLeftBtn{
            translate: 50px -850px;
        }
    }

    @media only screen and (max-width: 920px){
        #moveLeftBtn{
            translate: 50px -755px;
        }
        #moveRightBtn{
            translate: -100px 10px;
        }
    }

    @media only screen and (max-width: 844px){
        #moveLeftBtn{
            translate: 50px -690px;
        }
    }

    @media only screen and (max-width: 768px){
        #moveLeftBtn{
            translate: 50px -610px;
        }
    }
    @media only screen and (max-width: 680px){
        #moveLeftBtn{
            translate: 50px -510px;
        }
    }


</style>
