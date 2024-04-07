<script lang="ts">
	import { backend_url, email, user_hash_password } from '$lib/const/variable';
	import { onMount } from 'svelte';
	import Box from './Box.svelte';

	const authorization = $email + ' ' + $user_hash_password;

	let result: any = null;
	let output: any = result;
	let value: string = '';

	// fetch to /api/product with header 'Authorization' and value $email + ' ' + $hashed_password
	onMount(async () => {
		try {
			result = await fetch(`${backend_url}/api/order/all`, {
				method: 'GET',
				headers: {
					Authorization: authorization,
					'Content-Type': 'application/json'
				}
			}).then((res) => res.json());
		} catch (error) {
			console.error(error);
		}
	});

	$: if (value === '') {
		output = result;
	} else {
		output = result.filter((product: any) =>
			product.product.name.toLowerCase().includes(value.toLowerCase())
		);
	}
</script>

<div id="product">
	<div id="header">
		<input type="text" placeholder="Search for products" bind:value />
	</div>
	<div id="content">
		{#if output !== null}
			{#each output as product}
				<Box
					name={product.product.name}
					description={product.product.description}
					price={product.product.price * product.quantity}
					status={product.status}
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
