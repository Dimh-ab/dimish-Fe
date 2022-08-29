<script>
import axios from 'axios';
import { amountOfProjects } from '../../stores';
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

    const confirm = () => {
        if(window.confirm('are you sure you want to delete this project ?')){
            deleteProject(id)
        }
    }

</script>

    <button on:click={() => confirm()}>Delete</button>

<style>
    button {
        border: none;
        background: transparent;
        text-decoration: underline;
        padding: 0;
        font-size: 1.2em;
        cursor: pointer;
    }

    button:hover {
       color: red;
    }
</style>