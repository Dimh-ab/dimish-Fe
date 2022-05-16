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
    import Background from "../components/Background.svelte"

    // senses if the element is in the viewport
    import InterSectionObserver from "svelte-intersection-observer";

    let element
    let intersecting
    let key = ''
    let wrapperElem

    onMount(() => wrapperElem.focus())

    // $: console.log(key)

    // $: console.log('element', element)
    // $: console.log('intersecting', intersecting)

    let scrollingY

    // $: console.log('scrollingY', scrollingY)

</script>

<InterSectionObserver {element} bind:intersecting>
   
    <div class="horizontal-scroll-wrapper">

        <!-- wrapper is a button element so that it can be autofocused for accessibility purposes like moving with keyboard -->
        <button class={"wrapper " + (intersecting ? "overlay" : "")} bind:this={wrapperElem} >

            <div class="avatar">👀</div>
            
            <MeetSven />

            <section bind:this={element} class="first-category">
                {#if intersecting}
                <!-- <p>Open all the books to get your wings!</p> -->
                    <BarnOchUnga key={key}/>
                    {/if}
            </section>

                <Ungdomar />
                <StödOchRörlighet />
                <Primärvård />
                <Informativt />   

        </button>
    </div>
</InterSectionObserver>


<svelte:window bind:scrollY={scrollingY} on:keydown={e => key = e.key}/> 

<style>

    .avatar{
        position: sticky;
        width: 100px;
        height: 100px;
        background-color: aqua;
        top: 200px;
        left: 200px;
        z-index: 3;
        /* transition-duration: 5s; */
        transform: rotate(90deg);
        text-align: right;
    }

    .first-category{
        height: 2000px;
    }

    /* p{
        transform: rotate(90deg);
    } */


    *{
        box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}

    .horizontal-scroll-wrapper {
        background-color: transparent;
        width: 90vh;
        height: 100vw;
        /* overflow-y: auto;
        overflow-x: scroll; */
        overflow-x: hidden;
        transform: rotate(-90deg) translateY(-90vh);
        transform-origin: right top;
    }

    .wrapper{
        background: url(../images/temporaryBG5.svg);
        transition-duration: 3s;
        z-index: -1;
    }

    .wrapper.overlay{
        background: url(../images/temporaryBG5.svg), linear-gradient(rgba(143, 186, 0, 0.5),rgba(143,186,0,0.5));
        background-blend-mode: overlay;
        /* background: url();
        background-color: green;
        transition-duration: 3s; */
    }

    ::-webkit-scrollbar {
    display: none;
    }


</style>