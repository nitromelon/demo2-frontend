<script lang="ts">
	import { popup, popup_content } from '$lib/const/variable';
</script>

{#if $popup}
	<div id="popup">
		<div id="close">
			<button on:click={() => ($popup = false)}>Close</button>
		</div>
		<div id="content">
			<h1>Message</h1>
			<p>{$popup_content}</p>
		</div>
	</div>
{/if}

<style lang="scss">
	#popup {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 300px;
		width: 400px;
		transform: translate(-50%, -50%);
		background-color: hsla(40, 33%, 93%, 0.8);
		border-radius: 6px;
		backdrop-filter: blur(20px);
		border: 1px solid black;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		#close {
			display: flex;
			justify-content: flex-end;
			padding: 10px;
			button {
				background-color: transparent;
				border: none;
				cursor: pointer;
				&:hover {
					color: red;
				}
			}
		}
		#content {
			position: absolute;
			height: 100%;
			width: 100%;
			top: 0;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
            align-items: center;
			pointer-events: none;
			h1 {
				font-size: 1.5rem;
				margin-bottom: 10px;
			}
			p {
				font-size: 1rem;
			}
		}
	}
</style>
