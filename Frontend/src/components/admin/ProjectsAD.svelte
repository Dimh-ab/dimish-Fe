<script>
	import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects, isEditing, show } from "../../stores.js";
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

</script>

<section>
	{#each $amountOfProjects as project, i}
			<article class="project">

				{#if $isEditing && $show[i]}
					<div/>
				{:else}
				<img
					src={project.image_url}
					alt={project.title}
					name="picture"
					height="250px"
				/>
				<h2>{project.title}</h2>
				<p class="description">{project.description}</p>
				<p>category: {project.category}</p>
				{/if}

				<div class="edit-delete-buttons">
					<DeleteBtn id={project.id}/>
					<Edit id={project.id} i={i}/>
				</div>
			</article>
	{/each}
</section>

<style>
	section{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

	}
	.project{
		width: 350px;
		max-height: 550px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin: 20px;
		/* border: 2px solid #c0c0c0; */
		border-radius: 10px;
		background-color: #f5f5f5;
	}

	img{
		width: 100%;
		height: auto;
		border-radius: 10px 10px 0 0;
	}

	p{
		margin: 5px 20px;
	}

	.description{
		overflow-y: scroll;
	}
	
   
</style>
