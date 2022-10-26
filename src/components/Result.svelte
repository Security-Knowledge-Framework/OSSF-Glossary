<script>
  import Card from "./Card.svelte";

  import { result } from "../stores/result";
  $: items = $result
    .map((item) => {
      return item.definitions.map((def) => {
        return {
          description: def.description,
          source: def.source,
          category: item.category,
          term: item.term,
        };
      });
    })
    .flat();
</script>

{#each items as item}
  <Card {item} />
{/each}
