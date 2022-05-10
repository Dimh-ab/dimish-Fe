<!-- 
    OBS: everything that is in Library.svelte has a transform: rotate(90deg) in their own components to turn them the correct way.
 -->

<script>
    import Projects from "../components/Projects.svelte";
    import MeetSven from "../components/MeetSven.svelte";
    import BarnOchUnga from "../components/categories/BarnOchUnga.svelte";
    import Ungdomar from "../components/categories/Ungdomar.svelte";
    import StödOchRörlighet from "../components/categories/StödOchRörlighet.svelte";
    import Primärvård from "../components/categories/Primärvård.svelte";
    import Informativt from "../components/categories/Informativt.svelte";

    // senses if the element is in the viewport
    import InterSectionObserver from "svelte-intersection-observer";

    let element
    let intersecting

    $: console.log('element', element)
    $: console.log('intersecting', intersecting)

    // let scrollingY

    // $: console.log('scrollingY', scrollingY)

</script>

<!-- on:scroll={scrollHorizontal} -->
<InterSectionObserver {element} bind:intersecting>
    <!-- <main class={(scrollingY < 1 ? "horizontal-scroll-wrapper" : "")}> -->
    <main class="horizontal-scroll-wrapper">
    <!-- {#if !intersecting} -->
    <div class="avatar">👀</div>

    <MeetSven />
    <!-- <Projects /> -->
    <!-- <div bind:this={element}></div> -->
    <!-- {:else} -->
    <!-- <div bind:this={element} class="something"> -->
        <!-- {#if intersecting} -->
        <!-- <div class={"something " + (intersecting ? "blue" : "")}> -->
            <BarnOchUnga />
            <Ungdomar />
            <StödOchRörlighet />
            <Primärvård />
            <Informativt />
        <!-- </div> -->
        <!-- {/if} -->
    <!-- </div> -->
    <!-- {/if} -->
</main>
</InterSectionObserver>


<!-- <svelte:window bind:scrollY={scrollingY} bind:scrollX={x} />  -->

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

    .something{
        height: 1000px;
        /* margin: 0;
        padding: 0;
        z-index: 5; */
    }


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
        overflow-y: auto;
        overflow-x: scroll;
        transform: rotate(-90deg) translateY(-90vh);
        transform-origin: right top;
    }

    ::-webkit-scrollbar {
    display: none;
    }


</style>