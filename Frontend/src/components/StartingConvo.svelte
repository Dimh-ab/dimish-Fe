<script>
    import { _ } from "svelte-i18n"
    import { onMount } from 'svelte';
    import {hasTalkedToSven, nextChat} from '../stores'
    let who = 'Sven: '
    let svenChat = ''
    let girlChat = ''
    let talkToSven = false
    let btnText = ''

    onMount(() => {
        const svenStorage = localStorage.getItem('sven')
        if (svenStorage !== null){
            try{
                $hasTalkedToSven = svenStorage
                console.log($hasTalkedToSven)
            }catch{
                console.log('error')
            }
        }
        // console.log(svenStorage)
    })


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

const talk = () => {
        talkToSven = !talkToSven
        if(talkToSven){
            $hasTalkedToSven += 1
            localStorage.setItem('sven', $hasTalkedToSven)
        }
    }

const handleNext = () => {
        $nextChat += 1;
        console.log($nextChat)
    }

    $: if(talkToSven){
        $nextChat = 1
        svenChat = $_("library.dialogSven1")
        btnText = $_("library.btnText1")
    }

    $: if($nextChat === 2){
        girlChat = $_("library.dialogGirl1")
        who = 'Girl:'
    } else if($nextChat === 3){
        who = 'Sven:'
        svenChat = $_("library.dialogSven2")
        btnText = $_("library.btnText2")
    }
    
    $: if( $nextChat > 3){
        talkToSven = false
        $nextChat = 0
    }

</script>

    {#if talkToSven}
    <article>
        <p><strong>{who}</strong></p>
        {#if $nextChat === 2}
        <p in:typewriter class="girl-chat">{girlChat}</p>
        {:else}
        <p in:typewriter class={"sven-chat " + ($nextChat === 3 ? 'last-chat' : '')}>{svenChat}</p>
        {/if}
        <button class='next' on:click={handleNext}>{btnText}</button>
    </article>
    {:else}
    <button class={"talk-to-sven " + ($hasTalkedToSven >= 1 ? 'stopAnimation' : '')} on:click={talk}>{$_("library.talkToSven")}</button>
    {/if}

<style>

.talk-to-sven{
        font-family: "Cabin Sketch", cursive;
        font-size: 1.2em;
        padding: 10px;
        background-color: #222;
        border: 2px solid #fff;
        rotate: 90deg;
        cursor:pointer;
        color: #fff;
        animation: jump 0.8s ease-in-out infinite alternate;
        transition: all 0.4s;
        z-index: 10;
        position: absolute;
        top: 8%;
        left: 15%;
    }

    .talk-to-sven.stopAnimation{
        animation: none;
    }

    @keyframes jump {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(5px, 5px) rotate(5deg); }
    50% { transform: translate(0, 0) rotate(0deg); }
    75% { transform: translate(-5px, 5px) rotate(-5deg); }
    100% { transform: translate(0, 0) rotate(0deg); }
    }

    p{
        color: #fff;
        text-align: left;
    }

    article{
        width: 280px;
        height: 170px;
        padding: 0.5rem;
        border: 3px solid black;
        border-radius: 5px;
        background: #00000085;
        color: white;
        text-align: left;
        position: absolute;
        top: 5%;
        left: 15%;
        rotate: 90deg;
    }

    .next{
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 10px;
        background: transparent;
        color: gold;
        border: none;
        padding: 0;
        cursor: pointer;
    }
</style>