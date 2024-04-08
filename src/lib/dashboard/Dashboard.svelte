<script lang="ts">
	import { backend_url, popup, target, user_valid } from '$lib/const/variable';
	import { onMount } from 'svelte';
	import Product from './product/Product.svelte';
	import Cart from './cart/Cart.svelte';
	import Order from './order/Order.svelte';
	import Popup from './Popup.svelte';

	const user_features = ['Product', 'Cart', 'Order'];
	const shopping_cart_manager_features = ['People']; // in people there has cart
	const product_manager_features = ['Product'];
	const admin_features = ['People', 'Product', 'Order']; // in people there has cart
	let current_feature = 'Product';

	onMount(async () => {
		const user = localStorage.getItem('email');
		const password = localStorage.getItem('hashed_password');

		if (user === null || password === null) {
			$user_valid = false;
			return;
		}
		const response = await fetch(`${backend_url}/api/user/${user}?hshpassword=${password}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
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

		if (response === null) {
			$user_valid = false;
			return;
		}

		$target = response.target;
	});

	const logout = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('hashed_password');
		alert('Goodbye!');
		$user_valid = false;
	};

	$: console.log(current_feature);
</script>

<div id="dashboard">
	<div id="left">
		{#if $user_valid}
			{#if $target === 'user'}
				{#each user_features as feature}
					<button
						on:click={() => {
							current_feature = feature;
						}}>{feature}</button
					>
				{/each}
			{:else if $target === 'shoppingcartmanager'}
				{#each shopping_cart_manager_features as feature}
					<button
						on:click={() => {
							current_feature = feature;
						}}>{feature}</button
					>
				{/each}
			{:else if $target === 'productmanager'}
				{#each product_manager_features as feature}
					<button
						on:click={() => {
							current_feature = feature;
						}}>{feature}</button
					>
				{/each}
			{:else if $target === 'admin'}
				{#each admin_features as feature}
					<button
						on:click={() => {
							current_feature = feature;
						}}>{feature}</button
					>
				{/each}
			{/if}
		{/if}
		<button id="logout" on:click={logout}>Log out</button>
	</div>
	<div id="right">
		{#if $user_valid}
			{#if current_feature === 'Product'}
				<Product />
			{:else if current_feature === 'Cart'}
				<Cart />
			{:else if current_feature === 'Order'}
				<Order />
			{:else if current_feature === 'People'}
				<!-- Will do in the future -->
				<!-- <People /> -->
			{/if}
		{/if}

		{#if $popup}
			<Popup />
		{/if}
	</div>
</div>

<style lang="scss">
	#dashboard {
		position: relative;
		height: 100%;
		width: 100%;
		padding: 20px;
		display: flex;
		#left,
		#right {
			border-radius: 6px;
			border: 1px solid black;
		}
		#left {
			width: 50px;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;
			padding: 10px 0;
			* {
				writing-mode: vertical-rl;
				transform: rotate(180deg);
				cursor: pointer;
				background-color: transparent;
				&:hover {
					text-decoration: underline;
				}
			}

			#logout {
				margin-top: auto;
			}
		}

		#right {
			position: relative;
			width: calc(100% - 50px);
			height: 100%;
			margin-left: 10px;
		}
	}
</style>
