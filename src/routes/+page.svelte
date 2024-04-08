<script lang="ts">
	import { user_valid, backend_url, email, user_hash_password } from '$lib/const/variable';
	import Box from '$lib/signuplogin/Box.svelte';
	import Login from '$lib/signuplogin/Login.svelte';
	import Signup from '$lib/signuplogin/Signup.svelte';
	import Dashboard from '$lib/dashboard/Dashboard.svelte';
	import { onMount } from 'svelte';

	let current_component = Login;

	const switch_page = (data: CustomEvent) => {
		switch (data.detail) {
			case 'login':
				current_component = Login;
				break;
			case 'signup':
				current_component = Signup;
				break;
			case 'dashboard':
				$user_valid = true;
				break;
			default:
				current_component = Login;
				break;
		}
	};

	onMount(async () => {
		// get user name and hashed password from local storage. Yes this is very insecure.
		const user = localStorage.getItem('email');
		const password = localStorage.getItem('hashed_password');

		if (user === null || password === null) {
			return;
		}

		// make a get request to the backend to check if the user is valid
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
			localStorage.removeItem('email');
			localStorage.removeItem('hashed_password');
			return;
		}

		$user_valid = true;
		$email = user;
		$user_hash_password = password;
	});
</script>

<div id="root">
	{#if $user_valid}
		<Dashboard />
	{:else}
		<Box>
			<svelte:component
				this={current_component}
				on:switch={(data) => {
					switch_page(data);
				}}
			/>
		</Box>
	{/if}
</div>

<style>
	#root {
		position: relative;
		height: 100%;
		width: 100%;
		background: #f3efe7;
	}
</style>
