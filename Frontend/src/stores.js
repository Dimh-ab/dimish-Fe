import { writable } from 'svelte/store';

export const token = writable(localStorage.getItem('token'));

//used to update projects array (used in all files that need to reach the projects array)
export const amountOfProjects = writable([]);

//used to get the index of the projects on admin side (Edit.svelte and ProjectsAD.svelte)
export const show = writable([]);

//used to see if editing is true or false (Edit.svelte and ProjectsAD.svelte)
export const isEditing = writable(false);

export const categories = writable(['Barn och Unga', 'Ungdomar', 'Stöd och Rörlighet', 'Primärvård', 'Informativt', 'Övrigt']);
// export const categories = writable(['Younglings', 'Adolescence balance', 'support and mobility', 'primary care', 'Informative']);

export const checkPoint = writable(0);