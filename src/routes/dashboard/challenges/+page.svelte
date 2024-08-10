<script lang='ts'>
    import Navbar from "../navbar.svelte";

    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        challenge_info: {ip_address: string; challenge_name: string;}[];
        master_info: {challenge_name: string; thumbnail: string; description: string; difficulty: string;}[];
    };

</script>

<Navbar/>

{#each Object.entries(data.challenge_info) as [index, challenge]}
    <a href="/dashboard/challenges/vnc?ip={challenge.ip_address}" class='text-yellow-200'>{challenge.ip_address}</a>
    <br/>
{/each}
