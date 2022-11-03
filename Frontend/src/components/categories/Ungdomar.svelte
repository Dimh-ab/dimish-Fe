<script>
	import { _ } from "svelte-i18n"
    import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects, checkPoint, projectId, bookId, adolescenceBooksRead } from "../../stores.js";
	import InterSectionObserver from "svelte-intersection-observer";
	import Update from '../Update.svelte'
    let updateBookComponent

	let isInShelf = true
	let element
    let intersecting
	let rootMargin = "-250px"
	const bookCopy = {...$amountOfProjects, read: true}

	// fixes issue with intersection observer on mobile devices
	if (window.innerHeight < 768) {
		rootMargin = "-150px"
	}

	export let key
    let wasClicked = -1

	const PROJECTS_ENDPOINT = "http://localhost:4000/api/projects";

	onMount(async () => {
		try {
			const response = await axios.get(PROJECTS_ENDPOINT);
			$amountOfProjects = response.data

			const adolescenceStorage = localStorage.getItem('adolescence')
			if(adolescenceStorage !== null){
				const storage = JSON.parse(adolescenceStorage)
				$adolescenceBooksRead = storage
			}
		} catch (error) {
			console.log(error);
		}
	});

	const clickBookSpine = (book, id) => {
		if(book.id !== id){
			$bookId = ''
			isInShelf = isInShelf
		} else if(book.id === id){
			$bookId = id
			isInShelf = !isInShelf
		}
	}

		// checks if books in this category have been read
		const checkReadBooks = () => {
		const newArray = $amountOfProjects.filter(book => book.category === 'Ungdomar')
		let array = [...newArray]
		let readArray = array.map(r => r.read)
		if(readArray.every(val => val === true)){
			$adolescenceBooksRead = true
			localStorage.setItem('adolescence', $adolescenceBooksRead)
			window.scrollTo({ left: 600, behavior: "smooth" })
		}
	}

    const openBook = (i) => {
		wasClicked = wasClicked === i ? -1 : i 

		$amountOfProjects.forEach(() => {
		if(i === wasClicked){
			$projectId = $bookId
		} 

		if(wasClicked === -1){
			$projectId = 0
			$amountOfProjects[i].read = true
			updateBookComponent.updateBook(bookCopy)
			checkReadBooks()
			}
		console.log(wasClicked, $projectId)
	})
	}

	const handleKeyDown = (i) => {
		if (key == 'Enter') {
			openBook(i);
		}	
  	}

	$: intersecting ? $checkPoint = $checkPoint = 2 : ''

</script>

<Update bind:this={updateBookComponent} />

