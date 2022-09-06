<!-- 
    OBS: everything that is in Library.svelte has a transform: rotate(90deg) in their own components to turn them the correct way.
 -->

<script>
   	import { onMount } from 'svelte'
    import MeetSven from "../components/MeetSven.svelte";
    import BarnOchUnga from "../components/categories/BarnOchUnga.svelte";
    import Ungdomar from "../components/categories/Ungdomar.svelte";
    import StödOchRörlighet from "../components/categories/StödOchRörlighet.svelte";
    import Primärvård from "../components/categories/Primärvård.svelte";
    import Informativt from "../components/categories/Informativt.svelte";
    import {checkPoint} from "../stores.js";

    // senses if the element is in the viewport
    import InterSectionObserver from "svelte-intersection-observer";

    let element
    let intersecting
    let key = ''
    let wrapperElem
    let scrollingY
    let scrollingX

    let rightCategory = ''
    let leftCategory = ''
    let leftGuide = ''
    let rightGuide = ''
    let IOSdevice = ''
    let fullscreenGuide = ''

    // let number = 0
    // let timeOut

    // auto focuses the library so that the keyboard can be used to move around aswell
    onMount(() => wrapperElem.focus())

    $: intersecting ? $checkPoint = $checkPoint = 0 : ''

    // $: console.log(key, scrollingY, scrollingX)
    // $: console.log($checkPoint)

    $: if($checkPoint === 0){
        rightCategory = '#first-category'
        rightGuide = 'continue ->'
    } else if($checkPoint === 1){
        rightCategory = '#second-category'
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

    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {    
    console.log('This is a IOS device');
    fullscreenGuide = `För fullskärm: <br> 1. Vid webbläsarens adressfält finns en ikon 'aA'. <br> 2. Tryck på den och välj 'Göm verktygsfält'. <br> 3. Rotera skärmen.`
    IOSdevice = 'IOSdevice'
    } else {
    console.log('This is Not a IOS device');
    fullscreenGuide = 'Rotera skärmen'
    IOSdevice = ''
    }

    // const moveRightMobile = (e) => {
    //     if(e.target.id === 'moveRightBtn'){
    //         timeOut = setInterval(() => {
    //             if (e.type === 'pointerdown'){
    //                 number += 1
    //                 console.log(number)
    //             }
    //             window.scrollBy(number, 0)
    //         }, 500);
    //     }    
    //     console.log(e.type)
    // }

    // const moveLeftMobile = (e) => {
    //     if(e.target.id === 'moveLeftBtn'){
    //         timeOut = setInterval(() => {
    //             if (e.type === 'pointerdown'){
    //                 number -= 1
    //                 console.log(number)
    //             }
    //         }, 500)
    //     }
    // }

    // const stopMovement = (e) => {
    //     if(e.type === 'pointerup'){
    //         clearInterval(timeOut)
    //     }
    //     console.log(e.type)
    // }

    // on:pointerdown={(e) => moveLeftMobile(e)} 
    // on:pointerup={(e) => stopMovement(e)} 


</script>

<div class="rotate-animation" >
    <video autoplay muted loop id="rotate-device">
        <source src="../images/rotate-device.mp4" type="video/mp4">
    </video>
    <p id="rotate-phone-message" class={IOSdevice}>{@html fullscreenGuide}</p>
</div>

<InterSectionObserver {element} bind:intersecting>
   
    <div class="horizontal-scroll-wrapper" >

        <!-- wrapper is a button element so that it can be autofocused for accessibility purposes like moving with keyboard -->
        <button class="wrapper" bind:this={wrapperElem} data-point={$checkPoint} alt="Background created by Inga Viitanen">

            <MeetSven />

                <a href={leftCategory}>
                    <button id="moveLeftBtn">{leftGuide}</button>
                </a>


                <div class="avatar"></div>


                <a href={rightCategory}>
                    <button id="moveRightBtn">{rightGuide}</button>
                </a>

            
        
            <section class="category">
                <div bind:this={element}></div>
            </section>

            <section class="category" >
                <BarnOchUnga key={key}/>
            </section>

            <section class="category" >
                <Ungdomar key={key}/>
            </section>

            <section class="category">
                <StödOchRörlighet key={key}/>
            </section>

            <section class="category">
                <Primärvård key={key}/>
            </section>

            <section class="category">
                <Informativt key={key}/>   
            </section>

        </button>
    </div>
</InterSectionObserver>


<svelte:window bind:scrollX={scrollingX} bind:scrollY={scrollingY} on:keydown={e => key = e.key}/> 

<style>


   #moveRightBtn{
    position: sticky;
    top: 720px;
    bottom: 0;
    transform: rotate(90deg);
    border: none;
    background: transparent;
    /* background: url(../images/arrow.png) no-repeat; */
    height: 150px;
    width: 150px;
    color: gold;
    margin-left: -50px;
    z-index: 10;
    }

   #moveLeftBtn{
    position: sticky;
    top: 0;
    left: 0;
    transform: rotate(90deg);
    border: none;
    background: transparent;
    color: gold;
    /* background: url(../images/arrow.png) no-repeat; */
    height: 150px;
    width: 150px;
    margin-left: -50px;
    z-index: 10;
   }

   #moveRightBtn:active, #moveLeftBtn:active{
    color: gold;
   }

    .avatar{
        position: sticky;
        width: 180px;
        height: 200px;
        background: url(../images/fairy.png);
        top: 150px;
        left: 70px;
        z-index: 3;
        transform: rotate(90deg) rotateY(180deg);
        text-align: right;
        background-size: cover;
    }

    .category{
        height: 1580px;
    }



    *{
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

    .wrapper{
        background: url(../images/bg-with-cat1.png); 
        background-size: 100%;
        /* transition: 3s; */
        z-index: -1;
        width: 100vh;
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

    @media (hover: none){
        .horizontal-scroll-wrapper {
            overflow-x: auto;
        }

        .category{
        height: 1000px;
        }
    }

    @media (hover: hover){
        #moveLeftBtn, #moveRightBtn{
            display: none;
        }
    }




</style>