<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="p-5 grid gap-4">
	<slot></slot>
</div>
