<script>
    let muted = true;

    const muteSound = () => {
        console.log("sound clicked");
        muted = !muted;
        if (muted) {
            document.getElementById("sound").src = "static/images/mute.png";
        } else {
            document.getElementById("sound").src = "static/images/sound.png";
        }
    };
</script>

<body>
    <img
        class="sound-img"
        id="sound"
        on:click={muteSound}
        src="static/images/sound.png"
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
        filter: invert();
        z-index: 2;
    }
</style>
