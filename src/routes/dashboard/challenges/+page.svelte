<script lang='ts'>
    import Navbar from "../navbar.svelte";

    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        challenge_info: {ip_address: string; challenge_name: string;}
    };


</script>

<Navbar/>

<a href="/dashboard/challenges/vnc?ip={data.challenge_info.ip_address}" class='text-yellow-200'>{data.challenge_info.ip_address}</a>