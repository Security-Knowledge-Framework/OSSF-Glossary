<script>
  export let item;

  let url = "";
  let title = "";
  let logo = "";

  const { source } = item;

  if (Object.hasOwn(source, "url")) {
    url = source.url;
  }

  if (Object.hasOwn(source, "title")) {
    title = source.title;
  }

  if (Object.hasOwn(source, "logo")) {
    logo = source.logo;
  }
</script>

<div class="card">
  <h2>{item.term}</h2>
  <p>{item.description}</p>
  <div class="citation">
    {#if url && title}
      <a href={url}>{title}</a>
    {/if}
    {#if logo}
      <img src={logo} alt={`${title} logo`} />
    {/if}
  </div>
</div>

<style>
  .card {
    border: 1px solid black;
    margin-bottom: 20px;
    width: 100%;
  }
</style>
