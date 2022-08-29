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

				<div class="edit">
					<Edit id={project.id} i={i}/>
				</div>

				{#if $isEditing && $show[i]}
					<div/>
				{:else}
				<div class="header">
					<h2>{project.title}</h2>
				</div>
				<img
					src={project.image_url}
					alt={project.title}
					name="picture"
					height="250px"
				/>
				<div>
					<p><strong>Description</strong></p>
					<p class="description">{project.description}</p>
				</div>
				
				<div class="category">
					<p><strong>Category</strong></p>
					<p>{project.category}</p>
				</div>

				<div class="delete">
					<DeleteBtn id={project.id}/>
				</div>

				{/if}
			</article>
	{/each}
</section>

<style>
	section{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-evenly;
	}
	.project{
		width: 350px;
		max-height: 480px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin: 20px;
		padding: 5px;
		border-radius: 3px;
		background-color: #f5f5f5;
		overflow: hidden;
		position: relative;
	}

	img{
		width: 100%;
		height: auto;
		max-height: 250px;
		border-radius: 3px;
		margin-top: 40px;
	}

	h2{
		text-decoration: underline;
		text-align: center;
		z-index: 1;
	}

	.header{
		width: 100%;
		overflow: hidden;
		background-color: transparent;
		position: absolute;
		z-index: 1;
	}

	.edit{
		width: 100%;
		text-align: left;
		position: absolute;
		z-index: 100;
	}

	.delete{
		width: 100%;
		text-align: right;
		margin-right: 7px;
	}

	p{
		margin: 5px 15px;
	}

	.description{
		overflow-y: scroll;
		height: 100px;
		width: 320px;
		background-color: #fff;
		padding: 5px;
		border-radius: 3px;
	}

	.category{
		width: 100%;
	}

	strong{
		text-decoration: underline;
	}
	
   
</style>
