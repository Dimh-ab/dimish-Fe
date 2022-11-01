<script>
	import { Router, Route, Link } from "svelte-routing";
	import {story} from './stores'
	import Login from "./components/Login.svelte";
	// import Projects from "./components/Projects.svelte";
	import Home from "./pages/Home.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import ProtectedRoute from "./ProtectedRoute.svelte";
	import Library from "./pages/Library.svelte";
	import Abilities from "./components/Abilities.svelte";
	import AllProjects from "./pages/AllProjects.svelte";
	//import GoogleAnalytics from "./components/GoogleAnalytics.svelte";
	import Cookies from "./components/Cookies.svelte";
	import Accessibility from "./components/Accessibility.svelte";
	import Help from "./components/Help.svelte";
	import Language from "./locale/i18n.svelte";
	import Sound from "./components/Sound.svelte";
	import Storyline from "./components/Storyline.svelte";
	import { _ } from "svelte-i18n"

	export let url = "";
</script>

<body>

	<!-- <GoogleAnalytics /> -->
	<Cookies />

	<Router {url}>
		<!-- <nav> -->
			<!-- <Link to="/" >Home</Link>
			<Link to="library">Library</Link>
			<Link to="dashboard">Dashboard</Link> -->
			<!-- <Link to="all-projects" class="link"> <h3>{$_("homepage.allProjects")}</h3> </Link> -->
		<!-- </nav> -->

		<a href="https://www.di-mh.com/" target="_blank" >dimh</a>

		<Accessibility />

		<Language />
		<Sound />

		<Help />

		<Abilities />

		{#if $story !== ''}
		<Storyline />
		{/if}

		<Route path="/">
			<Home />
		</Route>

		<Route path="login">
			<Login />
		</Route>

		<Route path="library">
			<Library />
		</Route>

		
		<!-- <Route path="all-projects">
			<AllProjects />
		</Route> -->

		<ProtectedRoute path="dashboard" component={Dashboard} />
	</Router>
</body>

<style>
	a {
		font-size: 3rem;
		font-weight: 600;
		color: rgb(240, 167, 9);
		text-decoration: none;
		position: fixed;
		/* margin-top: 1em; */
		z-index: 1;
		margin: 0 1rem;
	}

	/* nav > :global(a) {
		text-decoration: none;
	}

	:global(a) h3 {
		position: fixed;
		left: 1rem;
		bottom: 1.5rem;
		z-index: 1;
		color: #ffffff;
	} */

</style>
