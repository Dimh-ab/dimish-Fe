<script>
import axios from 'axios';
// import { getContext } from 'svelte';
// import { projectsStore } from './Projects.svelte'

// let addProject = getContext('addProjectContext');
// console.log(addProject);
let showForm = null;
let validationMessage = "";
let validationCSS = "";


const categories = ['Random category', 'Another category', 'Third category', 'Fourth category', 'Fifth category'];


const newProject = {
    title: "",
    encode: "",
    description: "",
    category: "",
    image_url: "",
}

const submitProject = () => {
    axios.post("http://localhost:4000/api/projects", newProject, {
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
                afterSubmit();
                // const buffer = new ArrayBuffer(response.data.picture, 'base64');
                // console.log(buffer)
                // console.log(response.data);
                // const newProjectArray = [...addProject, newProject];
                // // addProject(newProject);
                // console.log('new array', newProjectArray)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

const afterSubmit = () => {
    newProject.title = "";
    newProject.description = "";
    newProject.category = "";
    newProject.image_url = "";
    showForm = !showForm
}

const uploadImage = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
        newProject.image_url = e.target.result
        console.log('uploaded image --->', newProject.image_url);
    }
}

</script>


<button on:click={() => (showForm = !showForm)} class="new-project">New Project</button>

{#if showForm}
<form on:submit|preventDefault={submitProject} enctype="multipart/form-data">
    <div>
        <label for="title">
            Title
            <input type="text" name="title" placeholder="title" bind:value={newProject.title} required>
        </label>
    
        <label for="picture">
            Picture
            <input type="file" accept=".jpg, .jpeg, .png" name="picture" placeholder="picture" bind:value={newProject.image_url} on:change={(e) => uploadImage(e)} required>
        </label>
        <!-- <img src={newProject.image_url} alt="" height="100px"> -->
    
        <label for="description">
            description
            <input type="text" name="description" placeholder="description" bind:value={newProject.description} required>
        </label>
    
        <label for="category">
            choose a category
        <select bind:value={newProject.category} required>
        {#each categories as category}
            <option value={category}>{category}</option>
        {/each}
        </select>
        </label>

        <button type="submit" value="submit" class="submit">submit</button>
    </div>


</form>
{/if}

<style>
    .new-project, .submit{
        background: #fafafa;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        cursor: pointer;
    }
    
    form{
        position: fixed;
        background-color: #fafafa;
    }

    div{
        border: 1px solid black;
        border-radius: 1%;
    }
    label{
        width: 300px;
        display: flex;
        flex-direction: column;
        margin: 10px;
        text-transform: capitalize;
    }
</style>