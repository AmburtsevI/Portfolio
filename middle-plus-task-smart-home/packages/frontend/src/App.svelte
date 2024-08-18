<script lang="ts">
  import Router from './router/Router.svelte';
  import AuthContext from './stores/AuthContext.svelte';
  // import './app.postcss';
  import 'flowbite/dist/flowbite.css';
</script>

<AuthContext>
  <Router />
</AuthContext>

<style>
</style>
