<script>
    import { Route, Link } from 'svelte-routing';
    import Login from './components/Login.svelte';
    import { token } from './stores.js';

    export let path;
    export let component;

    $: isAuthenticated = $token;
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />
{:else}
    <Route path={path} component={Login} />
{/if}