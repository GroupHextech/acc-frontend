import { defineStore } from "pinia";
import { User } from "../types";
import axios from "axios";
// import { ref } from "vue";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  username: string;
  password: string;
  loginFailed: boolean;
  authorization: string | null;
}

export const useAuthStore = defineStore("login", () => {
  const state: AuthState = {
    user: null,
    isAuthenticated: false,
    token: null,
    username: "",
    password: "",
    loginFailed: false,
    authorization: null,
  };

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post("/login", {
        username: username,
        password: password,
      });
      const data = response.data;
      state.user = data.username;
      state.token = data.token;
      state.isAuthenticated = data.authorization;
      state.loginFailed = false;
      state.authorization = data.authorization;
      return true
    } catch (ex) {
      state.loginFailed = true;
      return false
    }
  }

  async function logout(): Promise<void> {
    try {
      await axios.post("/logout");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loginFailed = false;
      state.authorization = null;
    } catch (ex) {
      // Logout error
    }
  }

  function hasPermission(permission: string): boolean {
    if (!state.authorization) {
      return false;
    }
    if (state.authorization === "ADMIN") {
      return permission !== "restrict"; // Admin - "restrict"
    } else if (state.authorization === "OWNER") {
      return permission === "allowed"; // Owner - "allowed"
    }
    return true; // if there is no restriction
  }

  // async function logout() {
  // try {
  //   await axios.post('/logout');
  //   state.user = null;
  //   state.token = null;
  //   state.isAuthenticated = false;
  //   state.loginFailed = null;
  // } catch (ex) {
  //   error.value = (ex as Error).message;
  // }
  return { 
    ...state,
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