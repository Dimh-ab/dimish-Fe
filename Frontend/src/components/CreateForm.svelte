<script>
import axios from 'axios';
// import { getContext } from 'svelte';
// import { projectsStore } from './Projects.svelte'

// let addProject = getContext('addProjectContext');
// console.log(addProject);

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
                // const buffer = new ArrayBuffer(response.data.picture, 'base64');
                // console.log(buffer)
                console.log(response.data);
                // const newProjectArray = [...addProject, newProject];
                // // addProject(newProject);
                // console.log('new array', newProjectArray)
            }
        })
        .catch(err => {
            console.log(err)
        })
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

<form on:submit|preventDefault={submitProject} enctype="multipart/form-data">
    <h3>Create new project</h3>

    <label for="title">
        Title
        <input type="text" name="title" placeholder="title" bind:value={newProject.title}>
    </label>

    <label for="picture">
        Picture
        <input type="file" accept=".jpg, .jpeg, .png" name="picture" placeholder="picture" bind:value={newProject.image_url} on:change={(e) => uploadImage(e)}>
    </label>
    <img src={newProject.image_url} alt="" height="200px">

    <label for="description">
        description
        <input type="text" name="description" placeholder="description" bind:value={newProject.description}>
    </label>

    <label for="category">
        category
        <input type="text" name="category" placeholder="category" bind:value={newProject.category}>
    </label>

    <button type="submit" value="submit">submit</button>

</form>

<style>
    
</style>