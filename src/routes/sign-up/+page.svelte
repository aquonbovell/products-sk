<script lang="ts">
	import type { PageData } from './$types';

	import SignUp from 'clerk-sveltekit/client/SignUp.svelte';
	export let data: PageData;
</script>

<div class="flex justify-center">
	<SignUp redirectUrl="/onboarding" />
</div>
