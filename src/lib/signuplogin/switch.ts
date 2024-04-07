import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export const switch_page = () => {
	dispatch('switch');
};
