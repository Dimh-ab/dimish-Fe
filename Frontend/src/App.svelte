<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./components/Login.svelte";
	import Projects from "./components/Projects.svelte";
	import Home from "./pages/Home.svelte";

	export let url = "";
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link>
		<Link to="login">Login</Link>
		<Link to="projects">Projects</Link>
	</nav>
	<Route path="/">
		<Home />
	</Route>

	<Route path="login" >
		<Login />
	</Route>

	<Route path="projects" >
		<Projects />
	</Route>
</Router>

<style>
</style>
