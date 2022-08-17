<script>
    import axios from 'axios'; 
    import { isEditing, amountOfProjects, show, categories } from '../../stores';
    export let id
    export let i

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
            if (response.status === 200) {
                $amountOfProjects = $amountOfProjects.map(p => p.id === id ? project : p)
                console.log(response.data);
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toEdit = (id, i) => {
        $show[i] = !$show[i]
        $isEditing = true
        getProjectById(id)
        console.log('editing', isEditing)
    }

    const saveProject = () => {
        submitEdit(id)
        $isEditing = false
    }

    const uploadImage = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    let allowedFiles = ["image/png", "image/jpeg", "image/jpg"];
    if(allowedFiles.includes(image.type)){
        reader.onload = (e) => {
            project.image_url = e.target.result;
        }
    } else {
        e.target.value = "";
    }
}

</script>

<button class="edit-btn" on:click={toEdit(id, i)}>Edit</button>
{#if $isEditing && $show[i]}
<form>
    <input class="inputs" type="text" bind:value={project.title}>
	<input class="inputs" type="file" bind:value={project.image_url} on:change={(e) => uploadImage(e)}>
    <img src={project.image_url} alt="" height="70px">
	<input class="inputs" type="text" bind:value={project.description}>
	<select class="inputs" bind:value={project.category}>
        {#each $categories as category}
        <option value={category}>{category}</option>
        {/each}
	</select>
<button class="save-btn" on:click={saveProject}>SAVE</button>
</form>
{/if}

<style>
    .save-btn{
        background-color: rgb(94, 166, 255);
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 90px;
        padding: 10px 15px;
        margin: 10px;
        cursor: pointer;
    }
    .edit-btn{
        font-size: 1.2em;
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
        margin-left: 7px;
        text-decoration: underline;
        z-index: 1000;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .inputs{
        width: 300px;
        height: 40px;
        margin: 10px;
        border: none;
        border-bottom: 1px solid black;
    }
</style>