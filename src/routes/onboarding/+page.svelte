<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { onMount } from 'svelte';
	import { userSchema, type UserSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	export let data: SuperValidated<Infer<UserSchema>> & PageData;

	const form = superForm(data, {
		validators: zodClient(userSchema),

		dataType: 'json'
	});

	const { form: formData, enhance } = form;

	onMount(() => {
		formData.set(data.user);
	});
	$: console.log($formData.username);
</script>

<header>Onboarding</header>
<form method="POST" use:enhance class="max-w-4xl">
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input {...attrs} bind:value={$formData.username} class="bg-inherit" disabled />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Form.Label>firstName</Form.Label>
			<Input {...attrs} bind:value={$formData.firstName} class="bg-inherit" />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="lastName">
		<Form.Control let:attrs>
			<Form.Label>lastName</Form.Label>
			<Input {...attrs} bind:value={$formData.lastName} class="bg-inherit" />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>email</Form.Label>
			<Input {...attrs} bind:value={$formData.email} class="bg-inherit" />
		</Form.Control>
		<Form.Description>This is your public display name.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button
		class="dark:bg-white text-slate-900 uppercase font-bold hover:bg-slate-300 focus:bg-slate-300 focus-within:bg-slate-300 active:bg-slate-200"
		>Submit</Form.Button
	>
</form>
