<script>
    import { navigate } from "svelte-routing";
    import { fade } from "svelte/transition";
    //let wasClicked = false;

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

        console.log("clicked");
    };
</script>

<div class="sprite">
    <img class="girl" src="/static/images/girl2.png" alt="girl" />
    <img
        class="door"
        use:zoom={10}
        src="/static/images/book-door.png"
        alt="book-door"
    />
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
        top: 60vh;
        left: 40vw;
        z-index: 2;
    }

</style>
