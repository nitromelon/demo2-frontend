<script lang="ts">
	import { onMount } from 'svelte';

	const images = Array.from(
		{ length: 5 },
		(_, i) => `https://source.unsplash.com/random?food&${i}`
	);

	let index = 0;
	let interval: NodeJS.Timeout;
	let currentImage = [images[index], images[index + 1] ? images[index + 1] : images[0]];
	let enable_transtion: string;

	onMount(() => {
		const imgtest = document.getElementsByClassName(
			'imgtest'
		) as HTMLCollectionOf<HTMLImageElement>;
		interval = setInterval(() => {
			index = index === images.length - 1 ? 0 : index + 1;
			enable_transtion = '1s transform cubic-bezier(0, 0, 0, 1)';
			imgtest[0]!.style.transform = 'translateX(-50%)';
			imgtest[1]!.style.transform = 'translateX(-100%)';
			setTimeout(() => {
				enable_transtion = 'none';
				currentImage = [images[index], images[index + 1] ? images[index + 1] : images[0]];
				imgtest[0]!.style.transform = 'translateX(0)';
				imgtest[1]!.style.transform = 'translateX(0)';
			}, 1500);
		}, 2000);

		return () => clearInterval(interval);
	});
</script>

<div id="box" style="--enable_transtion:{enable_transtion}">
	<div id="content">
		<div id="child1">
			<h1 id="header">Online Healthy Foods Store</h1>
			<slot />
		</div>
		<div id="child2">
			{#each currentImage as image}
				<div class="imgtest">
					<img src={image} alt="food" />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	#box {
		position: relative;
		height: 100%;
		width: 100%;
		padding: 20px;
	}

	#content {
		position: relative;
		height: 100%;
		width: 100%;
		border-radius: 10px;
		border: 1px solid #000;
		display: grid;
		grid-template-columns: 60% 40%;
		overflow: hidden;
		#child1 {
			border-right: 1px solid #000;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 20px;
			overflow: hidden;
			overflow-y: auto;
			#header {
				font-size: 1.5rem;
				margin-bottom: 20px;
			}
		}
	}

	#child2 {
		display: flex;
		overflow: hidden;
		position: relative;
		.imgtest {
			position: relative;
			display: inline-block;
			min-width: 100%;
			height: 100%;
			transition: var(--enable_transtion);
			img {
				width: 100%;
				height: 100%;
				object-fit: cover ;
			}
		}
	}
</style>