<InterSectionObserver {element} bind:intersecting {rootMargin}>
<section id="second-category" class={"second-category " + ($bookId === $projectId ? "overlay" : "")}>
	<article  bind:this={element}>
		<main>
		{#each $amountOfProjects as project, i (project.id)}
		{#if project.category === "Ungdomar"}
		<div class={"book-spacing " + (i === wasClicked ? "zindex" : "")}>
					<button class={"backBtn " + (project.id === $bookId ? "visible" : "")} on:click={() => $bookId = $bookId = ''}>
						{$_("closeTheBook")}
					</button>
			<div
			tabindex="0" 
			class={"book " + (i === wasClicked ? 'wasClicked' : '')} 
			key={project.id}
			on:click={() => clickBookSpine(project, project.id)}
			on:keyup|preventDefault={() => handleKeyDown(i)}
			>
				<div class="spine1">
				<div class={"spine " + (project.id === $bookId ? 'shelfMode' : 'shake')}></div>
				</div>
				<div class={"cover " + (project.id === $bookId ? 'position' : 'shelfMode')} on:click={() => openBook(i)}>
					<h3 class="cover-title">
						{project.title}
					</h3>
				</div>
				<div class={"coverInside " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>

				<div class={"pages " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>
				<div class={"pages " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>
				<div class={"coverPage " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>

				<div class={"page " + (project.id === $bookId ? 'position' : 'shelfMode')} on:click={() => openBook(i)}>
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
					<div class={"last-page " + (project.id === $bookId ? 'position' : 'shelfMode')} on:click={() => openBook(i)}>	
						<p class="description">{project.description}</p>
					</div>
				<div class={"back-cover " + (project.id === $bookId ? 'position' : 'shelfMode')}></div>
			</div>	
				
		</div>
		{/if}
		{/each}
		</main>
	</article>
	<!-- <div class="sign">
		<div class="string"></div>
		<h1>{$_("adolescenceBalanceTitle")}</h1>
	</div> -->
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
	scale: 1.3;
}

.backBtn.visible{
	opacity: 1;
}

.backBtn:hover{
	color:#f9c851;
	transform: scale(1.4);
}
	.second-category{
		background: url(../images/cat2-final.png) no-repeat;
		width: 100%;
		height: 100%;
		background-size: contain;
	}

	.second-category.overlay{
		background:url(../images/cat2-final.png) no-repeat, rgba(0, 0, 0, 0.8);
		background-size: contain;
		background-blend-mode: overlay;
	}

	article{
		margin-top: 410px;
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

    /* h1{
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
    } */

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
		translate: 105px -220px;
		height: 800px;
		width: 600px;
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		background-color:transparent;
		transform: scale(0.4) rotate(90deg);
	}

	.book-spacing:first-child{
		translate: 40px 30px;
	}

	.book-spacing:nth-child(2){
		translate: 0 -50px;
	}
	.book-spacing:nth-child(3){
		translate: -30px 150px;
	}
	.book-spacing:nth-child(4){
		translate: 50px -30px;
	}
	.book-spacing:nth-child(5){
		translate: -50px 60px;
	}

	.book-spacing:first-child.zindex, .book-spacing:nth-child(2).zindex, .book-spacing:nth-child(3).zindex, .book-spacing:nth-child(4).zindex, .book-spacing:nth-child(5).zindex{
		position: relative;
		z-index: 10;
	}

	.book-spacing{
		margin: 0 10px;
	}

	.book{
		display: flex;
		align-items: center;
		cursor: pointer;
		/* transform: rotate(90deg); */
		position: relative;
	}

	.book.wasClicked .cover{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(5.8);
		transition-duration: 1.4s;
	}

	.book.wasClicked .coverInside{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(5.8);
		transition-duration: 1.4s;
		z-index: 6;
	}

	.book.wasClicked .coverPage{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(5.8);
		transition-duration: 1.4s;
		z-index: 7;
	}

	.book.wasClicked .page{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(5.8);
		transition-duration: 1.7s;
		z-index: 8;
		/* made changes from */
	}
	.book.wasClicked .pages{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(5.8);
		transition-duration: 1.7s;
		z-index: 6;
	}

	.book.wasClicked .back-cover{
		transform: perspective(1000px) rotateX(10deg) scale(5.8);
		transition-duration: 1.5s;
	}

	.book.wasClicked .last-page{
		transform: perspective(1000px) rotateX(10deg) scale(5.8);
		transition-duration: 1.4s;
		z-index: 2;
	}


	.book.wasClicked .spine1, .book.wasClicked .spine, .book.wasClicked .cover, .book.wasClicked .coverInside, .book.wasClicked .pages, .book.wasClicked .coverPage, .book.wasClicked .page, .book.wasClicked .last-page, .book.wasClicked .back-cover{
			translate: 0px 200px;
		}
	.book-spacing:nth-child(5) .book.wasClicked .spine1, .book-spacing:nth-child(5) .book.wasClicked .spine, .book-spacing:nth-child(5) .book.wasClicked .cover, .book-spacing:nth-child(5) .book.wasClicked .coverInside, .book-spacing:nth-child(5) .book.wasClicked .pages, .book-spacing:nth-child(5) .book.wasClicked .coverPage, .book-spacing:nth-child(5) .book.wasClicked .page, .book-spacing:nth-child(5) .book.wasClicked .last-page, .book-spacing:nth-child(5) .book.wasClicked .back-cover{
			translate: 0px -200px;
		}


	.cover{
		z-index: 6;
		transition: all 2s;
		transform-origin: center left;
		color: white;
		text-align: center;
		margin-right: 40px;
		background: url(../images/book2.png) no-repeat;
		background-size: cover;
	}

	.spine{
		transition: all 2s;
		transform-origin: center right;
		width: 60px;
		height: 200px;
		background: url(../images/spine2.png) no-repeat;
		background-size: cover;
		z-index: 1;
		border-radius: 5px;
		margin-left: -56px;
		box-shadow:
    	0 0 30px 15px #6f2dff94,  /* inner  */
    	0 0 50px 20px #4c00ff6d, /* middle  */
    	0 0 100px 50px #8800ff6f; /* outer */
		animation: glow 2s ease-in-out infinite alternate;
	}

	@keyframes glow {
		from{
			box-shadow:
    		0 0 10px 5px #6f2dff94,  /* inner  */
    		0 0 30px 15px #4c00ff6d, /* middle  */
    		0 0 50px 25px #8800ff6f; /* outer */
		}
		to{
			box-shadow:
    		0 0 40px 20px #6f2dff94,  /* inner  */
    		0 0 60px 30px #4c00ff6d, /* middle  */
    		0 0 110px 60px #8800ff6f;; /* outer  */
		}
	}
	

	.spine.shelfMode{
		transform: perspective(1000px) rotateX(-1deg) rotateY(-90deg);
		transition-duration: 1.3s;
		/* animation: none; */
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
		background-color: var(--book-color-teens);
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
		background-color: var(--book-color-teens);
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
		z-index: 4;
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
		transform: perspective(1000px) rotateX(10deg) rotateY(-182deg) scale(5.8);
	}
	.book.wasClicked .pages:nth-child(7){
		transition-duration: 1.7s;
		border-radius: 7px 10px 10px 2px;
		transform: perspective(1000px) rotateX(10deg) rotateY(-181deg) scale(5.8);
	}
	.book.wasClicked .pages:nth-child(6){
		transition-duration: 1.7;
		border-radius: 6px 10px 10px 2px;
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(5.8);
	}
	.book.wasClicked .pages:nth-child(5){
		transition-duration: 1.6s;
		border-radius: 5px 10px 10px 2px;
		transform: perspective(1000px) rotateX(10deg) rotateY(-179deg) scale(5.8);
	}
	.book.wasClicked .pages:nth-child(4){
		transition-duration: 1.5s;
		border-radius: 4px 10px 10px 2px;
		transform: perspective(1000px) rotateX(10deg) rotateY(-179deg) scale(5.8);
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
		/* transform: translateY(0); */
		/* transition-duration: 95s; */
		text-align: left;
		margin: 1em;
	}

	@media only screen and (max-width: 1200px){
        /* .second-category{
            width: 100%;
		    height: 200%;
			top: 4505px;
			left: 0;
        } */

		article{
			margin-top: 630px;
		}

		main{
			translate: 235px -220px;
		}
    }

	@media only screen and (max-width: 1024px){

		/* .second-category{
			top: 4225px;
		} */

		article{
			margin-top: 600px;
		}
	}

	@media only screen and (max-width: 1000px){
		main{
			/* left: -300px; */
			translate: -10px -400px;
		}

		.cover, .back-cover, .coverInside{
			height: 150px;
			width: 100px;
		}

		.pages, .page, .coverPage, .last-page{
			height: 130px;
			width: 90px;
		}

		.spine{
			height: 150px;
			width: 35px;
			margin-left: -31px;
		}

		.book.wasClicked .cover, .book.wasClicked .coverPage, .book.wasClicked .coverInside, .book.wasClicked .pages, .book.wasClicked .page{
			transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(6.7);
		}

		.book.wasClicked .back-cover, .book.wasClicked .last-page{
			transform: perspective(1000px) rotateX(10deg) scale(6.7);
		}

		.picture{
			height: 35px;
			margin: 0.7em;
		}

		/* h1{
			font-size: 1.2em;
			width: 180px;
			position: absolute;
			right: -45px;
    	}

		.string{
			height: 170px;
		} */
		
	}

	@media only screen and (max-height: 425px){
		/* .second-category{
			top: 2390px;
            width: 1000px;
            height: 800px;
        } */

		article{
			margin-top: 30px;
		}

		main{
			translate: 0px 0px;
		}
    }

    @media only screen and (max-height: 390px){
        /* .second-category{
            height: 730px;
			top: 2200px;
        } */

		article{
			margin-top: 0px;
		}

		main{
			translate: -10px 0px;
		}

		.book-spacing:first-child{
			translate: -30px 160px;
		}

		.book-spacing:nth-child(2){
			translate: 0px 100px;
		}
		.book-spacing:nth-child(3){
			translate: -30px 280px;
		}
		.book-spacing:nth-child(4){
			translate: -50px -30px;
		}
    }
    @media only screen and (max-height: 375px){
        /* .second-category{
            height: 700px;
			top: 2120px;
        } */
    }
    @media only screen and (max-height: 345px){
        /* .second-category{
            height: 645px;
			top: 1960px;
        } */

		main{
			translate: -30px -40px;
		}
    }
    @media only screen and (max-height: 325px){
        /* .second-category{
            height: 605px;
			top: 1850px;
        } */

		main{
			translate: -50px -40px;
		}
    }

</style>