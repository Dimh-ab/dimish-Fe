 <script>
    import {allKidsBooksRead, primaryBooksRead, mobilityBooksRead, adolescenceBooksRead, informativeBooksRead, tree, spell, light, gotWand, goHome } from '../stores.js'
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    let show = false
    let showHide = 'open'
    let dimh = ''
    let wand = ''

    // $: if($allKidsBooksRead || $adolescenceBooksRead || $mobilityBooksRead || $primaryBooksRead || $informativeBooksRead)
    // { showHideAbilities() }

    onMount(() => {
            if(location.pathname === '/library'){
                    show = true
                    showHide = 'close'
            }
    })


    $: console.log(location.pathname)


    $: if($informativeBooksRead){
        wand = 'wand '
    }

    $: if($goHome === true){
        show = true
    }

    const useSpell = () => {
        $spell = true
    }

    const useFairyDust = () => {
        $tree = '../images/alive-tree-01.png'
    }

    const useLight = () => {
        $light = true
    }

    const useWand = () => {
        if($goHome === true){
            dimh = 'https://www.di-mh.com/'
        }
    }

    const showHideAbilities = () => {
        show = !show
        if(show){
            showHide = 'close'
        } else {
            showHide = 'open'
        }
    }


 </script>

<section class={!show ? 'hidden' : ''}>
    <button class={"show-hide " + (!show ? 'scaleBtn' : '')} on:click={showHideAbilities}>{showHide}</button>
    {#if show}
    <article in:fly="{{ y: 200, duration: 800 }}" out:fly="{{ y: 200, duration: 1500}}">
        <button 
        disabled={$allKidsBooksRead ? false : true} 
        class={$allKidsBooksRead ? 'fly' : ''}>
        </button>
        <button 
        disabled={$adolescenceBooksRead ? false : true} 
        class={$adolescenceBooksRead ? 'spells' : ''}
        on:click={useSpell}
        >
        </button>

        <button 
        disabled={$mobilityBooksRead ? false : true} 
        class={$mobilityBooksRead ? 'dust' : ''}
        on:click={useFairyDust}
        >
        </button>

        <button 
        disabled={$primaryBooksRead ? false : true} 
        class={$primaryBooksRead ? 'light' : ''}
        on:click={useLight}
        >
        </button>
        
        <a href={dimh}>
                <button 
                disabled={$informativeBooksRead ? false : true} 
                class={wand + ($goHome ? 'wandAnimation' : '')}
                on:click={useWand}
                >
                </button>
        </a>
    </article>
    {/if}
</section>

 <style>
    section{
        position: fixed;
        bottom: 0;
        left: 50%;
        translate: -50% 0;
        z-index: 15;
        /* display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; */
        width: 300px;
        height: 95px;
        border-radius: 60px 60px 0 0;
        padding: 0 0.4rem;
        background-color: #00000070;
        transition-duration: 500ms;
    }

    section.hidden{
        scale: 0.3;
        translate: -50% 40px;
    }
    
    article{
        width: 300px;
        height: 70px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    button{
        width: 50px;
        height: 50px;
        background: transparent;
        border: 3px solid rgba(0, 0, 0, 0.3);
        transition-duration: 0.2s;
    }

    button:hover{
        scale: 1.1;
    }

    .show-hide{
        border: none;
        color: #fff;
        height: 30px;
        position: relative;
        top: 0;
        left: 50%;
        translate: -50% 0;
        margin-bottom: 2px;
        cursor: pointer;
    }

    .show-hide:hover{
        color: gold;
        scale: 1;
    }

    .show-hide.scaleBtn{
        scale: 3.4;
        margin: 10px 0;
    }

    .fly{
        background: url(../images/icons/wings-icon.png) no-repeat, linear-gradient(180deg, #702DFF 14.58%, #50D5FF 83.85%);
        background-size: contain;
        background-position: center;
        cursor: pointer;
        border: none;
    }
    .spells{
        background: url(../images/icons/spell-icon.png) no-repeat, linear-gradient(180deg, #b52dff 14.58%, #5f50ff 83.85%);
        background-size: contain;
        background-position: center;
        cursor: pointer;
        border: none;
    }
    .dust{
        background: url(../images/icons/dust-icon.png) no-repeat, linear-gradient(180deg, #f8ff2d 14.58%, #c81b1b 83.85%);
        background-size: contain;
        background-position: center;
        cursor: pointer;
        border: none;
    }
    .light{
        background: url(../images/icons/torch-icon.png) no-repeat, linear-gradient(180deg, #2dff3e 14.58%, #0939e4 83.85%);
        background-size: contain;
        background-position: center;
        cursor: pointer;
        border: none;
    }
    .wand{
        background: url(../images/icons/wand.png) no-repeat, linear-gradient(180deg, #682dff 14.58%, rgb(210, 152, 255) 83.85%);
        background-size: contain;
        background-position: center;
        cursor: pointer;
        border: none;
    }

    .wand.wandAnimation{
        animation: gradient 800ms ease-out alternate infinite;
    }

    @keyframes gradient {
	0% {
		scale: 1;
	}
	100% {
		scale: 1.2;
	}
}
    
 </style>