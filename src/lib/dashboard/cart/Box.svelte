<script lang="ts">
	import { backend_url, email, target, user_hash_password } from '$lib/const/variable';

	export let cart_id: string;
	export let id: string;
	export let name: string;
	export let description: string;
	export let price: number;
	export let quantity: number;

	const authorization = $email + ' ' + $user_hash_password;
	let appear = true;

	async function buy() {
		await fetch(`${backend_url}/api/order`, {
			method: 'POST',
			headers: {
				Authorization: authorization,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				product_id: id,
				quantity
			})
		})
			.then((res) => {
				if (res.status === 200) {
					appear = false;
				}
			})
			.catch((err) => console.error(err));
	}

	async function update() {
		const result = await fetch(`${backend_url}/api/cart/${id}`, {
			method: 'PUT',
			headers: {
				Authorization: authorization,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cart_id,
				quantity
			})
		}).then((res) => res.json());

		if (result === null) {
			return;
		}
		quantity = result.data.quantity;
	}

	async function remove() {
		await fetch(`${backend_url}/api/cart/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: authorization,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cart_id
			})
		}).then((res) => res.json());

		appear = false;
	}

	$: if (quantity < 1) {
		quantity = 1;
	}

	console.log(cart_id);
</script>

{#if appear}
	<div class="box" id="box-{id}">
		<div
			id="image"
			style="background-image: url('https://source.unsplash.com/random/300×300?${name}')"
		>
			<h1>{name}</h1>
			<p>{description}</p>
		</div>

		<div id="content">
			<p>${price.toFixed(2)}</p>
			{#if $target === 'user'}
				<p>final: ${(price * quantity).toFixed(2)}</p>
				<input id="quantity" type="number" bind:value={quantity} on:change={update} />
				<button on:click={buy}>Pay</button>
				<button on:click={remove}>Delete</button>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.box {
		position: relative;
		height: 250px;
		width: 300px;
		border-radius: 6px;
		border: 1px solid black;
		#image {
			position: relative;
			height: 200px;
			width: 100%;
			border-radius: 6px;
			border-bottom: 1px solid black;
			overflow: hidden;
			background: no-repeat center center;
			background-size: cover;
			background-color: rgba(54, 53, 51, 0.479);
			background-blend-mode: multiply;
			transition: 0.5s;

			h1 {
				// blend text with background differently
				position: absolute;
				bottom: 0;
				left: 0;
				margin: 0 0 10px 10px;
				font-size: 1.5rem;
				color: #f3efe7;
				font-weight: 900;
			}

			p {
				display: none;
				opacity: 0;
				font-size: 1rem;
				color: #f3efe7;
				font-weight: 900;
				transition: 0.5s;
			}

			&:hover {
				background-color: rgba(54, 53, 51, 0.8);
				p {
					display: block;
					opacity: 1;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}

				h1 {
					display: none;
				}
			}
		}

		#content {
			position: relative;
			height: 50px;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			overflow: hidden;

			* {
				width: 20%;
				height: 60%;
			}

			p {
				position: relative;
				overflow: hidden;
				display: flex;
				align-items: center;
			}

			button {
				background: transparent;
				&:hover {
					text-decoration: underline;
				}
			}

			#quantity {
				text-align: center;
				background-color: transparent;
				border: 1px solid black;
				border-radius: 6px;
				// modify toolbar of number input
				&::-webkit-inner-spin-button,
				&::-webkit-outer-spin-button {
					-webkit-appearance: none;
				}
			}
		}
	}
</style>
