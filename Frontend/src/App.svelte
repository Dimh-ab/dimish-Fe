<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./components/Login.svelte";
	// import Projects from "./components/Projects.svelte";
	import Home from "./pages/Home.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import ProtectedRoute from "./ProtectedRoute.svelte";
	import Library from "./pages/Library.svelte";
	import Background from "./components/Background.svelte";
	import GoogleAnalytics from "./components/GoogleAnalytics.svelte";
	import Cookies from "./components/Cookies.svelte";

	export let url = "";
</script>

<body>
	<!-- <Background /> -->
	<!-- <div class="bg-loop"> -->

	<!-- <GoogleAnalytics /> -->
	<Cookies />

	<Router {url}>
		<nav>
			<Link to="/">Home</Link>
			<!-- <Link to="login">Login</Link> -->
			<Link to="library">Library</Link>
			<Link to="dashboard">Dashboard</Link>
		</nav>

		<a href="https://www.di-mh.com/">dimh</a>

		<Route path="/">
			<Home />
		</Route>

		<Route path="login">
			<Login />
		</Route>

		<Route path="library">
			<Library />
		</Route>

		<ProtectedRoute path="dashboard" component={Dashboard} />
	</Router>
	<!-- </div> -->
</body>

<style>
	a {
		font-size: 2rem;
		color: rgb(240, 167, 9);
		text-decoration: none;
		position: absolute;
		margin-top: 1em;
		z-index: 5;
	}

	/* nav{
		position:absolute;
	} */
</style>
