<script>
	import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects, isEditing, show } from "../stores.js";
	import DeleteBtn from "./DeleteBtn.svelte";
	import Edit from "./Edit.svelte";

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			$amountOfProjects = response.data
			console.log($amountOfProjects)
		} catch (error) {
			console.log(error);
		}
	});

	console.log($isEditing)

</script>

<main>

	{#each $amountOfProjects as project, i}
			<div class="project">
				<Edit id={project.id} i={i}/>

				{#if $isEditing && $show[i]}
					<div/>
				{:else}
				<h2>{project.title}</h2>
				<img
					src={project.image_url}
					alt={project.title}
					name="picture"
					height="200px"
				/>
				<p>{project.description}</p>
				<p>category: {project.category}</p>
				{/if}
				
				<DeleteBtn id={project.id}/>
			</div>
	{/each}
</main>

<style>
	main{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

	}
	.project{
		width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin: 20px;
		padding: 20px;
		border: 1px solid black;
		border-radius: 10px;
		background-color: #f5f5f5;
	}
   
</style>
