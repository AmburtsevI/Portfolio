<script lang="ts">
  // import { axiosInstance } from '../utils/http';
  import { navigate } from 'svelte-routing';
  import { getContext } from 'svelte';
  
  const { login } = getContext('auth');

  const formData = {
    username: '',
    password: '',
  };

  const handleSubmit = async () => {
    try {
      await login(formData);
      navigate('/')
    } catch (error) {
      throw error;
    }
  };
</script>

<div class="wrapper">
  <div class="login">
    <form on:submit|preventDefault={handleSubmit} class="form">
      <input
        type="text"
        placeholder="Username"
        bind:value={formData.username}
      />
      <input
        type="password"
        placeholder="Password"
        bind:value={formData.password}
      />
      <button type="submit">Login</button>
    </form>
  </div>
</div>

<style lang="scss">
  .wrapper {
    background: linear-gradient(45deg, #2c003e, #4b0082, #800080, #2c003e);
    background-size: 300% 300%;
    height: 100%;
    width: 100%;
    animation: gradient 10s ease infinite;
    display: flex;
    justify-content: center;
    align-items: center;

    .login {
      background-color: #202020;
      border-radius: 15px;
      width: 300px;
      height: fit-content;
      // min-height: 100px;

      .form {
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 10px;

        input {
          padding: 10px;
          border-radius: 5px;
          font-size: 16px;
          font-weight: 500;
        }

        button {
          padding: 10px;
          border-radius: 5px;
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>
