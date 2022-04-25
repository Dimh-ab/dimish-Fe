<script>
import axios from 'axios';
import { amountOfProjects } from '../stores';
export let id
let confirm = false
let message = ''

    const deleteProject = (id) => {
        axios.delete(`http://localhost:4000/api/projects/${id}`, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log('status', response.status);
            if (response.status !== 200) {
                console.log('unauthorized');
            } else {
                console.log('deleted project');
               $amountOfProjects = $amountOfProjects.filter(function(value){
                   if(value.id !== id){
                      return value
                   }
               })
            }
        })
        .catch(err => {
            console.log(err)
        })
    };

    const confirmed = () => {
        confirm = true
        console.log(confirm)
        confirmDelete()
    }

    const confirmDelete = () => {
        message = "Are you sure you want to delete this project?"
        if(confirm === true){
            deleteProject(id)
        }
    }

</script>

<button on:click={confirmDelete}>delete</button>
<strong>{message}</strong>
{#if message !== ''}
<button on:click={confirmed}>yes</button>
<button on:click={() => (message = '')}>no</button>
{/if}

<style>
    button {
        background: red;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        float: right;
    }
</style>