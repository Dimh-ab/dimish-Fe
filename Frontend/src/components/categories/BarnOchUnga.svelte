<script>
	import { _ } from "svelte-i18n"
    import { onMount } from "svelte";
	import axios from "axios";
	import { amountOfProjects, checkPoint, bookId, projectId, allKidsBooksRead } from "../../stores.js";
	import InterSectionObserver from "svelte-intersection-observer";

	$: intersecting ? $checkPoint = $checkPoint = 1 : ''
	
	$: console.log('intersecting', intersecting)

	let isInShelf = true
	// let bookId = ""
	// let projectId
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
			// console.log($amountOfProjects)
		} catch (error) {
			console.log(error);
		}
	});

		// TODO:
	// if all have been read, girl transforms into fairy

	// animates the book from spine to cover
	const clickBookSpine = (book, id) => {
		if(book.id !== id){
			$bookId = ''
			console.log(projectId)
			isInShelf = isInShelf
		} else if(book.id === id){
			$bookId = id
			isInShelf = !isInShelf
			console.log($bookId, id, $projectId)
		}
	}


	// checks if books in this category have been read
	const checkReadBooks = () => {
		const newArray = $amountOfProjects.filter(book => book.category === 'Barn och Unga')
		console.log('FIRST CATEGORY', newArray)

		// BUG: when all are true or all have been read and you want read a book again all become unread or false again. 

		let array = [...newArray]
		
		array.forEach((a, i) => {
			console.log(a.read)
			if(a.read === false){
				$allKidsBooksRead = false
				console.log('have not been read', $allKidsBooksRead)
			} else{
				$allKidsBooksRead = true
				console.log('have been read', $allKidsBooksRead)
			}
		})
	}

	$: console.log('all books have been read = ', $allKidsBooksRead)
	

	// updates the projects array with updated book
	const updateBook = (updated) => {
		const array = [...$amountOfProjects]
		console.log(array)
		
		let hasUpdated = array.map((p) => p.id === updated.id ? updated : p) 
			if(hasUpdated){
				$amountOfProjects = hasUpdated
			}
	}

    const openBook = (i) => {
		wasClicked = wasClicked === i ? -1 : i

		$amountOfProjects.forEach(() => {
			if(i === wasClicked){
			$projectId = $bookId
			$amountOfProjects[i].read = true
			updateBook(bookCopy)
			checkReadBooks()
			} 
			// else if( i === wasClicked && $amountOfProjects[i].read !== true){
			// 	$amountOfProjects[i].read = true
			// 	updateBook(bookCopy)
			// }
		})
		
	}

	// function to open books with enter key
	const handleKeyDown = (i) => {
		if (key == 'Enter') {
			openBook(i);
		}	
  	}


</script>

