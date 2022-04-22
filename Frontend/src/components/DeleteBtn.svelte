<script>
import axios from 'axios';
import { amountOfProjects } from '../stores';
export let id

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
               $amountOfProjects = $amountOfProjects.filter(function(value, index, arr){
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

</script>

<button on:click={deleteProject(id)}>delete</button>

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