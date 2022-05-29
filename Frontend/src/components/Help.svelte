<script>
    import {fade, fly} from "svelte/transition";
    let showDesc = false;
    let key = '';

    $: console.log(key)
</script>
    
    <main>
        <button tabindex="0" on:click={() => showDesc = !showDesc}>?</button>

        {#if showDesc}
        <article transition:fly={{ y: -20 }}>
            <h3>Welcome to the library!</h3>
            <div class="text">
                <p>To move you can scroll up or down. You can also use the up and down arrow keys!</p>
                <br>
                <p>When you find a book try clicking on it to read about our awesome projects :)</p>
                <p>Or use the tab button to tab to a book and then push Enter to open and close it. To tab backwards use Shift+Tab.</p>
                <br>
                <p>If you need any help just click on the ? in the up right corner ;)</p>
            </div>
            <div>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- <iframe src="https://embed.lottiefiles.com/animation/7249"></iframe> -->
                <button class="continueBTN" on:click={() => showDesc = !showDesc}>continue</button>
            </div>
        </article>
        {/if}

    </main>

    <svelte:window on:keydown={e => key = e.key}/> 
    
    <style>
    
        article{
            background-image: url('../images/chalkboard.jpg');
            background-size: cover;
            position: absolute;
            top: 150px;
            left: 200px;
            right: 200px;
            height: 450px;
            border-radius: 3px;
            border: 15px solid #deb886;
            box-shadow: 3px 3px 30px rgb(0, 0, 0);
            z-index: 2;
        }
    
        .text{
            margin: 40px;
        }
    
        h3{
            color: white;
            font-family: 'Cabin Sketch', cursive;
            font-size: 2.5em;
            text-align: center;
            margin-top: 15px;
        }
    
        p{
            color: white;
            font-family: 'Cabin Sketch', cursive;
            font-size: 1.6em;
        }
    
        /* iframe{
            background-color: transparent;
            border: none;
            position: relative;
            left: -100px;
            bottom: 30px;
        } */

        button{
            position: fixed;
            cursor: pointer;
            
            filter: opacity(0.5) drop-shadow(0 0 0 rgb(143, 44, 44));
            color: black;
            border: 2px solid black;
            font-weight: 600;
            font-size: 1.5em;
            border-radius: 90px;
            padding: 3px 14px;
            left: 0;
            bottom: 3rem;
            margin: 15px;
            z-index: 2;
        }

        button:focus-visible{
            outline: 2px solid white;
        }
    
        .continueBTN{
           font-family: 'Cabin Sketch', cursive;
           color: white;
           border: 1px solid white;
           position: absolute;
           background-color: transparent;
           right: 0;
           bottom: 0;
           margin: 1em;
           z-index: 2;
           transition-duration: 0.2s;
        }

        .continueBTN:hover{
            color: rgb(229, 229, 0);
            border: 1px solid rgb(229, 229, 0);
            transform: scale(1.1);
        }
    </style>