<InterSectionObserver {element} bind:intersecting {rootMargin}>
<section id="first-category" class={"first-category " + ($bookId === $projectId ? "overlay" : "")}>
	<article  bind:this={element}>
		<main>
		{#each $amountOfProjects as project, i (project.id)}
		{#if project.category === "Barn och Unga"}
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
	<div class="sign">
		<div class="string"></div>
		<h1>{$_("descendantsTitle")}</h1>
	</div>
</section>
</InterSectionObserver>

<style>

:root {
  --book-color-kids: #E4A400;
  --book-color-teens: #3D208D;
  --book-color-mobility: #0E356F;
  --book-color-primarycare: #203F29;
  --book-color-informatory: #111;
  --book-color-other: #f9c851;
    --pages-color: white;
    --pages-border: 1px solid #e0e4ee;
	--title-color: rgb(255, 255, 255);
	--font: 'Joan', serif;
}


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

	.first-category{
		position: absolute;
		/* width: 100vh; */
		/* height: 100%; */
		top: 1800px;
		left: -30px;
		background: url(../images/cat-bg/bckg010101.png) no-repeat;
		/* background-size: 100%; */
		width: 1028px;
		height: 1650px;
		background-size: contain;
	}

	.first-category.overlay{
		background:url(../images/cat-bg/bckg010101.png) no-repeat, rgba(0, 0, 0, 0.8);
		width: 1028px;
		height: 1650px;
		background-size: contain;
		background-blend-mode: overlay;
	}
	article{
		margin-top: 400px;
		top: 50%;
		left: 50%;
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
		translate: 0 -350px
	}

    h1{
        transform: rotate(90deg);
		font-size: 1.6em;
		color: var(--title-color);
		width: 300px;
		letter-spacing: 2px;
		z-index: 0;
		position: absolute;
		left: 40%;
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
		/* right: -50px; */
		left: 55%;
	}

	.cover-title{
		margin-top: 70px;
		font-weight: 200;
		letter-spacing: 2px;
	}

	main{
		translate: 35px 0;
		height: 800px;
		width: 600px;
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-start;
		background-color:transparent;
		transform: scale(0.7) rotate(90deg);
	}

	.book-spacing:first-child{
		translate: -345px 275px;
	}

	.book-spacing:nth-child(2){
		translate: -418px 275px;
	}
	.book-spacing:nth-child(3){
		translate: -180px 0px;
	}
	.book-spacing:nth-child(4){
		translate: -70px 10px;
	}
	.book-spacing:nth-child(5){
		translate: -50px 270px;
	}
	.book-spacing:nth-child(6){
		translate: -80px 270px;
	}
	.book-spacing:nth-child(7){
		translate: -15px 5px;
	}

	.book-spacing:first-child.zindex, .book-spacing:nth-child(2).zindex, .book-spacing:nth-child(3).zindex, .book-spacing:nth-child(4).zindex, .book-spacing:nth-child(5).zindex, .book-spacing:nth-child(6).zindex, .book-spacing:nth-child(7).zindex{
		position: relative;
		z-index: 10;
	}


	.book-spacing{
		margin: 0 10px;
	}

	.book{
		display: flex;
		/* align-self: flex-start; */
		/* align-items: center; */
		cursor: pointer;
		/* transform: rotate(90deg); */
		/* position: relative; */
	}


	.book.wasClicked .cover{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3);
		transition-duration: 1.4s;
	}

	.book.wasClicked .coverInside{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3);
		transition-duration: 1.4s;
		z-index: 6;
	}

	.book.wasClicked .coverPage{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3);
		transition-duration: 1.4s;
		z-index: 7;
	}

	.book.wasClicked .page{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3);
		transition-duration: 1.7s;
		z-index: 9;
	}
	.book.wasClicked .pages{
		transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(3);
		transition-duration: 1.7s;
		z-index: 6;
	}

	.book.wasClicked .back-cover{
		transform: perspective(1000px) rotateX(10deg) scale(3);
		transition-duration: 1.5s;
	}

	.book.wasClicked .last-page{
		transform: perspective(1000px) rotateX(10deg) scale(3);
		transition-duration: 1.4s;
		z-index: 2;
	}

	.book.wasClicked .spine1, .book.wasClicked .spine, .book.wasClicked .cover, .book.wasClicked .coverInside, .book.wasClicked .pages, .book.wasClicked .coverPage, .book.wasClicked .page, .book.wasClicked .last-page, .book.wasClicked .back-cover{			
			translate: 0px 0px;
	}

	.book-spacing:nth-child(3) .book.wasClicked .spine1, .book-spacing:nth-child(3) .book.wasClicked .spine, .book-spacing:nth-child(3) .book.wasClicked .cover, .book-spacing:nth-child(3) .book.wasClicked .coverInside, .book-spacing:nth-child(3) .book.wasClicked .pages, .book-spacing:nth-child(3) .book.wasClicked .coverPage, .book-spacing:nth-child(3) .book.wasClicked .page, .book-spacing:nth-child(3) .book.wasClicked .last-page, .book-spacing:nth-child(3) .book.wasClicked .back-cover{
		translate: 0px 200px;
	}
	.book-spacing:nth-child(5) .book.wasClicked .spine1, .book-spacing:nth-child(5) .book.wasClicked .spine, .book-spacing:nth-child(5) .book.wasClicked .cover, .book-spacing:nth-child(5) .book.wasClicked .coverInside, .book-spacing:nth-child(5) .book.wasClicked .pages, .book-spacing:nth-child(5) .book.wasClicked .coverPage, .book-spacing:nth-child(5) .book.wasClicked .page, .book-spacing:nth-child(5) .book.wasClicked .last-page, .book-spacing:nth-child(5) .book.wasClicked .back-cover, .book-spacing:nth-child(6) .book.wasClicked .spine1, .book-spacing:nth-child(6) .book.wasClicked .spine, .book-spacing:nth-child(6) .book.wasClicked .cover, .book-spacing:nth-child(6) .book.wasClicked .coverInside, .book-spacing:nth-child(6) .book.wasClicked .pages, .book-spacing:nth-child(6) .book.wasClicked .coverPage, .book-spacing:nth-child(6) .book.wasClicked .page, .book-spacing:nth-child(6) .book.wasClicked .last-page, .book-spacing:nth-child(6) .book.wasClicked .back-cover, .book-spacing:nth-child(7) .book.wasClicked .spine1, .book-spacing:nth-child(7) .book.wasClicked .spine, .book-spacing:nth-child(7) .book.wasClicked .cover, .book-spacing:nth-child(7) .book.wasClicked .coverInside, .book-spacing:nth-child(7) .book.wasClicked .pages, .book-spacing:nth-child(7) .book.wasClicked .coverPage, .book-spacing:nth-child(7) .book.wasClicked .page, .book-spacing:nth-child(7) .book.wasClicked .last-page, .book-spacing:nth-child(7) .book.wasClicked .back-cover{
		translate: 0px -300px;
	}



	.cover{
		z-index: 6;
		transition: all 2s;
		transform-origin: center left;
		color: white;
		text-align: center;
		margin-right: 40px;
		background: url(../images/book1-v2.png) no-repeat;
		background-size: cover;
	}

	.spine{
		transition: all 2s;
		transform-origin: center right;
		width: 60px;
		height: 200px;
		background: url(../images/spine1-v2.png) no-repeat;
		background-size: cover;
		z-index: 1;
		border-radius: 5px;
		margin-left: -56px;
		/* box-shadow:
    	0 0 5px 5px #ffca2d94, 
    	0 0 20px 20px rgba(255, 221, 0, 0.427),
    	0 0 50px 50px rgba(255, 179, 0, 0.437); */
		/* animation: glow 1.5s ease-in-out infinite alternate; */
	}

	@keyframes glow {
		from{
			box-shadow:
    		0 0 2px 2px #ffa42d6e,  /* inner  */
    		0 0 5px 5px #ff8c0047, /* middle  */
    		0 0 10px 8px #ff6a0050; /* outer */
		}
		to{
			box-shadow:
    		0 0 5px 5px #ffca2d6e,  /* inner  */
    		0 0 10px 10px #ffdd0047, /* middle  */
    		0 0 20px 20px #ffb30050;; /* outer  */
		}
	}

	.spine.shelfMode{
		transform: perspective(1000px) rotateX(-1deg) rotateY(-90deg);
		transition-duration: 1.3s;
		z-index: 1;
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
		background-color: var(--book-color-kids);
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
		background-color: var(--book-color-kids);
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

	.picture{
		height: 50px;
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

	@media only screen and (max-width: 1200px){
        .first-category{
            width: 100%;
		    height: 200%;
			top: 2420px;
			left: 0;
        }

		.sign{
			translate: 270px -550px;
		}

		article{
			margin-top: 630px;
		}

		main{
			translate: 50px 0;
		}

		.book-spacing:first-child{
		translate: -430px 205px;
		}

	.book-spacing:nth-child(2){
		translate: -580px 205px;
	}
	.book-spacing:nth-child(3){
		translate: -315px -140px;
	}
	.book-spacing:nth-child(4){
		translate: -80px -60px;
	}
	.book-spacing:nth-child(5){
		translate: -100px 270px;
	}
	.book-spacing:nth-child(6){
		translate: -180px 270px;
	}

    }

	@media only screen and (max-width: 1050px){

		.sign{
			translate: 245px -550px;
		}

		.first-category{
			top: 2270px;
		}

		article{
			margin-top: 560px;
		}

		main{
			translate: 70px 0px;
			scale: 1.1;
		}

		.book-spacing:first-child{
		translate: -380px 245px;
		}

	.book-spacing:nth-child(2){
		translate: -470px 245px;
	}
	.book-spacing:nth-child(3){
		translate: -225px -50px;
	}
	.book-spacing:nth-child(4){
		translate: -80px -15px;
	}
	.book-spacing:nth-child(5){
		translate: -70px 270px;
	}
	.book-spacing:nth-child(6){
		translate: -115px 270px;
	}

		/* .string{
			height: 170px;
		} */
		
	}

	@media only screen and (max-width: 1000px){

		.first-category{
			top: 1215px;
			width: 920px;
		    height: 1000px;
		}

		article{
			margin-top: 75px;
		}

		main{
			translate: -10px 0px;
			scale: none;
		}
		.cover, .back-cover, .coverInside{
			height: 130px;
			width: 100px;
		}

		.pages, .page, .coverPage, .last-page{
			height: 120px;
			width: 90px;
		}

		.spine{
			height: 130px;
			width: 35px;
			margin-left: -31px;
		}

		.book.wasClicked .cover, .book.wasClicked .coverPage, .book.wasClicked .coverInside, .book.wasClicked .pages, .book.wasClicked .page{
			transform: perspective(1000px) rotateX(10deg) rotateY(-180deg) scale(2.7);
		}

		.book.wasClicked .back-cover, .book.wasClicked .last-page{
			transform: perspective(1000px) rotateX(10deg) scale(2.7);
		}

		.picture{
			height: 35px;
			margin: 0.7em;
		}
	}

	@media only screen and (max-height: 425px){
        .first-category{
			top: 1250px;
            width: 1000px;
            height: 1140px;
			left: -20px;
        }

		article{
			margin-top: 125px;
		}

		.book-spacing:first-child{
			translate: -247px 350px;
		}

		.book-spacing:nth-child(2){
			translate: -245px 350px;
		}
		.book-spacing:nth-child(3){
			translate: -30px 155px;
		}
		.book-spacing:nth-child(4){
			translate: -55px 85px;
		}
		.book-spacing:nth-child(5){
			translate: 10px 270px;
		}
		.book-spacing:nth-child(6){
			translate: 42px 270px;
		}
    }

    @media only screen and (max-height: 390px){
        .first-category{
            height: 1050px;
			top: 1150px;
        }

		article{
			margin-top: 75px;
		}

		.book-spacing:first-child{
			translate: -225px 370px;
		}

		.book-spacing:nth-child(2){
			translate: -210px 370px;
		}
		.book-spacing:nth-child(3){
			translate: 5px 193px;
		}
		.book-spacing:nth-child(4){
			translate: -50px 105px;
		}
		.book-spacing:nth-child(5){
			translate: 25px 270px;
		}
		.book-spacing:nth-child(6){
			translate: 68px 270px;
		}
    }
    @media only screen and (max-height: 375px){
        .first-category{
            height: 1010px;
			top: 1110px;
        }

		article{
			margin-top: 55px;
		}

		.book-spacing:first-child{
			translate: -220px 380px;
		}

		.book-spacing:nth-child(2){
			translate: -200px 380px;
		}
		.book-spacing:nth-child(3){
			translate: 15px 207px;
		}
		.book-spacing:nth-child(4){
			translate: -50px 110px;
		}
		.book-spacing:nth-child(5){
			translate: 25px 270px;
		}
		.book-spacing:nth-child(6){
			translate: 76px 270px;
		}
    }
    @media only screen and (max-height: 345px){
        .first-category{
            height: 940px;
			top: 1020px;
        }

		article{
			margin-top: 18px;
		}

		.book-spacing:first-child{
			translate: -205px 395px;
		}

		.book-spacing:nth-child(2){
			translate: -175px 395px;
		}
		.book-spacing:nth-child(3){
			translate: 37px 233px;
		}
		.book-spacing:nth-child(4){
			translate: -50px 125px;
		}
		.book-spacing:nth-child(5){
			translate: 37px 275px;
		}
		.book-spacing:nth-child(6){
			translate: 93px 275px;
		}

    }
    @media only screen and (max-height: 325px){
        .first-category{
            height: 890px;
			top: 960px;
        }

		main{
			scale: 0.9;
			translate: -40px 0px;
		}

		article{
			margin-top: -2px;
		}

		.book-spacing:first-child{
			translate: -210px 380px;
		}

		.book-spacing:nth-child(2){
			translate: -188px 380px;
		}
		.book-spacing:nth-child(3){
			translate: 23px 213px;
		}
		.book-spacing:nth-child(4){
			translate: -50px 115px;
		}
		.book-spacing:nth-child(5){
			translate: 33px 275px;
		}
		.book-spacing:nth-child(6){
			translate: 84px 275px;
		}
    }

</style>