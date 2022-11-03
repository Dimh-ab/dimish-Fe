
<script>
    import { _ } from "svelte-i18n"
    // import TypeWriter from './TypeWriter.svelte'
    // let typewriterComponent
    import {goHome} from '../stores'
    let visible = false;
    let next = 0
    let who = 'Sven: '
    let conversation = $_("library.dialogSven3")
    let conversation1 = $_("library.dialogFairy2")

    // let typewriterTransition = TypeWriter.typewriterComponent()

    const nextConvo = () => {
        next++
        if(next === 1){
            who = 'You:'
        } else if(next > 1){
            visible = false
            $goHome = true
        }
    }

    // TODO
    // -fix transformation sprite
    // if time, fix creators page

    $: console.log(next)

function typewriter(node, { speed = 3 }) {
    const valid = (
        node.childNodes.length === 1 &&
        node.childNodes[0].nodeType === Node.TEXT_NODE
    );

    if (!valid) {
        throw new Error(`something went wrong`);
    }

    const text = node.textContent;
    const duration = text.length / (speed * 0.01);

    return {
        duration,
        tick: t => {
            const i = Math.trunc(text.length * t);
            node.textContent = text.slice(0, i);
        }
    };
}
</script>
    
    {#if visible}
    <article>
        <p><strong>{who}</strong></p>
        {#if next === 0}
        <p in:typewriter>
           {conversation}
        </p>
        {:else}
        <p in:typewriter>
            {conversation1}
        </p>
        {/if}
        <button class='next' on:click={nextConvo}>next</button>
    </article>

    {:else}
    <button on:click={() => visible = !visible} class={'talkWsven ' + (next > 1 ? 'stop' : '')}>{$_("library.talkToSven")}</button>

    {/if}

<style>
    button{
        position: absolute;
        z-index: 20;
        cursor: pointer;
    }

    .talkWsven{
        font-family: "Cabin Sketch", cursive;
        font-size: 1.2em;
        padding: 10px;
        background-color: #222;
        border: 2px solid #fff;
        color: #fff;
        /* width: 105%; */
        animation: jump 0.8s ease-in-out infinite alternate;
        transition: all 0.4s;
        cursor: pointer;
    }

    .talkWsven.stop{
        animation: none;
    }

    @keyframes jump {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(5px, 5px) rotate(5deg); }
    50% { transform: translate(0, 0) rotate(0deg); }
    75% { transform: translate(-5px, 5px) rotate(-5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
    }

    article{
        width: 250px;
        height: 130px;
        padding: 0.5rem;
        border: 3px solid black;
        border-radius: 5px;
        background: #00000085;
        color: white;
        text-align: left;
        position: absolute;
        z-index: 20;
        top: 5%;
    }

    p{
        color: white;
    }

    .next{
        border: none;
        border-bottom: 2px solid white;
        background: none;
        color: gold;
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 0.2em;
        padding: 0;
    }
</style>