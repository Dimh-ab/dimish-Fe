<script>

    // BUG: buttons are hard to click 

    import Sven from "./spriteAnimations/Sven.svelte"; 
    import InterSectionObserver from "svelte-intersection-observer";
    import {checkPoint, bookId, projectId} from "../stores"
    import StartingConvo from './StartingConvo.svelte'

    let element
    let intersecting
    $: console.log('checkpoint', intersecting ? $checkPoint = $checkPoint = 0 : '')

</script>

<InterSectionObserver {element} bind:intersecting>
<section id="lobby" class={$bookId === $projectId ? "overlay" : ""}>
    <StartingConvo />
    <div class="welcome clickSven" >
    <div class="box" bind:this={element}>
        <Sven />
    </div>
</div>
</section>
</InterSectionObserver>

<style>
    section{
        background: url(../images/lobby-final.png) no-repeat;
		width: 100%;
		height: 100%;
		background-size: contain;
    }

    section.overlay{
        background:url(../images/lobby-final.png) no-repeat, rgba(0, 0, 0, 0.8);
		background-size: contain;
		background-blend-mode: overlay;
    }
    .welcome{
        background-color: transparent;
        height: 100px;
        position: absolute;
        top: 8%;
        left: 2%;
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


    ::-webkit-scrollbar {
    display: none;
    }


</style>