<script>
import axios from 'axios';
import { amountOfProjects } from '../stores.js';
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
                let addNewProject = response.data
                amountOfProjects.update(projects => [...projects, addNewProject]);
                afterSubmit();
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
}

const uploadImage = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    let allowedFiles = ["image/png", "image/jpeg", "image/jpg"];
    if(allowedFiles.includes(image.type)){
        reader.onload = (e) => {
            newProject.image_url = e.target.result;
            validationMessage = "";
        }
    } else {
        validationMessage = "Please upload a valid image file";
        validationCSS = "error";
        e.target.value = "";
    }
}


</script>

<form on:submit|preventDefault={(submitProject)} enctype="multipart/form-data">
        <label for="title">
            Title
            <input type="text" accept=".jpg, .jpeg, .png" name="title" placeholder="title" bind:value={newProject.title} required>
        </label>
    
        <label for="picture">
            Picture
            <input type="file" name="picture" placeholder="picture" bind:value={newProject.image_url} on:change={(e) => uploadImage(e)} required>
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
        <p class={validationCSS}>{validationMessage}</p>
        <button type="submit" value="submit" class="submit">submit</button>
</form>

<style>
    .error{
        color: red;
    }
    
    .submit{
        background: #fafafa;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        cursor: pointer;
    }

    label{
        display: flex;
        flex-direction: column;
        margin: 10px;
        text-transform: capitalize;
    }
</style>