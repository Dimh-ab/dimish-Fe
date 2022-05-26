<script>

    import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects, checkPoint } from "../../stores.js";
	import InterSectionObserver from "svelte-intersection-observer";

	let element
    let intersecting
	let rootMargin = "-250px"

	// $: console.log('informativt', element)
    // $: console.log('informativt', intersecting)

	export let key
    let wasClicked = -1

    const openBook = (i) => {
		wasClicked = wasClicked === i ? -1 : i 
	}

	const handleKeyDown = (i) => {
		if (key == 'Enter') {
			openBook(i);
		}	
  	}

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			$amountOfProjects = response.data
		} catch (error) {
			console.log(error);
		}
	});

	$: intersecting ? $checkPoint = $checkPoint = 5 : ''

</script>

<InterSectionObserver {element} bind:intersecting {rootMargin}>
<section>
	<article bind:this={element}>
    {#each $amountOfProjects as project, i}
    {#if project.category === "Informativt"}
	<main>
			<div 
			tabindex="0"
			class={"book " + (i === wasClicked ? 'wasClicked' : '')} 
			on:click={() => openBook(i)}
			on:keyup|preventDefault={() => handleKeyDown(i)}
			>
				<div class="cover">{project.title}</div>
				<div class="coverInside"></div>

				<div class="pages"></div>
				<div class="pages"></div>
				<div class="pages"></div>
				<div class="pages"></div>
				<div class="pages"></div>
				<div class="coverPage"></div>
				<div class="page">
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
    {/if}
	{/each}
	</article>
    <h1>Informativt</h1>
</section>
</InterSectionObserver>

<style>

	section{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-left: 200px;
	}

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

    h1{
        transform: rotate(90deg);
		font-size: 2em;
		color: var(--title-color);
		width: 300px;
    }

	main{
		height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color:transparent;
	}

	.book{
		display: flex;
		align-items: center;
		cursor: pointer;
		transform: rotate(90deg);
	}


	.book.wasClicked .cover{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(2.7);
		transition-duration: 2s;
	}

	.book.wasClicked .coverInside{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(2.7);
		transition-duration: 2s;
		z-index: 6;
	}

	.book.wasClicked .coverPage{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(2.7);
		transition-duration: 2s;
		z-index: 7;
	}

	.book.wasClicked .page{
		/* opacity: 1; */
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(2.7);
		transition-duration: 2s;
		z-index: 9;
	}
	.book.wasClicked .pages{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(2.7);
		transition-duration: 2s;
		z-index: 6;
	}

	.book.wasClicked .back-cover{
		transform: perspective(1000px) rotateX(10deg) scale(2.7);
		transition-duration: 2s;
	}

	.book.wasClicked .last-page{
		transform: perspective(1000px) rotateX(10deg) scale(2.7);
		transition-duration: 2s;
	}


	.cover{
		z-index: 6;
		transition: all 3s;
		transform-origin: center left;
		color: white;
		text-align: center;
	}

	.cover, .back-cover{
		height: 180px;
		width: 140px;
		background-color: var( --book-color-informatory);
		border-radius: 2px 20px 20px 2px;
		position: absolute;
		box-shadow: 1px 1px 10px gray;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		transition-duration: 3s;
	}

	/* covers the top cover on the inside so text etc is not visible when opened */
	.coverInside{
		z-index: 5;
		height: 180px;
		width: 140px;
		background-color: var( --book-color-informatory);
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

	.last-page{
		height: 160px;
		width: 130px;
		background: var(--pages-color);
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: var(--pages-border);
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 2;
	}

	.page{
		height: 160px;
		width: 130px;
		background: var(--pages-color);
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: var(--pages-border);
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 2;
		transition-duration: 2s;
	}
	.pages{
		height: 160px;
		width: 130px;
		background: var(--pages-color);
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: var(--pages-border);
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 5;
		transition-duration: 3s;
	}

	.coverPage{
		height: 160px;
		width: 130px;
		background: var(--pages-color);
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: none;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 5;
		transition-duration: 2s;
	}

	.picture, .title, .category{
		transform: rotateY(180deg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1em;
	}


	.pages:nth-child(7){
		transition-duration: 2.8s;
		z-index: 5;
	}
	.pages:nth-child(6){
		transition-duration: 2.6s;
		z-index: 5;
	}
	.pages:nth-child(5){
		transition-duration: 2.4s;
		z-index: 5;
	}
	.pages:nth-child(4){
		transition-duration: 2.2s;
		z-index: 5;
	}
	.pages:nth-child(3){
		transition-duration: 2s;
		z-index: 5;
	}

	.book.wasClicked .pages:nth-child(7){
		transition-duration: 2.8s;
		border-radius: 7px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(6){
		transition-duration: 2.6s;
		border-radius: 7px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(5){
		transition-duration: 2.4;
		border-radius: 6px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(4){
		transition-duration: 2.2s;
		border-radius: 5px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(3){
		transition-duration: 2s;
		border-radius: 4px 10px 10px 2px;
	}
	.book.wasClicked .page{
		transition-duration: 3s;
		border-radius: 3px 10px 10px 2px;
	} 
	.book.wasClicked .coverPage{
		transition-duration: 3s;
		border-radius: 3px 10px 10px 2px;
	} 


	.last-page{
		position: relative;
		text-align: center;
		font-size: 0.5em;
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

</style>