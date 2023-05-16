import { defineStore } from "pinia";
import axios from "axios";
import { ref, Ref } from "vue";
import Cookies from 'js-cookie';

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated: Ref<boolean> = ref(false);
  const token: Ref<string | null> = ref(null);
  const user: Ref<string | null> = ref(null);
  const loginFailed: Ref<boolean> = ref(false);
  const authorization: Ref<string | null> = ref(null);

  async function login(usernameOrToken: string, password?: string): Promise<boolean> {
    if (password) {
      try {
        const response = await axios.post("/login", {
          username: usernameOrToken,
          password: password,
        });
        const data = response.data;
        user.value = data.username;
        token.value = data.token;
        if (token.value) {
          loginFailed.value = false;
          Cookies.set("authToken", token.value, { secure: true, expires: 7 });
        } else {
          loginFailed.value = true;
        }
        isAuthenticated.value = true;
        authorization.value = data.autorizacao;
        console.log(data);
        console.log("isAuthenticated: "+ isAuthenticated.value);
        return true
      } catch (ex) {
        console.log("Login failed!");
        loginFailed.value = true;
        return false
      }
    } else {
      return await loginWithToken(usernameOrToken);
    }
  }

  async function getUsernameFromToken(token: string): Promise<string | null> {
    try {
      const response = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      return data.username;
    } catch (ex) {
      // Tratamento de erro
      return null;
    }
  }

  async function loginWithToken(tokenValue: string): Promise<boolean> {
    try {
      const username = await getUsernameFromToken(tokenValue);
      if (username) {
        user.value = username;
        token.value = tokenValue;
        isAuthenticated.value = true;
        return true;
      } else { 
        alert("User not found!");
        return false;
      }
    } catch (ex) {
      alert("Login error with token");
      return false;
    }
  }
  

  async function logout(): Promise<void> {
    try {
      await axios.post("/logout");
      user.value = null;
      token.value = null;
      Cookies.remove("authToken");
      isAuthenticated.value = false;
      loginFailed.value = false;
      authorization.value = null;
    } catch (ex) {
      console.log("Logout failed!");
    }
  }

  function hasPermission(permission: string): boolean {
    if (!authorization.value) {
      return false;
    }
    if (authorization.value === "ADMIN") {
      return permission !== "restrict"; // Admin - "restrict"
    } else if (authorization.value === "OWNER") {
      return permission === "allowed"; // Owner - "allowed"
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
    loginWithToken,
    logout,
    hasPermission,
  }
});

// export const useAuthStore = defineStore({
//   id: "auth",
//   state: (): AuthState => ({
//     user: null as User | null,
//     isAuthenticated: false,
//     token: sessionStorage.getItem("token") || null,
//   }),
//   actions: {
//     async login(username: string, password: string) {
//       // Aqui você deve implementar a lógica de autenticação, como buscar o usuário no banco de dados e verificar a senha
//       // Se a autenticação for bem-sucedida, atualize o estado do store
//       const adminUser = {
//         username: "admin",
//         password: "admin",
//         userType: { id: 1, name: "admin" },
//       };
//       const ownerUser = {
//         username: "owner",
//         password: "owner",
//         userType: { id: 2, name: "owner" },
//       };
//       const pilotUser = {
//         username: "pilot",
//         password: "pilot",
//         userType: { id: 3, name: "pilot" },
//       };
//       const users = [adminUser, ownerUser, pilotUser];
//       const authenticatedUser = users.find(
//         (user) => user.username === username && user.password === password
//       );
//       if (authenticatedUser) {
//         this.user = authenticatedUser;
//         this.isAuthenticated = true;
//         this.token = "meu-token-123";
//         const token = this.token;
//         sessionStorage.setItem("token", token);
//         return true;
//       } else {
//         // Se a autenticação falhar, lance um erro ou retorne false para indicar que o login não foi bem-sucedido
//         this.isAuthenticated = false;
//         return false;
//       }
//     },
//     logout() {
//       // Aqui você deve implementar a lógica de logout, como limpar o token de autenticação do usuário
//       // Atualize o estado do store para refletir que o usuário não está mais autenticado
//       this.user = null;
//       this.isAuthenticated = false;
//       this.token = null;
//       sessionStorage.removeItem("token");
//     },
//   },
// });