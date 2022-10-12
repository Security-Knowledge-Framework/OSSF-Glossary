<script>
  import "./base.css";
  import Input from "./components/Input.svelte";
  import Logo from "./components/Logo.svelte";
  import Result from "./components/Result.svelte";
</script>

<main class="wrapper">
  <Logo />
  <Input />
  <Result />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
