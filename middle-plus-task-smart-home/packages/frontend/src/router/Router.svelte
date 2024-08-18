<script lang="ts">
  import Auth from '../pages/Auth.svelte';
  import Home from '../pages/Home.svelte';
  import { Router, Route, navigate } from 'svelte-routing';
  import { getContext } from 'svelte';

  const { isAuth } = getContext('auth');

  const authGuard = (route) => {
    if (!$isAuth) {
      navigate('/auth');
    }
    return route;
  };
</script>

<Router>
  <Route path="/" component={Home} />
  <!-- <Route path="/auth" component={Auth} /> -->
</Router>
