<script lang='ts'>
    import Navbar from '$lib/components/navbar.svelte';
    export let data: {
        user_info: { email: string; team_name: string; first_name: string; last_name: string; };
        team_points: { points: number; };
        team_members: { name: string}[];
        leaderboard: { team: string}[];
    };

  //   import { Radar } from 'svelte-chartjs';
  //   const chartData = {
  //     labels: [
  //       'Linux',
  //       'Windows',
  //       'Server Management',
  //       'Database Management',
  //       'Red Team',
  //       'Python',
  //     ],
  //     datasets: [
  //       {
  //         label: 'Catagories',
  //         backgroundColor: '#f0a500',
  //         borderColor: '#f0a500',
  //         data: [65, 59, 90, 81, 56,],
  //       },
  //     ],
  //   };

  // import {
  //   Chart as ChartJS,
  //   Title,
  //   Tooltip,
  //   Legend,
  //   PointElement,
  //   RadialLinearScale,
  //   LineElement,
  // } from 'chart.js';

  // ChartJS.register(
  //   Title,
  //   Tooltip,
  //   Legend,
  //   PointElement,
  //   RadialLinearScale,
  //   LineElement
  // );

</script>

<Navbar/>

<h1 class='text-4xl font-black text-yellow-200 text-center mt-16'>{data.user_info.team_name}</h1>
<div class='flex items-center justify-between mx-40 bg-blue-100 p-5 mt-8'>
    <h2 class='text-2xl font-bold text-yellow-200'>{data.team_points} Points</h2>
    <h2 class='text-2xl font-bold text-yellow-200'>#1</h2>
</div>
<div class='grid grid-cols-3 mx-40 mt-8 gap-8'>
    <div>
      <div class='bg-blue-100 p-8 pt-4 flex flex-col gap-4 justify-center row-span-1'>
          <h3 class='text-2xl font-bold text-center text-yellow-200'>Team Members</h3>
          {#each Object.entries(data.team_members) as [index, name]}
              {#if Number(index) > 0}
                  <hr class='border-blue-200 border-2'/>
              {/if}
              <p class='text-lg text-yellow-100 text-center'>{name}</p>
          {/each}
      </div>
    </div>
    <div class='bg-blue-100 p-8 pt-4 flex flex-col gap-4 justify-center row-span-1'>
      <h3 class='text-2xl font-bold text-center text-yellow-200'>Motivation</h3>
      <img src='/images/hacker.gif' alt='Cat Hacker' class='mx-auto'/>
    </div>
    <!-- <div class='grid-cols-subgrid'>
        <Radar data={chartData} options={{ responsive: true, scales: { r: { pointLabels: { color: '#FFE6AE'}, grid: { color: '#334756'}, angleLines: { color: '#334756'}}}}} />
    </div> -->
    <div>
      <div class='bg-blue-100 p-8 pt-4 flex flex-col gap-4 justify-center row-span-1'>
          <h3 class='text-2xl font-bold text-center text-yellow-200'>Leaderboard</h3>
          {#each Object.entries(data.leaderboard) as [index, team]}
              {#if Number(index) > 0}
                  <hr class='border-blue-200 border-2'/>
              {/if}
              <p class='text-lg text-yellow-100 text-center'>{team}</p>
          {/each}
      </div>
    </div>
</div>