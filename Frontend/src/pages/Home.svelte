<script>
    import { _ } from "svelte-i18n"
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { fly } from "svelte/transition";
    //let wasClicked = false;

    // Welcome to the library! You are one CLICK/ENTER away from crossing the threshold of its magical world...

    let IOSdevice = ''
    let fullscreenGuide = ''
    let key = "";
    let story = ''
    // $: console.log(key);

    onMount( () => {
        story = $_("homepage.welcomeText")
        // if(story !== ''){
        //     setTimeout(() => {
        //         story = ''
        //     }, 5000);
        // }
    })
    $: console.log(story)

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

    
    let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {    
        console.log('This is a IOS device');
        fullscreenGuide = `För fullskärm: <br> 1. Vid webbläsarens adressfält finns en ikon 'aA'. <br> 2. Tryck på den och välj 'Göm verktygsfält'. <br> 3. Rotera skärmen.`
        IOSdevice = 'IOSdevice'
    } else {
        console.log('This is Not a IOS device');
        fullscreenGuide = 'Rotera skärmen'
        IOSdevice = ''
    }

</script>

<svelte:window on:keydown={(e) => (key = e.key)} />

    <div class="rotate-animation" >
        <video autoplay muted loop id="rotate-device">
            <source src="../images/rotate-device.mp4" type="video/mp4">
        </video>
        <p id="rotate-phone-message" class={IOSdevice}>{@html fullscreenGuide}</p>
    </div>

    {#if story !== ''}
    <p  in:fly="{{ x: 200, duration: 1500 }}" out:fly="{{ x: -200, duration: 1500}}">{story}</p>
    {/if}

<div tabindex="0" class="sprite" use:zoom={10}>
    <!-- <img class="girl" src="/static/images/girl2.png" alt="girl" /> -->
    <img class="door" src="/static/images/homepage-3-01-01.jpg" alt="book-door" />
</div>

<style>

    p{
        position: absolute;
        top: 0;
        left: 50%;
        translate: -50% 0;
        border-radius: 5px;
        padding: 1rem;
        background: #00000099;
        color: #fff;
    }
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
        top: -80px;
        text-align: center;
        font-size: 1.5em;
        background-color: aliceblue;
        padding: 0.5em 2em;
    }

    #rotate-phone-message.IOSdevice{
        top: -220px
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
