<script lang='ts'>
    import { onMount } from "svelte";
    let RFB: any;
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

    onMount(async () => {
        const module = await import("@novnc/novnc/lib/rfb");
        RFB = module.default;
        connectToVnc();
    });
</script>

<Navbar/>

<div id="vnc-container" bind:this={container}></div>