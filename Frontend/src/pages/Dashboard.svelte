<script>
import {Link} from 'svelte-routing';
import axios from 'axios';
import {token} from '../stores.js';
import { onMount } from 'svelte';
import {navigate} from "svelte-routing";

//Checks if existing token is still valid
onMount(async () => {
	await axios.get('http://localhost:4000/api/auth/verify', {
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .then(response => {
        if(response.status === 200){
        console.log('Token is valid');
    }
    })
    .catch(error => {
        console.log(error);
        if(error.response.status === 404){
            console.log('Token is invalid');
            localStorage.removeItem('token');
            token.set(null);
            navigate('/login', {replace: true});
        } else{
            console.log('unauthorized')
            localStorage.removeItem('token');
            token.set(null);
            navigate('/login', {replace: true});
        }
    });
});

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