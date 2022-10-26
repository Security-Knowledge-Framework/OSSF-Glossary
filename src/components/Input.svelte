<script>
  import data from "../data.json";
  import { result } from "../stores/result";

  let term = "";

  let timerId;
  function search() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      if (term.trim() === "") return ($result = []);
      const { terms } = data;
      const filtered = terms.filter((item) => {
        return item.term.toLowerCase().includes(term.toLowerCase());
      });
      $result = filtered;
    }, 250);
  }
</script>

<input type="text" placeholder="Term" bind:value={term} on:input={search} />

<style>
  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
  }

  input:focus {
    outline-width: 2px;
    outline-style: solid;
    outline-color: rgb(55 24 157);
  }
</style>
