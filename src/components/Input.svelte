<script>
  import data from "../data.json";
  import { result } from "../stores/result";

  let term = "";

  function search() {
    if (term.trim() === "") return ($result = []);
    const filtered = data.filter((item) => {
      return item.term.toLowerCase().includes(term.toLowerCase());
    });
    $result = filtered;
  }
</script>

<input type="text" placeholder="Term" bind:value={term} on:input={search} />

<style>
  input {
    width: 100%;
    margin-bottom: 20px;
  }
</style>
