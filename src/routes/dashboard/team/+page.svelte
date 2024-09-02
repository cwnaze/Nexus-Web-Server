<script lang='ts'>
    import Navbar from '$lib/components/navbar.svelte';
    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        team_points: { points: number; };
        team_members: { name: string}[];
    };

    import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
  
  export const load = async () => {
    const width = 400; // Width of the chart
    const height = 400; // Height of the chart
    const chartCallback = (ChartJS) => {
      ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    };
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

    const configuration = {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: ['red', 'blue', 'yellow'],
          },
        ],
      },
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration);

    return {
      props: {
        image: image.toString('base64'),
      },
    };
  };

</script>

<Navbar/>

<h1 class='text-4xl font-black text-yellow-200 text-center mt-4'>{data.user_info.team_name}</h1>
<div class='flex items-center justify-between mx-40 bg-blue-100 p-5 mt-8'>
    <h2 class='text-2xl font-bold text-yellow-200'>{data.team_points} Points</h2>
    <h2 class='text-2xl font-bold text-yellow-200'>#1</h2>
</div>
<div class='grid grid-cols-3 mx-40 mt-8 gap-8'>
    <div class='bg-blue-100 p-8 flex flex-col gap-4'>
        {#each Object.entries(data.team_members) as [index, name]}
            {#if Number(index) > 0}
                <hr class='border-blue-200 border-2'/>
            {/if}
            <p class='text-lg text-yellow-200 text-center'>{name}</p>
        {/each}
    </div>
    <div class='grid-cols-subgrid col-span-2'>
        <h3>Point breakdown</h3>
    </div>
</div>