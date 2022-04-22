<script>
	import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects } from "../stores.js";

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";
	let showProject = [];

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			$amountOfProjects = response.data
			console.log($amountOfProjects)
		} catch (error) {
			console.log(error);
		}
	});

</script>

<main>

	{#each $amountOfProjects as project, i (project)}
		<button on:click={() => (showProject[i] = !showProject[i])}>
			{project.title}
		</button>

		{#if showProject[i]}
			<div class="project">
				<h2>{project.title}</h2>
				<img
					src={project.image_url}
					alt={project.title}
					name="picture"
					height="200px"
				/>
				<p>{project.description}</p>
				<p>{project.category}</p>
			</div>
		{:else}
			<div />
		{/if}
	{/each}
</main>

<style>
</style>
