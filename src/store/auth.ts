import { defineStore } from "pinia";
import axios from "axios";
import { ref, Ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated: Ref<boolean> = ref(false);
  const token: Ref<string | null> = ref(null);
  const user: Ref<string | null> = ref(null);
  const loginFailed: Ref<boolean> = ref(false);
  const authorization: Ref<string | null> = ref(null);

  async function login(username: string, password: string): Promise<boolean> {
      try {
        const response = await axios.post("/login", {
          login: username,
          password: password,
        });
        const data = response.data;
        user.value = data.login;
        token.value = data.token;
        if (token.value) {
          loginFailed.value = false;
          sessionStorage.setItem("authToken", token.value);
        } else {
          loginFailed.value = true;
        }
        isAuthenticated.value = true;
        authorization.value = data.autorizacao;
        return true
      } catch (ex) {
        alert("Login failed!");
        loginFailed.value = true;
        return false
      }
  }

  async function logout(): Promise<void> {
    try {
      user.value = null;
      token.value = null;
      sessionStorage.removeItem('authToken');
      isAuthenticated.value = false;
      loginFailed.value = false;
      authorization.value = null;
    } catch (ex) {
      alert("Logout failed!");
    }
  }

  function hasPermission(permission: string): boolean {
    if (!authorization.value) {
      return false;
    }
    if (authorization.value === "ADM") {
      return permission !== "restrict";
    } else if (authorization.value === "EDITOR") {
      return permission === "allowed";
    }
    return true; // if there is no restriction
  }
  return { 
    isAuthenticated,
    token,
    user,
    loginFailed,
    authorization,
    login,
    logout,
    hasPermission,
  }
});