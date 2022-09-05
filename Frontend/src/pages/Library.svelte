<!-- 
    OBS: everything that is in Library.svelte has a transform: rotate(90deg) in their own components to turn them the correct way.
 -->

<script>
   	import { onMount } from 'svelte'
    // import MeetSven from "../components/MeetSven.svelte";
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

    let number = 0
    let timeOut

    // auto focuses the library so that the keyboard can be used to move around aswell
    onMount(() => wrapperElem.focus())

    $: intersecting ? $checkPoint = $checkPoint = 0 : ''

    $: console.log(key, scrollingY, scrollingX)
    $: console.log($checkPoint)

    const moveRightMobile = (e) => {
        if(e.target.id === 'moveRightBtn'){
            timeOut = setInterval(() => {
                if (e.type === 'pointerdown'){
                    number += 1
                    console.log(number)
                }
                window.scrollBy(number, 0)
            }, 500);
        }    
        console.log(e.type)
    }

    const moveLeftMobile = (e) => {
        if(e.target.id === 'moveLeftBtn'){
            timeOut = setInterval(() => {
                if (e.type === 'pointerdown'){
                    number -= 1
                    console.log(number)
                }
            }, 500)
        }
    }

    const stopMovement = (e) => {
        if(e.type === 'pointerup'){
            clearInterval(timeOut)
        }
        console.log(e.type)
    }


</script>

<div class="rotate-animation" >
    <video autoplay muted loop id="rotate-device">
        <source src="../images/rotate-device.mp4" type="video/mp4">
    </video>
    <p id="rotate-phone-message">please rotate your device</p>
</div>

<!-- <InterSectionObserver {element} bind:intersecting> -->
   
    <div class="horizontal-scroll-wrapper" >

        <!-- wrapper is a button element so that it can be autofocused for accessibility purposes like moving with keyboard -->
        <button class="wrapper" bind:this={wrapperElem} data-point={$checkPoint} alt="Background created by Inga Viitanen">

            <div class="buttons">

                <button 
                id="moveLeftBtn"
                on:pointerdown={(e) => moveLeftMobile(e)} 
                on:pointerup={(e) => stopMovement(e)} 
                ></button>

                <button 
                id="moveRightBtn" 
                on:pointerdown={(e) => moveRightMobile(e)} 
                on:pointerup={(e) => stopMovement(e)} 
                ></button>

            </div>

            <div class="avatar"></div>
            
            <!-- <MeetSven /> -->
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
<!-- </InterSectionObserver> -->


<svelte:window bind:scrollX={scrollingX} bind:scrollY={scrollingY} on:keydown={e => key = e.key}/> 

<style>

.buttons{
        position: sticky;
        top: 1px;
        right: 1px;
        height: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

   #moveRightBtn{
    /* position: sticky; */
    /* top: 860px;
    right: 160px; */
    transform: rotate(90deg);
    border: none;
    background: url(../images/arrow.png) no-repeat;
    height: 70px;
    width: 70px;
    opacity: 0.7;
    margin-left: 150px;
   }

   #moveLeftBtn{
    /* position: sticky; */
    /* top: -5px;
    left: 190px; */
    transform: rotate(-90deg);
    border: none;
    background: url(../images/arrow.png) no-repeat;
    height: 70px;
    width: 50px;
    opacity: 0.7;
    margin-left: 150px;
   }

   #moveRightBtn:active, #moveLeftBtn:active{
    opacity: 1;
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
        height: 2380px;
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
    }

    .wrapper{
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
        top: -40px;
        text-align: center;
        font-size: 1.5em;
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
    }

    @media (hover: hover){
        #moveLeftBtn, #moveRightBtn, .buttons{
            display: none;
        }
    }




</style>