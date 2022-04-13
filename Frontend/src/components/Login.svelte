<script>
import axios from "axios";
let username;
let password;

const handleSubmit = (e) => {
  axios
    .post("http://localhost:4000/api/auth/login", {
      username: username,
      password: password
    })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        console.log('success');
      } else if (response.status === 204) {
        console.log("Invalid username or password");
      } else if (response.status === 400) {
        console.log("Something went wrong");
      }
    })
    .catch(error => {
      console.log(error);
    });
};

</script>


<main>
<form on:submit|preventDefault={handleSubmit}>
<input type="text" name="username" bind:value={username} placeholder="username">
<input type="password" name="password" bind:value={password} placeholder="password">
<button type="submit">LOGIN</button>
</form>
</main>


<style>

</style>