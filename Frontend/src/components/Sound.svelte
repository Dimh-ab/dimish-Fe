<script>
    let muted = true;
    let audioFile = new Audio("music/lightheartedLong.wav")
    let vol = 50
    let soundImgSrc = "static/images/mute.png"

    // devided by 100 because the audio objects volume property only handels numbers between 1 and 0
    const adjustVol = () => audioFile.volume = vol / 100 

    const muteSound = () => {
        // console.log("sound clicked");
        muted = !muted;
        if (muted) {
            soundImgSrc = "static/images/mute.png";
            audioFile.pause()
        } else {
            soundImgSrc = "static/images/sound.png";
            audioFile.play()
            audioFile.loop = true
        }
    };
</script>

<body>
    {#if !muted}
    <input 
        class="slider" 
        type="range" 
        min="0" max="100" 
        step="1" 
        name="volume" 
        bind:value={vol}
        on:input={adjustVol}
    >
    {/if}

    <img
        class="sound-img"
        id="sound"
        on:click={muteSound}
        src={soundImgSrc}
        alt="sound icon"
    />

</body>

<style>
    .sound-img {
        width: 38px;
        height: 38px;
        position: fixed;
        bottom: 1.1rem;
        right: 4.5rem;
        cursor: pointer;
        /* filter: opacity(0.5) drop-shadow(0 0 0 rgb(230, 6, 6)); */
        /* filter: invert(); */
        z-index: 2;
    }

    .slider{
        position: fixed;
        bottom: 0.9rem;
        right: 8.5rem;

        /* appearance: none; */
        border: none;
        background: #383838;
        cursor: pointer;

        z-index: 2;
    }
</style>
