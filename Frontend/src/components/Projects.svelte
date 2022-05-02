<script>
	import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects } from "../stores.js";

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";
	let wasClicked = -1

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			$amountOfProjects = response.data
			// checkDescriptionLength()
		} catch (error) {
			console.log(error);
		}
	});

	const checkDescriptionLength = () => {
		for (let i = 0; i < $amountOfProjects.length; i++) {
			if ($amountOfProjects[i].description.length > 400) {
				$amountOfProjects[i].description = $amountOfProjects[i].description.slice(0, 400) + "..."
			}
		}
	}

	const openBook = (i) => {
		wasClicked = wasClicked === i ? -1 : i 
	}


</script>

	{#each $amountOfProjects as project, i}
	<main>
			<div class={"book " + (i === wasClicked ? 'wasClicked' : '')} on:click={() => openBook(i)}>
				<div class="cover">{project.title}</div>
				<!-- <div class="cover2"></div> -->
				<div class="page"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="page"></div>
				<div class="page pageWithContent">
					<h2 class="title">{project.title}</h2>
			
					<img
					src={project.image_url}
					alt={project.title}
					name="picture"
					height="50px"
					class="picture"
				/>
					<p class="category">{project.category}</p>
				</div>

				<div class="last-page">	
				<p class="description">{project.description}</p>
				</div>

				<div class="back-cover"></div>
			</div>
		</main>
	{/each}

<style>
	*{
		margin: 0;
		padding: 0;
		font-family: sans-serif;
	}

	p{
		font-size: 0.5em;
	}

	h2{
		font-size: 0.7em;
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
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3);
		transition-duration: 3s;
	}

	/* .book.wasClicked .cover2{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(2.2);
		transition-duration: 3s;
		z-index: 4;
	} */

	.book.wasClicked .page{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3);
		transition-duration: 3s;
		z-index: 4;
	}

	.book.wasClicked .back-cover{
		transform: perspective(1000px) rotateX(10deg) scale(3);
		transition-duration: 3s;
	}

	.book.wasClicked .last-page{
		transform: perspective(1000px) rotateX(10deg) scale(3);
		transition-duration: 3s;
	}


	.cover{
		z-index: 4;
		transition: all 3s;
		transform-origin: center left;
		color: white;
		text-align: center;
	}

	.cover, .back-cover{
		height: 180px;
		width: 140px;
		background-color: #653e27;
		border-radius: 2px 20px 20px 2px;
		position: absolute;
		box-shadow: 1px 1px 10px gray;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		transition-duration: 3s;
	}

	.back-cover{
		transform: perspective(1000px) rotateX(10deg);
		z-index: 1;
	}

	.page, .last-page{
		height: 160px;
		width: 130px;
		background: white;
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: 1px solid #e0e4ee;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 2;
	}

	.picture, .title, .category{
		transform: rotateY(180deg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1em;
	}

	.page:nth-child(8){
		transition-duration: 3s;
		z-index: 3;
	}
	.page:nth-child(7){
		transition-duration: 3s;
		z-index: 3;
	}
	.page:nth-child(6){
		transition-duration: 3s;
		z-index: 3;
	}
	.page:nth-child(5){
		transition-duration: 2.6s;
		z-index: 3;
	}
	.page:nth-child(4){
		transition-duration: 2.2s;
		z-index: 3;
	}
	.page:nth-child(3){
		transition-duration: 1.8s;
		z-index: 3;
	}
	.page:nth-child(2){
		transition-duration: 1.4s;
		z-index: 3;
	}

	.book.wasClicked .page:nth-child(8){
		transition-duration: 5.8s;
		border-radius: 7px 10px 10px 2px;
	}
	.book.wasClicked .page:nth-child(7){
		transition-duration: 5.4s;
		border-radius: 7px 10px 10px 2px;
	}
	.book.wasClicked .page:nth-child(6){
		transition-duration: 5s;
		border-radius: 7px 10px 10px 2px;
	}
	.book.wasClicked .page:nth-child(5){
		transition-duration: 4.6s;
		border-radius: 6px 10px 10px 2px;
	}
	.book.wasClicked .page:nth-child(4){
		transition-duration: 4.2s;
		border-radius: 5px 10px 10px 2px;
	}
	.book.wasClicked .page:nth-child(3){
		transition-duration: 3.8s;
		border-radius: 4px 10px 10px 2px;
	}
	.book.wasClicked .page:nth-child(2){
		transition-duration: 3.4s;
		border-radius: 3px 10px 10px 2px;
	}


	.last-page{
		position: relative;
		text-align: center;
		font-size: 1em;
		transition-duration: 3s;
		line-height: 0.8em;
		overflow: hidden;
	}

	.last-page .description{
		position: absolute;
		transform: translateY(0);
		transition-duration: 95s;
		text-align: left;
		margin: 1em;
	}

	/* description becomes blurry on hover because of the scaling */
	/* will need something different for phone view so might be easier to break description into 2 sections if longer than 500 char */
	.last-page:hover .description{
		transform: translateY(calc(-100%));
	}


</style>
