<script>
  import Card from "./Card.svelte";

  import { result } from "../stores/result";
</script>

{#each $result as item}
  <Card {item} />
{/each}
