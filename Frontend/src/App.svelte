<script>
	import { Router, Route, Link } from "svelte-routing";
	import Login from "./components/Login.svelte";
	// import Projects from "./components/Projects.svelte";
	import Home from "./pages/Home.svelte";
	import Dashboard from "./pages/Dashboard.svelte";
	import ProtectedRoute from "./ProtectedRoute.svelte";
	import Library from "./pages/Library.svelte";
	//import GoogleAnalytics from "./components/GoogleAnalytics.svelte";
	import Cookies from "./components/Cookies.svelte";
	import Accessibility from "./components/Accessibility.svelte";
	import Help from "./components/Help.svelte";

	export let url = "";
</script>

<body>

	<!-- <GoogleAnalytics /> -->
	<Cookies />

	<Router {url}>
		<nav>
			<Link to="/" >Home</Link>
			<Link to="library">Library</Link>
			<Link to="dashboard">Dashboard</Link>
		</nav>

		<a href="https://www.di-mh.com/" >dimh</a>
		<Accessibility />
		<a href="https://www.di-mh.com/">dimh</a>
		<Help />

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
</body>

<style>
	a {
		font-size: 3rem;
		color: rgb(240, 167, 9);
		text-decoration: none;
		position: absolute;
		/* margin-top: 1em; */
		z-index: 1;
	}
</style>
