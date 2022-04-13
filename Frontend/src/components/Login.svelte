<script>
import axios from "axios";
import {navigate} from "svelte-routing";
import { token } from '../stores.js';
let username;
let password;

const handleSubmit = (e) => {
  axios.post("http://localhost:4000/api/auth/login", {
      username: username,
      password: password
    })
    .then(response => {
      console.log('status', response.status);

      if (response.status === 200) {
        console.log('success');
        localStorage.setItem('token', response.data.token);
        token.set(localStorage.getItem('token'));
        navigate('/dashboard', { replace: true });
      } 
      else if (response.status === 400) {
        console.log("Invalid username or password");
      } 
      else if (response.status === 401) {
        console.log("Invalid Credentials");
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