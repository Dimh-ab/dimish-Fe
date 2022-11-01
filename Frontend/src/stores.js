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

export const bookId = writable(1)
export const projectId = writable(0)

export const allKidsBooksRead = writable(false)
export const adolescenceBooksRead = writable(false)
export const primaryBooksRead = writable(false)
export const informativeBooksRead = writable(false)
export const mobilityBooksRead = writable(false)

export const hasTalkedToSven = writable(0)

export const tree = writable('../images/dead-tree.png')
export const spell = writable(false)
export const light = writable(false)
export const gotWand = writable(false)
export const goHome = writable(false)
export const story = writable('')
export const nextChat = writable(0)