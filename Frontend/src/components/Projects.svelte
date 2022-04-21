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
			// projectsStore.set(projects);
		} catch (error) {
			console.log(error);
		}
	});


</script>

<main>
	<!-- <img
		src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4
	//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
		alt="Red dot"
	/> -->

	{#each projects as project, i (project)}
		<button on:click={() => (showProject[i] = !showProject[i])}
			>{project.title}</button
		>

		{#if showProject[i]}
			<div class="project">
				<h2>{project.title}</h2>

				<img
					src="data:image/jpg;base64,{project.encode}"
					alt={project.title}
					name="picture"
				/>

				<p>Picture : {project.encode}</p>
				<p>{project.description}</p>
			</div>
		{:else}
			<div />
		{/if}
	{/each}
</main>

<style>
</style>
