<script lang="ts">
	export let name: string;
	export let description: string;
	export let price: number;
	export let status: string;
</script>

<div class="box">
	<div
		id="image"
		style="background-image: url('https://source.unsplash.com/random/300×300?${name}')"
	>
		<h1>{name}</h1>
		<p>{description}</p>
	</div>

	<div id="content">
		<p>${price.toFixed(2)}</p>
		<p>{status}</p>
	</div>
</div>

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
				height: 60%;
			}

			p {
				position: relative;
				overflow: hidden;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
