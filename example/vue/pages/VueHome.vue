<template>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Awesome.Social</title>
        <meta name="description" content="Bun, Elysia & Vue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles/Home.css" />
        <link rel="icon" href="/assets/favicon.ico" />
      </head>
      <body>
        <main>
          <header>
            <h1>Welcome to Awesome.Social</h1>
          </header>
          <section>
            <p>
              This is a simple social media platform built with
              Bun, Elysia & Vue.
            </p>
          </section>
          <footer>
            <p>© {{ currentYear }} Awesome.Social</p>
          </footer>
        </main>
      </body>
    </html>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear()
      };
    }
  };
  </script>
  