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

<div tabindex="0" class="sprite" use:zoom={10}>
    <img class="girl" src="/static/images/girl2.png" alt="girl" />
    <img class="door" src="/static/images/book-door.png" alt="book-door" />
</div>

<style>
    .sprite {
        display: flex;
        justify-content: center;
        align-items: center;
        top: 3vh;
    }

    .door {
        width: 450px;
        height: auto;
        cursor: pointer;
    }

    .girl {
        width: 200px;
        height: auto;
        position: absolute;
        /* top: 60vh; */
        bottom: 80px;
        left: 40vw;
        /* z-index: 2; */
    }
</style>
