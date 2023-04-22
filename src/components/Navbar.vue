<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #0a1a5c"
  >
    <a class="navbar-brand" href="#">
      <img
        src="../assets/sedan-car-side-black-silhouette.svg"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      EMBRACAR
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#textoNavbar"
      aria-controls="textoNavbar"
      aria-expanded="false"
      aria-label="Alterna navegação"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="textoNavbar">
      <ul class="navbar-nav mr-auto" v-if="isLoggedIn">
        <li class="nav-item">
          <a class="nav-link" href="#">Profile Type</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
            ><router-link to="/chassis">Chassis</router-link></a
          >
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">
            <router-link to="/chassis/register">Register</router-link></a
          >
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link">Service Bulletins</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link to="/items">Items</router-link></a
          >
        </li>
      </ul>
      <span>
        <!--router-link v-if="!isLoggedIn" class="nav-link" to="/">Login</router-link-->
        <button
          v-if="isLoggedIn"
          class="btn btn-outline-light btn-sm"
          @click="logout"
        >
          Sign out
        </button>
      </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();
    const router = useRouter();

    const isLoggedIn = computed(() => {
      // Verifica se o usuário está na rota de login
      if (route.name === "login") {
        return false;
      }
      // Verificação se o usuário está logado
      return true;
    });

    function logout() {
      // Processo de logout

      // Redireciona para a página de login
      router.push({ name: "login" });
    }

    return {
      isLoggedIn,
      logout,
    };
  },
});
</script>
