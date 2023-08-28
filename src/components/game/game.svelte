<script>
  import { score, board, nextBalls, start, skip } from "./index";
</script>

<h1>Score: {$score}</h1>

<table class="board">
  {#each $board as row}
    <tr>
      {#each row as cell}
        <td style:background={cell?.color}>{cell ? cell.color : "x"}</td>
      {/each}
    </tr>
  {/each}
</table>

<ul class="next-balls">
  {#each $nextBalls as ball}
    <li style:background={ball.color}>{ball.color}</li>
  {/each}
</ul>

<button on:click={start}>start</button>
<button on:click={skip}>skip</button>

<style>
  .board td {
    min-width: 64px;
    height: 64px;
    text-align: center;
    line-height: 64px;
  }

  .next-balls {
    display: flex;
  }
</style>
