<script>
import { onMount } from "svelte";
import axios from "axios";
import Login from "./components/Login.svelte";

const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";

let projects = [];

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
	<Login/>
	{#each projects as project}
		<div class="project">
			<h2>{project.title}</h2>
			<p>{project.description}</p>
		</div>
	{/each}
</main>

<style>
</style>