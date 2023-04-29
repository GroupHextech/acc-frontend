import { defineStore } from "pinia";
import { User } from "../types";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    user: null as User | null,
    isAuthenticated: false,
    token: Cookies.get("token") || null,
  }), 
  actions: {
    async login(username: string, password: string, loginFailed: boolean) {
      // Aqui você deve implementar a lógica de autenticação, como buscar o usuário no banco de dados e verificar a senha
      // Se a autenticação for bem-sucedida, atualize o estado do store
      const adminUser = {
        username: "admin",
        password: "admin",
        userType: "admin",
      };
      const ownerUser = {
        username: "owner",
        password: "owner",
        userType: "owner",
      };
      const pilotUser = {
        username: "pilot",
        password: "pilot",
        userType: "pilot",
      };
      const users = [adminUser, ownerUser, pilotUser];
      const authenticatedUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (authenticatedUser) {
        this.user = authenticatedUser;
        this.isAuthenticated = true;
        this.token = 'meu-token-123';
        const token = this.token;
        Cookies.set("token", token, { expires: 7 });
        return true;
      } else {
        // Se a autenticação falhar, lance um erro ou retorne false para indicar que o login não foi bem-sucedido
        this.isAuthenticated = false;
        return false;
      }
    },
    logout() {
      // Aqui você deve implementar a lógica de logout, como limpar o token de autenticação do usuário
      // Atualize o estado do store para refletir que o usuário não está mais autenticado
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;
      Cookies.remove("token");
    },
    getToken() {
      return this.token;
    }
  },
});