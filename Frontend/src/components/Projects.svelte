<script>
	import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects } from "../stores.js";

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";
	let showProject = [];
	let wasClicked = false

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			$amountOfProjects = response.data
			console.log($amountOfProjects)
		} catch (error) {
			console.log(error);
		}
	});

	const openBook = (i) => {
		showProject[i] = !showProject[i]
		wasClicked = !wasClicked
	}


</script>

	{#each $amountOfProjects as project, i (project)}
	<main>
		<button on:click={() => (showProject[i] = !showProject[i])}>
			{project.title}
		</button>

		{#if showProject[i]}
		<!-- <button>back</button> -->
			<div class={"book " + (wasClicked ? 'wasClicked' : '')} on:click={() => (wasClicked = !wasClicked)}>
				<div class="cover"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="last-page">	
					<h2>{project.title}</h2>
				<img
					src={project.image_url}
					alt={project.title}
					name="picture"
					height="150px"
				/>
				<p>{project.description}</p>
				<p>{project.category}</p>
				</div>
				<div class="after-last-page"></div>
				<div class="after-last-page"></div>
				<div class="back-cover"></div>
			</div>
			<!-- <button>next</button> -->
		{:else}
			<div />
		{/if}
		</main>
	{/each}

<style>
	*{
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}

	main{
		height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #e0e4ee;
	}

	.book{
		display: flex;
		align-items: center;
		cursor: pointer;
	}


	.book.wasClicked .cover{
		transform: rotateX(10deg) rotateY(180deg);
	}

	.book.wasClicked .page{
		transform: rotateX(10deg) rotateY(180deg);
		z-index: 4;
	}


	.cover{
		z-index: 4;
		transition: all 3s;
		transform-origin: center left;
	}

	.cover, .back-cover{
		height: 380px;
		width: 340px;
		background-color: #653e27;
		border-radius: 2px 20px 20px 2px;
		position: absolute;
		box-shadow: 1px 1px 10px gray;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
	}

	.back-cover{
		z-index: 1;
	}

	.page, .last-page{
		height: 360px;
		width: 330px;
		background: white;
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: 1px solid #e0e4ee;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 2;
	}

	.page:nth-child(2){
		transition-duration: 3s;
		z-index: 3;
	}
	.page:nth-child(3){
		transition-duration: 2.6s;
		z-index: 3;
	}
	.page:nth-child(4){
		transition-duration: 2.2s;
		z-index: 3;
	}
	.page:nth-child(5){
		transition-duration: 1.8s;
		z-index: 3;
	}
	.page:nth-child(6){
		transition-duration: 1.4s;
		z-index: 3;
	}

	.book.wasClicked .page:nth-child(2){
		transition-duration: 6s;
	}
	.book.wasClicked .page:nth-child(3){
		transition-duration: 5.6s;
	}
	.book.wasClicked .page:nth-child(4){
		transition-duration: 5.2s;
	}
	.book.wasClicked .page:nth-child(5){
		transition-duration: 4.8s;
	}
	.book.wasClicked .page:nth-child(6){
		transition-duration: 4.4s;
	}


	.last-page{
		position: relative;
		text-align: center;
		font-size: 1.5em;
	}


</style>
