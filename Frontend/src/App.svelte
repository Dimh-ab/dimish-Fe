<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./components/Login.svelte";
	// import Projects from "./components/Projects.svelte";
	import Home from "./pages/Home.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import ProtectedRoute from "./ProtectedRoute.svelte";
	import Library from "./pages/Library.svelte";
	import Background from "./components/Background.svelte";

	export let url = "";

<<<<<<< HEAD
	
</script>

<body>
=======
<body >
	<!-- <Background /> -->
	<!-- <div class="bg-loop"> -->

>>>>>>> 759f8a3778040e117c85f4cb0b8c33414b32e6e1
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
<<<<<<< HEAD
=======

	/* nav{
		position:absolute;
	} */


>>>>>>> 759f8a3778040e117c85f4cb0b8c33414b32e6e1
</style>
