<script>
    import Navbar from '$lib/components/navbar.svelte';

    export let form;
</script>

<Navbar/>

<form method='POST' action='?/create_team' class='text-yellow-200 flex flex-col justify-center items-center text-xl gap-6 mt-8'>
    <div class='flex flex-col gap-6 my-5'>
        <h1 class='text-center text-yellow-200 text-4xl px-40'>Create a Team</h1>
        <div class='flex flex-col'>
            <label for='team-name'>Team Name</label>
            <input id='team-name' placeholder="John Doe's Team" name='team-name' type='text' value={form?.team_name ?? ''} class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'/>
            {#if form?.team_name_missing}<p class='text-error'>Team Name is required</p>{/if}
            {#if form?.team_name_exists}<p class='text-error'>Team Name already exists</p>{/if}
        </div>
        <div class='flex flex-col'>
            <label for='password'>Team Password</label>
            <input id='password' placeholder='Password' name='password' type='password' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.password_missing}<p class='text-error'>Password is required</p>{/if}
        </div>
        <div class='flex flex-col'>
            <label for='confirm-password'>Confirm Password</label>
            <input id='confirm-password' placeholder='Confirm Password' name='confirm-password' type='password' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.confirm_password_missing}<p class='text-error'>Confirm Password is required</p>{/if}
            {#if form?.password_mismatch}<p class='text-error'>Passwords do not match</p>{/if}
        <button class='bg-yellow-200 text-blue-100 font-bold mx-auto p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-blue-200 hover:text-yellow-200'>Create Team</button>
    </div>
</form>
<div class='flex justify-center'>
    <a href="/dashboard/team/join"><button class='bg-blue-200 text-yellow-200 font-bold p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-yellow-200 hover:text-blue-100'>Join a Team</button></a>
</div>