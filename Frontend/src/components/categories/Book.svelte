<script>
    import { amountOfProjects, bookId, projectId } from "../../stores.js";
    import { fade } from 'svelte/transition';

    let category = ''

    const closeBook = () => {
        $bookId = 0
    }

    const filterDetails = $amountOfProjects.filter(filterDetails => filterDetails.id === $bookId)

</script>

<button on:click={closeBook}>{'<- close book'}</button>

<article class={category} transition:fade>
    {#each filterDetails as project}
    <div class="book">
        <h1>{project.title}</h1>
        <img
			src={project.image_url}
			alt={project.title}
            height="100px"
        />
        <p class="description">{project.description}</p>
    </div>
    {/each}

</article>

<style>
    article{
        position: absolute;
        color: #fff;
        z-index: 100;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button{
        position: absolute;
        z-index: 101;
        outline: none;
        background: transparent;
        color: #fff;
        border: none;
        cursor: pointer;
        text-align: center;
        margin: 25% 10%;
    }

    button:active{
        background-color: none;
    }

    .book{
        background: url(../images/book-template.png) no-repeat;
        height: 800px;
        width: 800px;
        background-size: cover;
    }

    h1{  
        color: black;
        font-size: 2.2em;
        translate: 170px 230px;
    }

    img{
        height: 120px;
        translate: 130px 340px;
    }

    .description{
        width: 295px;
        translate: 420px 0px;
    }
</style>