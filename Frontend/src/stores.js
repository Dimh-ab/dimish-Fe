import { writable } from 'svelte/store';

export const token = writable(localStorage.getItem('token'));

export const amountOfProjects = writable([]);

export const isEditing = writable(false);