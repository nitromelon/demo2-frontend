<script lang="ts">
	import { backend_url, email, user_hash_password } from '$lib/const/variable';
	import { onMount } from 'svelte';
	import Box from './Box.svelte';

	let result: any = null;
    let output: any = result;
	let value: string = '';
	// fetch to /api/product with header 'Authorization' and value $email + ' ' + $hashed_password
	onMount(async () => {
		result = await fetch(`${backend_url}/api/product`, {
			method: 'POST',
			headers: {
				Authorization: $email + ' ' + $user_hash_password
			}
		})
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				}
				return null;
			})
			.catch((err) => {
				console.error(err);
				return null;
			});
	});

	$: if (value === '') {
		output = result;
	} else {
		output = result.filter((product: any) =>
			product.name.toLowerCase().includes(value.toLowerCase())
		);
	}
</script>

<div id="product">
	<div id="header">
		<input type="text" placeholder="Search for products" bind:value />
	</div>
	<div id="content">
		<!-- <Box id="1" name="Product 1" description="Description 1" price={100} /> -->
		{#if output !== null}
			{#each output as product}
				<Box
					id={product.id}
					name={product.name}
					description={product.description}
					price={product.price}
				/>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	#product {
		position: relative;
		height: 100%;
		width: 100%;
		padding: 10px;

		#header {
			border-radius: 6px;
			border: 1px solid black;
			padding: 10px;
			input {
				background: transparent;
                width: 100%;
			}
		}

		#content {
			position: relative;
			height: calc(100% - 50px);
			margin-top: 10px;
			width: 100%;
			overflow: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
			gap: 10px;
		}
	}
</style>
