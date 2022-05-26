<script>
    import { fly } from "svelte/transition";

    function toggleAcc() {
        console.log("accessibility btn clicked");
    }

    let show = false;

    let fontSize = 1.2;

    //document.getElementsByTagName("body")[0].style["font-size"] = "1.2rem";

    const increaseFontSize = () => {
        fontSize+=.2;
        document.getElementsByTagName("html")[0].style[
            "font-size"
        ] = `${fontSize}rem`;

        /*         var existing_size = document.getElementsByTagName( "body" )[0].style[ "font-size" ];
        var int_value = parseInt(existing_size.replace( "rem", "" ));
        int_value ++;
        document.getElementsByTagName( "body" )[0].style[ "font-size" ] = int_value + "rem"; */
    };

    function decreaseFontSize() {
        fontSize-=.2;
        document.getElementsByTagName("html")[0].style[
            "font-size"
        ] = `${fontSize}rem`;
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
                    src="/static/images/decrease-font-size.png"
                    alt="Decrease text size"
                    class="fontsize-plus-btn"
                    on:click={decreaseFontSize}
                />
                <img
                    src="/static/images/increase-font-size.png"
                    alt="Increase text size"
                    class="fontsize-minus-btn"
                    on:click={increaseFontSize}
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
        position: inherit;
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
        filter: opacity(0.5) drop-shadow(0 0 0 rgb(247, 146, 31));
    }

    aside {
        position: fixed;
        right: 10px;
        top: 110px;
        height: 60%;
        padding: 1rem 1rem 0.6rem;
        border-radius: 20px;
        background: rgba(243, 241, 239, 0.2);
        overflow-y: auto;
        width: 10rem;
        z-index: 2;
    }

    .accessibility-sidebar {
        display: flex;
        justify-content: space-around;
    }

    .fontsize-plus-btn,
    .fontsize-minus-btn {
        width: 35px;
        height: 35px;
        cursor: pointer;
        filter: opacity(0.6) drop-shadow(0 0 0 rgb(252, 140, 4));
    }

    p {
        font-size: 1rem;
        margin: 0;
        padding-bottom: 2rem;
    }

</style>
