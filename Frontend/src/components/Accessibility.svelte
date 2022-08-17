<script>
    import { fly } from "svelte/transition";

    function toggleAcc() {
        console.log("accessibility btn clicked");
    }

    let show = false;

    let fontSize = 1.2;

    //document.getElementsByTagName("body")[0].style["font-size"] = "1.2rem";

    const increaseFontSize = () => {
        fontSize += 0.2;
        document.getElementsByTagName("html")[0].style[
            "font-size"
        ] = `${fontSize}rem`;

        /*         var existing_size = document.getElementsByTagName( "body" )[0].style[ "font-size" ];
        var int_value = parseInt(existing_size.replace( "rem", "" ));
        int_value ++;
        document.getElementsByTagName( "body" )[0].style[ "font-size" ] = int_value + "rem"; */
    };

    function decreaseFontSize() {
        fontSize -= 0.2;
        document.getElementsByTagName("html")[0].style[
            "font-size"
        ] = `${fontSize}rem`;
    }

    let letterSpacing = 1;

    function increaseLetterSpacing() {
        letterSpacing += 2;
        document.getElementsByTagName("html")[0].style[
            "letter-spacing"
        ] = `${letterSpacing}px`;
    }

    function decreaseLetterSpacing() {
        letterSpacing -= 2;
        document.getElementsByTagName("html")[0].style[
            "letter-spacing"
        ] = `${letterSpacing}px`;
    }

    let wordSpacing = 1;

    function increaseWordSpacing() {
        wordSpacing += 5;
        document.getElementsByTagName("html")[0].style[
            "word-spacing"
        ] = `${wordSpacing}px`;
    }

    function decreaseWordSpacing() {
        wordSpacing -= 5;
        document.getElementsByTagName("html")[0].style[
            "word-spacing"
        ] = `${wordSpacing}px`;
    }

    let lineSpacing = 24;

function increaseLineSpacing() {
    lineSpacing += 10;
    document.getElementsByTagName("html")[0].style[
        "line-height"
    ] = `${lineSpacing}px`;
}

function decreaseLineSpacing() {
    lineSpacing -= 10;
    document.getElementsByTagName("html")[0].style[
        "line-height"
    ] = `${lineSpacing}px`;
}


</script>

<body>
    <button class="accessibility-btn" on:click={() => (show = !show)}>
        <img
            class="accessibility-img"
            src="/static/images/accessibility.png"
            alt="accessibility icon"
        />
    </button>

    {#if show}
        <aside transition:fly={{ x: 250, opacity: 1 }}>
            <p>Change text size:</p>

            <div class="accessibility-sidebar">
                <img
                    src="/static/images/decrease-font.png"
                    alt="Decrease text size"
                    class="fontsize-plus-btn"
                    on:click={decreaseFontSize}
                />
                <img
                    src="/static/images/increase-font.png"
                    alt="Increase text size"
                    class="fontsize-minus-btn"
                    on:click={increaseFontSize}
                />
            </div>

            <p>Change letter spacing:</p>

            <div class="accessibility-sidebar">
                <img
                    src="/static/images/decrease-font-size.png"
                    alt="Decrease text size"
                    class="letter-spacing-btn"
                    on:click={decreaseLetterSpacing}
                />
                <img
                    src="/static/images/increase-font-size.png"
                    alt="Increase text size"
                    class="letter-spacing-btn"
                    on:click={increaseLetterSpacing}
                />
            </div>

            <p>Change word spacing:</p>

            <div class="accessibility-sidebar">
                <img
                    src="/static/images/decrease.png"
                    alt="Decrease text size"
                    class="word-btn"
                    on:click={decreaseWordSpacing}
                />
                <img
                    src="/static/images/increase.png"
                    alt="Increase text size"
                    class="word-btn"
                    on:click={increaseWordSpacing}
                />
            </div>

            <p>Change line height:</p>

            <div class="accessibility-sidebar">
                <img
                    src="/static/images/decrease-line-spacing.png"
                    alt="Decrease line spacing"
                    class="line-height-btn"
                    on:click={decreaseLineSpacing}
                />
                <img
                    src="/static/images/increase-line-spacing.png"
                    alt="Increase line spacing"
                    class="line-height-btn"
                    on:click={increaseLineSpacing}
                />
            </div>


        </aside>
    {/if}
</body>

<style>
    body {
        position: absolute;
        right: 10px;
        top: 10px;
    }

    .accessibility-btn {
        position: fixed;
        right: 10px;
        top: 10px;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
        z-index: 2;
    }

    .accessibility-btn:focus {
        background: none;
    }

    .accessibility-img {
        width: 60px;
        height: 60px;
        /* filter: opacity(0.5) drop-shadow(0 0 0 rgb(230, 6, 6)); */
        filter: invert();
    }

    aside {
        position: fixed;
        right: 25px;
        top: 110px;
        height: 60%;
        font-family: "Papyrus", fantasy;
        font-weight: 600;
        padding: 1rem 1rem 0.6rem;
        border-radius: 20px;
        background: rgba(243, 241, 239, 0.7);
        overflow-y: auto;
        width: 12rem;
        z-index: 2;
    }

    .accessibility-sidebar {
        display: flex;
        justify-content: space-around;
    }

    .fontsize-plus-btn,
    .fontsize-minus-btn {
        width: 35px;
        height: auto;
        cursor: pointer;
        filter:  drop-shadow(0 0 0 rgb(198, 247, 2));
    }

    .letter-spacing-btn {
        width: 25px;
        height: auto;
        cursor: pointer;
        filter: opacity(0.8) drop-shadow(0 0 0 rgb(182, 23, 23));
    }

    .word-btn{
        width: 35px;
        height: auto;
        cursor: pointer;
        filter: opacity(0.5) drop-shadow(0 0 0 rgb(241, 2, 2));
    }
    
    .line-height-btn {
        width: 30px;
        height: auto;
        cursor: pointer;
        filter: opacity(0.8) drop-shadow(0 0 0 rgb(31, 1, 5));
        padding-bottom: 2rem;
    }

    p {
        font-size: 1.2rem;
        color: rgb(68, 17, 17);
        margin: 0;
        padding: 1rem 0rem;
    }
</style>
