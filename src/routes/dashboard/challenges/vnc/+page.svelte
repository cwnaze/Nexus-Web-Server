<script lang='ts'>
    import { onMount } from "svelte";
    import RFB from "@novnc/novnc/lib/rfb";
    import Navbar from "$lib/components/navbar.svelte";
    import {page} from '$app/stores';

    let rfb;
    let container: any;

    const connectToVnc = () => {
        const ip_address = $page.url.searchParams.get('ip');
        const url = 'ws://' + ip_address + ':6080';
        rfb = new RFB( container, url, {
            credentials: { username: '', password: "password", target: ''},
        });

        rfb.background = 'rgb(41 50 65)';
    };

    onMount(() => {
        connectToVnc();
    });
</script>

<Navbar/>

<div id="vnc-container" bind:this={container}></div>