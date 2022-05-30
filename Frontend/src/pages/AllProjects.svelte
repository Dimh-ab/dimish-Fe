<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { amountOfProjects } from "../stores.js";
    //import { Router, Route, Link } from "svelte-routing";
    //import Home from "./Home.svelte";

    const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";

    onMount(async () => {
        try {
            const response = await axios.get(PROJECTS_ENDPOINT);
            $amountOfProjects = response.data;
            console.log($amountOfProjects);
        } catch (error) {
            console.log(error);
        }
    });

    //export let url = "";
</script>

<!-- <Router {url}>
    <nav>
        <Link to="/" class="link"> <p>Back</p> </Link>
    </nav>
    
    <Route path="/">
        <Home />
    </Route>
</Router> -->

<section>
    {#each $amountOfProjects as project}
        <article class="project">
            <img
                src={project.image_url}
                alt={project.title}
                name="picture"
                class="project-img"
            />
            <h2 class="project-title">{project.title}</h2>
            <p class="category">{project.category}</p>
            <p class="description">{project.description}</p>
        </article>
    {/each}
</section>

<style>



	:global(a) p {
		position: fixed;
		left: .5rem;
		top: 6rem;
		z-index: 1;
	}


    section {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        padding-bottom: 3rem;
    }
    .project {
        width: 360px;
        max-height: 850px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin: 30px;
        border: 2px solid #c0c0c0;
        border-radius: 10px;
        background-color: #d4cdcd;
        font-family: "Papyrus", fantasy;
        font-weight: 500;
    }

    .project-img {
        width: 100%;
        height: 25rem;
        border-radius: 10px 10px 0 0;
    }

    .project-title {
        font-size: 1.4rem;
        font-weight: bold;
        margin: 0.8rem 0rem;
    }

    p {
        margin: 5px 0px;
    }

    .description {
        height: 7rem;
        overflow-y: auto;
        padding: 0.7rem;
        text-align: justify;
    }
</style>
