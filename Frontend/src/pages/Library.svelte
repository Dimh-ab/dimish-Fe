<script>
    import Projects from "../components/Projects.svelte";
    import MeetSven from "../components/MeetSven.svelte";
    // import sven from "../sven.gif"
    let scrollingY
    // let scrollingX
    // let mainCSS = ""

    $: console.log('scrollingX', scrollingY)

    // const scrollDirection = () => {
    //     // scrollingX = window.scrollX
    //     // mainCSS = scrollingY > 1 ? "horizontal-scroll-wrapper" : ""
    //     if(scrollingY > 1) {
    //         mainCSS = "horizontal-scroll-wrapper"
    //     } else if(scrollingX === 3800) {
    //         mainCSS = ""
    //     }

    // }

</script>

<!-- on:scroll={scrollHorizontal} -->
<main class={(scrollingY < 1 ? "horizontal-scroll-wrapper" : "")}> 
    <MeetSven />
    <Projects />
    <div class="something"></div>
</main>


<svelte:window bind:scrollY={scrollingY}/> 
<!--  bind:scrollX={scrollingX}  -->

<style>


   .something{
       height: 1000px;
   }


    *{
        box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}

    .horizontal-scroll-wrapper {
        /* margin: 0 80px; */
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