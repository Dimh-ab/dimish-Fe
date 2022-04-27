<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./components/Login.svelte";
	import Projects from "./components/Projects.svelte";
	import Home from "./pages/Home.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import ProtectedRoute from "./ProtectedRoute.svelte";
	import Library from "./pages/Library.svelte";

	export let url = "";
</script>

<Router {url}>
	<nav>
		<Link to="/">Home</Link>
		<Link to="login">Login</Link>
		<Link to="library">Library</Link>
		<Link to="dashboard">Dashboard</Link>
	</nav>
	<Route path="/">
		<Home />
	</Route>

	<Route path="login" >
		<Login />
	</Route>

	<Route path="library" >
		<Library />
	</Route>

	<ProtectedRoute path="dashboard" component={Dashboard} />
</Router>

<style>
</style>
