<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { axiosInstance } from "../utils/http";
    import type { formData } from "../types/types";
  
  const isAuth = writable(false);
  const user = writable(null);

  const login = async (formData: formData) => {
    try {
      const { data }= await axiosInstance.post("/auth/login", formData);
      if (data.success) {
        isAuth.set(true);
        user.set(data.message.user);
        localStorage.setItem("token", data.message.accessToken);
      }
    } catch (error) {
      throw error;
    }
  }

  const initializeAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await axiosInstance.get("/user/profile")
      } catch (error) {
        
      }
    }
  }

  setContext("auth", { isAuth: isAuth, user: user, login: login });
</script>
<slot />