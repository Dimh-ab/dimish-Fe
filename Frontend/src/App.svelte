<script>
import { Router, Route, Link } from "svelte-routing";
import Login from "./components/Login.svelte";
import Home from "./pages/Home.svelte";

export let url="";
</script>

<Router url="{url}">
<nav>
	<Link to="/">Home</Link>
	<Link to="login">Login</Link>
</nav>
  <Route path="/">
	<Home />
  </Route>

  <Route path="login" component={Login}>
	<Login />
  </Route>

</Router>

<style>
</style>