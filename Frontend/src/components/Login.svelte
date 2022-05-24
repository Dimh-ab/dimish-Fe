<script>
import axios from "axios";
import {navigate} from "svelte-routing";
import { token } from '../stores.js';
let username;
let password;
let validation;
let validationCSS

$: if (username || password) {
    validation = null;
    validationCSS = "";
} 

const handleLogin = (e) => {
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
      } else {
        validation = "Invalid username or password";
        validationCSS = "validation";
      }
    })
    .catch(error => {
      console.log(error);
      if(error.response.status === 401){
        validation = "Invalid username or password"
      } else if (error.response.status === 400) {
        validation = "Invalid credentials";
        validationCSS = "validation";
      }
    });
};

</script>

<main>
<form on:submit|preventDefault={handleLogin}>
    <input class={validationCSS} type="text" name="username" bind:value={username} placeholder="username" required>
    <input class={validationCSS} type="password" name="password" bind:value={password} placeholder="password" required>
    <button type="submit">LOGIN</button>
  </form>
    {#if validation}
    <p class="color: red">{validation}</p>
    {/if}
</main>


<style>

main{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(50%);
  /* transform: translate(-50%); */
}

form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.validation {
  border: 1px solid red;
  color: red;
}
</style>