<script>
    import { navigate } from "svelte-routing";
    import { fade } from "svelte/transition";
    //let wasClicked = false;

    let key = "";
    $: console.log(key);

    const zoom = (node, scale = 1.5) => {
        node.style.transition = "3s";

        function zoomIn() {
            node.style.transform = `scale(${scale})`;
            node.style.opacity = 0;

            setTimeout(function () {
                navigate("/library");
            }, 3000);
        }

        node.addEventListener("click", zoomIn);
        node.addEventListener("keypress", () => {
            if (key === "Enter") {
                zoomIn();
            }
        });

        console.log("clicked");
    };
</script>

<svelte:window on:keydown={(e) => (key = e.key)} />

    <div class="rotate-animation" >
        <video autoplay muted loop id="rotate-device">
            <source src="../images/rotate-device.mp4" type="video/mp4">
        </video>
        <p id="rotate-phone-message">please rotate your device</p>
    </div>

<div tabindex="0" class="sprite" use:zoom={10}>
    <!-- <img class="girl" src="/static/images/girl2.png" alt="girl" /> -->
    <img class="door" src="/static/images/homepage-3-01-01.jpg" alt="book-door" />
</div>

<style>
    .sprite {
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3vh;
    }

    .door {
        width: 100%;
        height: 100vh;
        cursor: pointer;
    }

/*     .girl {
        width: 200px;
        height: auto;
        position: absolute;
        top: 60vh;
        bottom: 90px;
        left: 60vw;
        z-index: 2; 
    } */

    .rotate-animation{
        background-color: transparent;
        position: relative;
        top: 380px;
        z-index: 1000;
    }

    #rotate-phone-message{
        position: absolute;
        left:0;
        right: 0;
        top: -40px;
        text-align: center;
        font-size: 1.5em;
    }

    #rotate-device{
        border: 5px solid rgba(0, 0, 0, 0.53);
        border-radius: 350px;
        width: 200px;
        margin: auto;
        position: absolute;
        left:0;
        right: 0;
    }

    @media (orientation: landscape){

        .rotate-animation, #rotate-device,  #rotate-phone-message{
            display: none;
        }
    }
</style>
