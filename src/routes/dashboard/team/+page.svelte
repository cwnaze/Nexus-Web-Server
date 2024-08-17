<script>
    import Navbar from '$lib/components/navbar.svelte';
</script>

<Navbar/>

<form class='text-yellow-200 flex flex-col justify-center items-center text-xl gap-6 mt-8'>
    <div class='flex flex-col gap-6 my-5'>
        <h1 class='text-center text-yellow-200 text-4xl px-40'>Create a Team</h1>
        <div class='flex flex-col'>
            <label for='team-name'>Team Name</label>
            <input id='team-name' placeholder="John Doe's Team" name='team-name' type='text' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'/>
        </div>
        <div class='flex flex-col'>
            <label for='password'>Team Password</label>
            <input id='password' placeholder='Password' name='password' type='password' class='bg-yellow-100 rounded-lg text-blue-100 p-3 placeholder:text-blue-placeholder'>
        </div>
        <button class='bg-yellow-200 text-blue-100 font-bold mx-auto p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-blue-200 hover:text-yellow-200'>Create Team</button>
        <button class='bg-blue-200 text-yellow-200 font-bold mx-auto p-3 px-16 rounded-lg border-4 border-yellow-200 mt-6 hover:bg-yellow-200 hover:text-blue-100'>Join a Team</button>
    </div>
</form>