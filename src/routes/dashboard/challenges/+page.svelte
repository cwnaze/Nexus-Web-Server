<script lang='ts'>
    import { onMount } from "svelte";
    import RFB from "@novnc/novnc/lib/rfb";
    import Navbar from "../navbar.svelte";
  
    let rfb;
    let container: any;
  
    const connectToVnc = () => {
      const url = 'ws://172.16.106.132:6080';
  
      rfb = new RFB(container, url, {
        credentials: { username: '', password: "password", target: ''},
      });
  
      rfb.addEventListener("connect", () => {
        console.log("Connected to VNC server");
      });
  
      rfb.addEventListener("disconnect", () => {
        console.log("Disconnected from VNC server");
      });
  
      rfb.addEventListener("credentialsrequired", () => {
        console.log("VNC server requires credentials");
      });
    };
  
    onMount(() => {
      connectToVnc();
    });
  </script>

<Navbar/>

<div id="vnc-container" bind:this={container}></div>