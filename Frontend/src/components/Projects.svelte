<script>
	import { onMount, setContext } from "svelte";
	import axios from "axios";
	// import {writable} from "svelte/store";

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";
	let projects = [];
	let showProject = [];

	// const addProjects = (newProject) => {
    //         const newArray = [...projects, newProject]
    //         console.log(newArray)
    //         projects = newArray
    // }

	// setContext( 'addProjectContext', projects )


	// export const projectsStore = writable(projects);

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			console.log(response.data);
			projects = response.data;
		} catch (error) {
			console.log(error);
		}
	});

</script>

<main>

	{#each projects as project, i (project)}
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
