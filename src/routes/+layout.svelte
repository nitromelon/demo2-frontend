<script>
	import { onMount } from 'svelte';
	import '../app.scss';
	onMount(() => {
		window.addEventListener('unload', () => {
			alert('Goodbye!');
		});
	});
</script>

<slot />
