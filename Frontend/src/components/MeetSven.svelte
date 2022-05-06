<script>
    let chatWithSven = "";
    let count = 0;

    $: console.log(count)

    const svenSaysHello = () => {
        count = count + 1;
        if(count === 1){
        chatWithSven = "Hello you !"
        }else if(count === 2){
        chatWithSven = "Scroll to move around."
        } else if(count === 3){
        chatWithSven = "Click on the books to read."
        } else if(count > 3){
            count = 0;
            chatWithSven = "";
        }
    };
</script>


<div class="welcome">
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="box">
        <p class={(chatWithSven !== "" ? "speech-bubble" : "")}>{chatWithSven}</p>
        <iframe src="https://embed.lottiefiles.com/animation/7249"></iframe>
        <button class="clickSven" on:click={() => svenSaysHello()}>click me</button>
    </div>
</div>


<style>
    .welcome{
        background-color: transparent;
        height: 2000px;
        display: grid;
        grid-template-columns: 500px 500px 500px 500px;
        /* grid-template-rows: 500px 500px;  */
    }

    .box{
        transform: rotate(90deg);
        width: 500px;
        height: 500px;
        background-color: transparent;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .speech-bubble{
        position: absolute;
        top: 0;
        padding: 2em 1em;
        background-color: white;
        border-radius: 2em;
        border: 3px solid black;
    }


button{
    margin: 3em;
    /* padding: 1em; */
}


    iframe{
        border: none;
        margin: 4em 0;
    }
</style>