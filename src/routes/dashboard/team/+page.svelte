<script lang='ts'>
    import Navbar from '$lib/components/navbar.svelte';
    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        team_points: { points: number; };
    };
</script>

<Navbar/>

<h1 class='text-4xl font-black text-yellow-200 text-center mt-4'>{data.user_info.team_name}</h1>
<h2>{data.team_points} Points</h2>