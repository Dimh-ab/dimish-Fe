<script>
import { writable } from 'svelte/store';
import Modal from 'svelte-simple-modal';
import CreateForm from './CreateForm.svelte';

const modal = writable(null);
const showModal = () => modal.set(CreateForm);
</script>

<Modal show={$modal}>
    <button on:click={showModal}>New Project</button>
</Modal>