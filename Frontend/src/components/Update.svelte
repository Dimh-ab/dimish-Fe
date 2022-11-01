<script>
    import {amountOfProjects} from '../stores.js'

	// updates the projects array with updated book
    export const updateBook = (updated) => {
		const array = [...$amountOfProjects]
		// console.log(array)
		
		let hasUpdated = array.map((p) => p.id === updated.id ? updated : p) 
			if(hasUpdated){
				$amountOfProjects = hasUpdated
			}
	}
</script>