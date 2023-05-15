import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref();
  const token = ref();
  const user = ref();
  const loginFailed = ref();
  const authorization = ref();

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post("/login", {
        username: username,
        password: password,
      });
      const data = response.data;
      user.value = data.username;
      token.value = data.token;
      isAuthenticated.value = true;
      console.log("isAuthenticated: "+ isAuthenticated.value);
      loginFailed.value = false;
      authorization.value = data.autorizacao;
      console.log(data);
      return true
    } catch (ex) {
      console.log("Login failed!");
      loginFailed.value = true;
      return false
    }
  }

  async function logout(): Promise<void> {
    try {
      await axios.post("/logout");
      user.value = null;
      token.value = null;
      isAuthenticated.value = false;
      loginFailed.value = false;
      authorization.value = null;
    } catch (ex) {
      // Logout error
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