<template>
  <div>
    <nav class="navbar is-link is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <img
            alt="logo"
            src="../assets/sedan-car-side-black-silhouette.svg"
            width="70"
            height="28"
          />
          EMBRACAR
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-if="isLoggedIn">

        <div class="navbar-start">
          <a class="navbar-item"> Home </a>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link class="navbar-link" to="/chassis">Chassis</router-link>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/chassis/register">Add chassis</router-link>
            </div>
          </div>
          <router-link class="navbar-item" to="/items">Items</router-link>
          <a class="navbar-item">Service Bulletins</a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-link is-light is-small" @click="logout"> Sign out </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

export default defineComponent({
  name: "Navbar",
  mounted() {
    $(document).ready(function () {
      // Check for click events on the navbar burger icon
      $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
      });
    });
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

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
      authStore.logout();
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
