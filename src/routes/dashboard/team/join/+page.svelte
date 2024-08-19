<script>
    import Navbar from '$lib/components/navbar.svelte';
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<Navbar/>

<form method='POST' action='?/join_team' class='text-yellow-200 flex flex-col justify-center items-center mt-8 text-2xl'>
    <div class='flex flex-col gap-6 w-128'>
        <h1 class='text-center text-yellow-200 text-4xl px-40'>Join a Team</h1>
        <div class='flex flex-col'>
            <label for='team_name'>Team Name</label>
            <input id='team_name' placeholder="John Doe's Team"  name='team_name' type='text' value={form?.t_name ?? ''} class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
        </div>
        <div class='flex flex-col'>
            <label for='password'>Password</label>
            <input id='password' placeholder='Password' name='password' type='password' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
            {#if form?.password_missing}<p class='text-error'>Password is required</p>{/if}
            {#if form?.invalid_login}<p class='text-error'>Email or password is incorrect</p>{/if}
        </div>
        <button class='bg-yellow-200 text-blue-100 font-bold mx-auto p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-blue-200 hover:text-yellow-200 hover:border-yellow-200'>Join Team</button>
    </div>
</form>
<div class='flex justify-center'>
    <a href="/dashboard/team"><button class='bg-blue-200 text-yellow-200 font-bold p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-yellow-200 hover:text-blue-100'>Create a Team</button></a>
</div>