<script>
import {Link} from 'svelte-routing';

const handleLogout = () => {
    localStorage.removeItem('token');
    token.set(localStorage.getItem('token'));
}
</script>


<main>
    <h1>Logged in as admin</h1>
    <button>
        <Link to="/" on:click={handleLogout}>Logout</Link>
    </button>
</main>