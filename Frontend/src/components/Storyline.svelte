<script>
    import {story} from '../stores'
    import {fly} from 'svelte/transition'
    import { onMount } from 'svelte';
    let visible = false

    onMount(() => {
        if($story !== ''){
            visible = true
            setTimeout(() => {
                $story = ''
            }, 11000);
        }
    })

    
function typewriter(node, { speed = 2 }) {
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

    $: console.log($story)
</script>
{#if visible}
<article in:fly="{{ y: -200, duration: 700 }}" out:fly="{{ x: -200, duration: 1500}}">
    {#if story !== ''}
    <p in:typewriter >{$story}</p>
    {/if}
</article>
{/if}


<style>
    article{
        position: absolute;
        top: 0;
        left: 50%;
        translate: -50% 0;
        border-radius: 5px;
        padding: 1rem;
        background: #00000099;
        z-index: 8;
        width: 400px;
        height: 80px;
    }
    p{
        color: #fff;
        z-index: 10;
    }
</style>