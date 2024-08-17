<script lang='ts'>
    import Navbar from "$lib/components/navbar.svelte";

    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        challenge_info: {ip_address: string; challenge_name: string;}[];
        master_info: {challenge_name: string; thumbnail: string; description: string; difficulty: string;}[];
    };

</script>

<Navbar/>

<div class='grid grid-cols-3 gap-6 m-4'>
    {#each Object.entries(data.master_info) as [index, master]}
        <a href="/dashboard/challenges/vnc?ip={data.challenge_info[Number(index)].ip_address}" class='text-yellow-200'>
            <div>
                <img src={master.thumbnail} alt={master.challenge_name}/>
                <div class='border-4 border-blue-100 p-2'>
                    <p class='text-center font-black text-xl'>{master.challenge_name}</p>
                    <p class='text-wrap text-center text-yellow-100'>{master.description}</p>
                </div>
            </div>
        </a>
    {/each}
</div>
