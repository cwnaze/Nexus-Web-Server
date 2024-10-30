<script lang='ts'>
    import Navbar from "$lib/components/navbar.svelte";

    export let data: {
        leaderboard: {team: string}[]
    };
</script>

<Navbar />

<h1 class='text-4xl font-black text-yellow-200 text-center mt-16'>Leaderboard</h1>
<div class='grid grid-cols-3 mx-40 mt-8 gap-8'>
    {#each data.leaderboard as team, i}
        <div>
            <div class='bg-blue-100 p-8 pt-4 flex flex-col gap-4 justify-center row-span-1'>
                <h2 class='text-3xl text-center font-bold text-yellow-200'>{i + 1}</h2>
                <h2 class='text-xl text-center font-bold text-yellow-200 text-wrap'>{team}</h2>
            </div>
        </div>
    {/each}
</div>