<script lang='ts'>
    import Navbar from "../navbar.svelte";

    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        challenge_info: {ip_address: string; challenge_name: string;}[];
    };
    console.log(data);

    const ip_address = data.challenge_info.map((x) => x.ip_address);

</script>

<Navbar/>

{#each Object.entries(ip_address) as [index, ip]}
    <a href="/dashboard/challenges/vnc?ip={ip}" class='text-yellow-200'>{ip}</a>
    <br/>
{/each}
