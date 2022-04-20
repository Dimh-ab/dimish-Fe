<script>
import axios from 'axios';
const newProject = {
    title: "",
    encode: "",
    description: "",
    category: ""
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
                console.log('success');
            }
        })
        .catch(err => {
            console.log(err)
        })
}

</script>

<form on:submit|preventDefault={submitProject}>
    <h3>Create new project</h3>

    <label for="title">Title
        <input type="text" name="title" placeholder="title" bind:value={newProject.title}>
    </label>

    <label for="picture">Picture
        <input type="file" name="picture" placeholder="picture" bind:value={newProject.encode}>
    </label>

    <label for="description">
        description
        <input type="text" name="description" placeholder="description" bind:value={newProject.description}>
    </label>

    <label for="category">category
        <input type="text" name="category" placeholder="category" bind:value={newProject.category}>
    </label>

    <button type="submit" value="submit">submit</button>

</form>

<style>
    
</style>