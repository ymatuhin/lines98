<script>
  import { fade } from "svelte/transition";
  import {
    $score as score,
    $grid as grid,
    $nextBalls as nextBalls,
    $activeBallCoords as activeBallCoords,
    start,
    nextTurn,
    cellClick,
    findLines,
  } from "./index";

  start();
</script>

<h1>Score: {$score}</h1>

<ul class="next-balls">
  {#each $nextBalls as ball}
    <li in:fade out:fade class="ball {ball?.color}" />
  {/each}
</ul>

<button on:click={start}>start</button>
<button on:click={nextTurn}>nextTurn</button>
<button on:click={findLines}>findLines</button>

<p>{$activeBallCoords?.x} x {$activeBallCoords?.y}</p>

<table class="grid">
  {#each $grid as row, y}
    <tr>
      {#each row as cell, x}
        <td
          on:click={() => cellClick({ x, y })}
          class:active={$activeBallCoords?.x === x &&
            $activeBallCoords?.y === y}
        >
          {#if cell}
            <div class="ball {cell?.color}" />
          {:else}
            <div />
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style scoped>
  .grid {
    border-spacing: 4px;
    border-collapse: separate;
  }

  .grid td {
    min-width: 64px;
    height: 64px;
    text-align: center;
    line-height: 64px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .grid td.active {
    background: rgba(255, 255, 255, 0.2);
  }

  .next-balls {
    display: flex;
    list-style-type: none;
  }

  .ball {
    border-radius: 50%;
    width: 48px;
    height: 48px;
    margin: 8px;
    position: static;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.1),
      inset -8px -8px 16px 0 rgba(0, 0, 0, 0.25);
  }

  .ball.aqua {
    background: #06b6d4;
  }
  .ball.blue {
    background: #3b82f6;
  }
  .ball.green {
    background: #22c55e;
  }
  .ball.pink {
    background: #ec4899;
  }
  .ball.red {
    background: #ef4444;
  }
  .ball.violet {
    background: #8b5cf6;
  }
  .ball.yellow {
    background: #eab308;
  }
</style>
