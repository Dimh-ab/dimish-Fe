<script>

    import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects, checkPoint } from "../../stores.js";
	import InterSectionObserver from "svelte-intersection-observer";

	let isInShelf = true
	let bookId = ""
	let element
    let intersecting
	let rootMargin = "-250px"

	export let key
    let wasClicked = -1

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			$amountOfProjects = response.data
		} catch (error) {
			console.log(error);
		}
	});

	const clickBookSpine = (book, id) => {
		if(book.id !== id){
			bookId = ''
			isInShelf = isInShelf
		} else if(book.id === id){
			bookId = id
			isInShelf = !isInShelf
			console.log(bookId, id)
		}
	}

	$: console.log(bookId)

    const openBook = (i) => {
		wasClicked = wasClicked === i ? -1 : i 
		console.log(wasClicked, i)
	}

	const handleKeyDown = (i) => {
		if (key == 'Enter') {
			openBook(i);
		}	
  	}

	$: intersecting ? $checkPoint = $checkPoint = 5 : ''

</script>

<InterSectionObserver {element} bind:intersecting {rootMargin}>
<section>
	<article  bind:this={element}>
		<main>
		{#each $amountOfProjects as project, i (project.id)}
		{#if project.category === "Stöd och Rörlighet"}
		<div class="book-spacing">
					<button class={"backBtn " + (project.id === bookId ? "visible" : "")} on:click={() => bookId = bookId = ''}>
						{'<- ställ tillbaka'}
					</button>
			<div
			tabindex="0" 
			class={"book " + (i === wasClicked ? 'wasClicked' : '')} 
			key={project.id}
			on:click={() => clickBookSpine(project, project.id)}
			on:keyup|preventDefault={() => handleKeyDown(i)}
			>
				<div class="spine1">
				<div class={"spine " + (project.id === bookId ? 'shelfMode' : 'shake')}></div>
				</div>
				<div class={"cover " + (project.id === bookId ? 'position' : 'shelfMode')} on:click={() => openBook(i)}>
					<h3 class="cover-title">
						{project.title}
					</h3>
				</div>
				<div class={"coverInside " + (project.id === bookId ? 'position' : 'shelfMode')}></div>

				<div class={"pages " + (project.id === bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === bookId ? 'position' : 'shelfMode')}></div>
				<div class={"coverPage " + (project.id === bookId ? 'position' : 'shelfMode')}></div>

				<div class={"page " + (project.id === bookId ? 'position' : 'shelfMode')} on:click={() => openBook(i)}>
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
					<div class={"last-page " + (project.id === bookId ? 'position' : 'shelfMode')} on:click={() => openBook(i)}>	
						<p class="description">{project.description}</p>
					</div>
				<div class={"back-cover " + (project.id === bookId ? 'position' : 'shelfMode')}></div>
			</div>	
				
		</div>
		{/if}
		{/each}
		</main>
	</article>
	<div class="sign">
		<div class="string"></div>
		<h1>Stöd och Rörlighet</h1>
	</div>
</section>
</InterSectionObserver>

<style>


.backBtn{
	position: relative;
	height: 60px;
	width: 150px;
	border: none;
	opacity: 0;
	z-index: 2;
	cursor: pointer;
	transition-duration: 0.4s;
	background: transparent;
	color: #fff;
	font-size: 1.5rem;
}

.backBtn.visible{
	opacity: 1;
}

.backBtn:hover{
	color:#f9c851;
	transform: scale(1.1);
}
	section{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

    *{
		margin: 0;
		padding: 0;
		font-family: var(--font);
	}

	p{
		font-size: 0.5em;
	}

	h2{
		font-size: 0.7em;
	}

	.sign{
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

    h1{
        transform: rotate(90deg);
		font-size: 1.6em;
		color: var(--title-color);
		width: 300px;
		letter-spacing: 2px;
		z-index: 0;
		position: absolute;
		right: -80px;
		background-color: #222;
		padding: 20px 0;
		border: 10px solid #deb886;
        box-shadow: 3px 3px 30px rgb(0, 0, 0);
    }

	.string{
		border: 2px solid silver;
		width: 100px;
		height: 300px;
		position: absolute;
		right: -50px;
	}

	.cover-title{
		margin-top: 50px;
		font-weight: 200;
		letter-spacing: 2px;
	}

	main{
		height: 400px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color:transparent;
		transform: scale(0.7) rotate(90deg);
		position: relative;
		left: -150px;
	}

	.book-spacing{
		margin: 0 150px;
	}

	.book{
		display: flex;
		align-items: center;
		cursor: pointer;
		/* transform: rotate(90deg); */
		position: relative;
	}


	.book.wasClicked .cover{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3.7);
		transition-duration: 1.4s;
	}

	.book.wasClicked .coverInside{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3.7);
		transition-duration: 1.4s;
		z-index: 6;
	}

	.book.wasClicked .coverPage{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3.7);
		transition-duration: 1.4s;
		z-index: 7;
	}

	.book.wasClicked .page{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3.7);
		transition-duration: 1.7s;
		z-index: 9;
	}
	.book.wasClicked .pages{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3.7);
		transition-duration: 1.7s;
		z-index: 6;
	}

	.book.wasClicked .back-cover{
		transform: perspective(1000px) rotateX(10deg) scale(3.7);
		transition-duration: 1.5s;
	}

	.book.wasClicked .last-page{
		transform: perspective(1000px) rotateX(10deg) scale(3.7);
		transition-duration: 1.4s;
		z-index: 2;
	}


	.cover{
		z-index: 6;
		transition: all 2s;
		transform-origin: center left;
		color: white;
		text-align: center;
		margin-right: 40px;
		background: url(../images/book5.png) no-repeat;
		background-size: cover;
	}

	.spine{
		transition: all 2s;
		transform-origin: center right;
		width: 60px;
		height: 200px;
		background: url(../images/spine5.png) no-repeat;
		background-size: cover;
		z-index: 1;
		border-radius: 5px;
		margin-left: -56px;
	}
	/* .spine.shake{
		animation: shake 1s;
		animation-iteration-count: infinite;
	} */

	.spine.shelfMode{
		transform: perspective(1000px) rotateX(-1deg) rotateY(-90deg);
		transition-duration: 1.3s;
		/* animation: none; */
	}


	@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

	.cover.shelfMode, .coverInside.shelfMode{
		transform: perspective(1000px) rotateX(-1deg) rotateY(90deg);
		transition-duration: 1.3s;
	}

	.page.shelfMode, .pages.shelfMode, .coverPage.shelfMode, .back-cover.shelfMode, .last-page.shelfMode{
		transform: perspective(1000px) rotateX(-1deg) rotateY(90deg);
		transition-duration: 1.3s;
	}

	.cover, .back-cover{
		height: 200px;
		width: 150px;
		background-color: var(--book-color-informatory);
		border-radius: 5px 20px 20px 5px;
		position: absolute;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		transition-duration: 1.5s;
	}

	/* covers the top cover on the inside so text etc is not visible when opened */
	.coverInside{
		z-index: 5;
		height: 200px;
		width: 150px;
		background-color: var(--book-color-informatory);
		border-radius: 2px 20px 20px 2px;
		position: absolute;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		transition-duration: 1.5s;
	}



	.back-cover{
		transform: perspective(1000px) rotateX(10deg);
		z-index: 1;
	}

	.last-page{
		height: 180px;
		width: 140px;
		background: var(--pages-color);
		border-radius: 2px 10px 10px 2px;
		border: var(--pages-border);
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 2;

		position: absolute;
		text-align: center;
		font-size: 0.5em;
		transition-duration: 1.5s;
		line-height: 0.8em;
		overflow: hidden;
	}

	.page{
		height: 180px;
		width: 140px;
		background: var(--pages-color);
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: var(--pages-border);
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 2;
		transition-duration: 1.5s;
	}
	.pages{
		height: 180px;
		width: 140px;
		background: var(--pages-color);
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: var(--pages-border);
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 5;
		transition-duration: 1.5s;
	}

	.coverPage{
		height: 180px;
		width: 140px;
		background: var(--pages-color);
		position: absolute;
		border-radius: 2px 10px 10px 2px;
		border: none;
		transform: perspective(1000px) rotateX(10deg);
		transform-origin: center left;
		z-index: 5;
		transition-duration: 1.5s;
	}

	.picture, .title, .category{
		transform: rotateY(180deg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1em;
	}


	.pages:nth-child(8){
		transition-duration: 1.7s;
		z-index: 5;
	}
	.pages:nth-child(7){
		transition-duration: 1.7s;
		z-index: 5;
	}
	.pages:nth-child(6){
		transition-duration: 1.6s;
		z-index: 5;
	}
	.pages:nth-child(5){
		transition-duration: 1.6s;
		z-index: 5;
	}
	.pages:nth-child(4){
		transition-duration: 1.5s;
		z-index: 5;
	}

	.book.wasClicked .pages:nth-child(8){
		transition-duration: 1.7s;
		border-radius: 7px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(7){
		transition-duration: 1.7s;
		border-radius: 7px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(6){
		transition-duration: 1.7;
		border-radius: 6px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(5){
		transition-duration: 1.6s;
		border-radius: 5px 10px 10px 2px;
	}
	.book.wasClicked .pages:nth-child(4){
		transition-duration: 1.5s;
		border-radius: 4px 10px 10px 2px;
	}
	.book.wasClicked .page{
		transition-duration: 1.7s;
		border-radius: 3px 10px 10px 2px;
	} 
	.book.wasClicked .coverPage{
		transition-duration: 1.7s;
		border-radius: 3px 10px 10px 2px;
	} 

	.last-page .description{
		position: absolute;
		transform: translateY(0);
		transition-duration: 95s;
		text-align: left;
		margin: 1em;
	}

</style>