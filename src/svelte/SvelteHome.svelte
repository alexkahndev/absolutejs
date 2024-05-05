<script>
    let count = 0;
    let year = new Date().getFullYear();
  </script>
  
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Svelte Home</title>
      <meta name="description" content="Welcome to AbsoluteJS" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="/assets/css/SvelteHome.css" />
      <link rel="icon" href="/assets/ico/favicon.ico" />
    </head>
    <body>
      <main>
        <header>
          <h1>This page was built with Svelte</h1>
        </header>
        <section>
          <p>
            Welcome to the Svelte home page. This page was built using Svelte.
          </p>
          <p>Counter: {count}</p>
          <button on:click={() => count += 1}>Increment</button>
          <div id="links">
            <a href="/">Home</a>
            <a href="/vue">Vue</a>
          </div>
        </section>
        <footer>
          <p>© {year} AbsoluteJS</p>
        </footer>
      </main>
    </body>
  </html>
  