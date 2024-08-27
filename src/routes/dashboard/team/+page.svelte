<script lang='ts'>
    import Navbar from '$lib/components/navbar.svelte';
    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        team_points: { points: number; };
    };
</script>

<Navbar/>

<h1 class='text-4xl font-black text-yellow-200 text-center mt-4'>{data.user_info.team_name}</h1>
<div class='flex items-center justify-between mx-40 bg-blue-100 p-5 mt-8'>
    <h2 class='text-2xl font-bold text-yellow-200'>{data.team_points} Points</h2>
    <h2 class='text-2xl font-bold text-yellow-200'>#1</h2>
</div>