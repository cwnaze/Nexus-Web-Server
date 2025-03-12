<script>
    import { goto } from '$app/navigation';

    // Logout function to delete the authToken cookie and redirect
    function logout() {
        // Redirect to the login page using SvelteKit's goto
        goto('/login');  // Adjust the path to your login page
    }
</script>

<div class='p-3 bg-blue-100 drop-shadow-dark flex items-center'>
    <div class='flex-1 flex justify-center'><img src='/images/NexusLogo.svg' class='mr-auto' alt='Nexus Logo'></div>
    <div class='flex-1 flex justify-center'>
        <ul class='flex gap-12 text-yellow-200 justify-center mx-auto text-xl'>
            <li class='hover:underline'><a href='/dashboard/challenges'>Challenges</a></li>
            <li class='hover:underline'><a href='/dashboard/team'>My Team</a></li>
            <li class='hover:underline'><a href='/dashboard/leaderboard'>Leaderboard</a></li>
        </ul>
    </div>
    <div class='flex-1 flex justify-center'>
        <!-- Bind the logout function to the button's click event -->
        <button on:click={logout} class='ml-auto bg-blue-100 border-yellow-200 border-4 text-yellow-200 font-black text-xl p-2 px-8 rounded-lg hover:bg-yellow-200 hover:text-blue-200'>
            Logout
        </button>
    </div>
</div>