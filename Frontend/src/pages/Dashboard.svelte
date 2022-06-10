<script>
import ProjectsAD from '../components/admin/ProjectsAD.svelte';
import {Link} from 'svelte-routing';
import axios from 'axios';
import {token} from '../stores.js';
import { onMount } from 'svelte';
import {navigate} from "svelte-routing";
// import OpenFormBtn from '../components/admin/OpenFormBtn.svelte';
import OpenFormBtn from '../components/admin/OpenFormBtn.svelte';

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

<div class="dash">
    <div>
        <button>
            <Link to="/login" on:click={handleLogout}>Logout</Link>
        </button>
        <OpenFormBtn />
    </div>
    <main>
        <ProjectsAD />
    </main>
</div>

<style>
    main{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    button{
        cursor: pointer;
    }
    div{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        margin: 1rem 6rem;
    }
</style>