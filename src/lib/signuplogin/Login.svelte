<script lang="ts">
	import { backend_url } from '$lib/const/variable';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const switch_page = () => {
		dispatch('switch', 'signup');
	};

	const switch_dashboard = () => {
		dispatch('switch', 'dashboard');
	};

	const submit = async (e: any) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const response = await fetch(`${backend_url}/api/user/${email}?password=${password}`, {
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
			alert('Invalid email or password');
			return;
		}

		localStorage.setItem('email', email);
		localStorage.setItem('hashed_password', response.password);
		switch_dashboard();
	};
</script>

<form action="" method="post" on:submit={submit}>
	<h2>Access to Store</h2>
	<label for="email">Email</label>
	<input type="email" name="email" id="email" required placeholder="Insert your email" />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" required placeholder="Your password" />
	<button type="submit" id="login">Login</button>
	<hr />
	<p id="bottom">New to our store? <button id="switch" on:click={switch_page}>Sign up</button></p>
</form>

<br />
<br />
<br />
<br />

<style lang="scss">
	form {
		padding-top: 40px;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 360px;
		margin: 0 auto;
		h2 {
			font-size: 3rem;
			text-align: center;
			margin-bottom: 30px;
		}

		label {
			margin-top: 20px;
			margin-bottom: 10px;
		}

		input {
			padding: 10px;
			margin-bottom: 20px;
			border: 1px solid #000;
			border-radius: 5px;
			background: transparent;
			transition: background 0.5s cubic-bezier(0, 0, 0, 1);
			&:focus {
				background: rgba(255, 255, 255, 0.5);
			}
		}

		#login {
			padding: 10px 20px;
			border: 1px solid #000;
			border-radius: 500px;
			background: transparent;
			transition: background 0.5s cubic-bezier(0, 0, 0, 1);
			width: auto;
			margin: 30px auto;
			&:hover {
				background: rgb(0, 0, 0);
				color: white;
			}
		}

		hr {
			border-top: 1px solid rgb(94, 94, 94);
			margin-bottom: 30px;
		}

		#switch {
			background: transparent;
			border-bottom: 1px solid black;
		}

		#bottom {
			text-align: center;
		}
	}
</style>
