<script>
    import axios from 'axios'; 
    import { isEditing, amountOfProjects } from '../stores';
    export let id

    const project = {
    title: "",
    description: "",
    category: "",
    image_url: "",
}

    const getProjectById = (id) => {
    axios.get(`http://localhost:4000/api/projects/${id}`, {
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .then(response => {
            console.log('status', response.status);
            if (response.status !== 200) {
                console.log('unauthorized');
            } else {
                console.log(response.data);
                project.title = response.data.title;
                project.description = response.data.description;
                project.category = response.data.category;
                project.image_url = response.data.image_url;
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const submitEdit = (id) => {
        axios.put(`http://localhost:4000/api/projects/${id}`, project, {
            headers: {
                'token': localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log('status', response.status);
            if (response.status !== 200) {
                console.log('unauthorized');
            } else {
                $amountOfProjects = $amountOfProjects.map(c => c.id === id ? project : c)
                console.log(response.data);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toEdit = () => {
        $isEditing = true
        getProjectById(id)
        console.log('editing', isEditing)
    }

    const saveProject = () => {
        submitEdit(id)
        $isEditing = false
    }

</script>

<button class="edit" on:click={toEdit}>🖌</button>
{#if $isEditing}
    <input type="text" bind:value={project.title}>
	<input type="file" bind:value={project.image_url}>
	<input type="text" bind:value={project.description}>
	<select bind:value={project.category}>
		<option>Web</option>
		<option>Mobile</option>
		<option>Desktop</option>
	</select>
<button on:click={saveProject}>SAVE</button>
{/if}

<style>
    .edit{
        font-size: 2em;
        border: none;
        background: transparent;
    }
</style>