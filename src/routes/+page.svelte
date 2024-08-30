<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import { onMount } from 'svelte';
	import { Products } from '$lib/store';

	onMount(async () => {
		console.log('Page mounted');
		const response = await fetch('https://dummyjson.com/products');
		const data = await response.json();
		Products.set(data.products);
	});
</script>

<div class="p-4">
	<SignedIn>
		<UserButton afterSignOutUrl="/" />
	</SignedIn>
	<SignedOut>
		<a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a>
		<!-- You could also use <SignInButton mode="modal" /> and <SignUpButton mode="modal" /> here -->
	</SignedOut>

	<!-- <pre>{JSON.stringify($Products, null, 2)}</pre> -->
	<div class="grid gap-5 max-w-lg mx-auto">
		{#each $Products as product}
			<div class="bg-slate-800 p-5 rounded-md shadow-md">
				<h2 class="text-xl font-bold">{product.brand}</h2>
				<p>{product.description}</p>
				<p>{product.category}</p>
				<div class="py-3">
					<span class="rounded-3xl bg-white text-pink-800 font-bold px-3"
						>H: {product.dimensions.height}</span
					>
					<span class="rounded-3xl bg-white text-green-800 font-bold px-3"
						>D: {product.dimensions.depth}</span
					>
					<span class="rounded-3xl bg-white text-blue-800 font-bold px-3"
						>W: {product.dimensions.width}</span
					>
				</div>
			</div>
		{/each}
	</div>
</div>
