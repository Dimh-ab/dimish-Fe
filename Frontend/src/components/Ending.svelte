<script>
    import Sven from './spriteAnimations/Sven.svelte'
    import Girl from './spriteAnimations/Girl.svelte'
    import EndingConvo from './EndingConvo.svelte';


</script>

<section>
    <article>
        <EndingConvo />
        <div class="girl">
            <Girl />
        </div>
        <div class="sven">
            <Sven />
        </div>
    </article>

</section>

<style>
    section{
        background: url(../images/lobby-ending.png) no-repeat;
		width: 100vw;
		height: 100%;
		background-size: contain;
        position: absolute;
        z-index: 10;
        /* opacity: 0.7; */
    }

    article{
        width: 100vw;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .girl{
        rotate: -90deg;
        translate: -210px 270px;
    }

    .sven{
        translate: -80px 230px;
    }

    @media only screen and (max-width: 1200px){
        .girl{
            translate: -210px 150px;
        }
        .sven{
            translate: -80px 130px;
        }
    }
</style>