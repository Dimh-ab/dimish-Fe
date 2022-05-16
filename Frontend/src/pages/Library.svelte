<!-- 
    OBS: everything that is in Library.svelte has a transform: rotate(90deg) in their own components to turn them the correct way.
 -->

<script>
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

    $: console.log('element', element)
    $: console.log('intersecting', intersecting)

    // let scrollingY

    // $: console.log('scrollingY', scrollingY)

</script>

<InterSectionObserver once {element} bind:intersecting>
    <!-- <Background /> -->
    <!-- <div class="bg-loop" alt="background"></div>  -->
    <div class="horizontal-scroll-wrapper">

            <div class="avatar">👀</div>
            <MeetSven />
            <section bind:this={element} class="first-category">
                {#if intersecting}
                <!-- <p>Open all the books to get your wings!</p> -->
                <!-- <div class={"something " + (intersecting ? "blue" : "")}> -->
                    <BarnOchUnga />
                {/if}
            </section>
                    <Ungdomar />
                    <StödOchRörlighet />
                    <Primärvård />
                    <Informativt />
        <!-- </div>  -->

    <!-- {/if} -->
        </div>
</InterSectionObserver>


<!-- <svelte:window bind:scrollY={scrollingY} bind:scrollX={x} />  -->

<style>

    /* .bg-loop{
        background-size: cover;
        background: url(../images/temporaryBG.svg);
        position:absolute;
        width: 1000px;
        height: 1000px;
     } */

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

    ::-webkit-scrollbar {
    display: none;
    }


</style>