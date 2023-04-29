<template>
  <div class="container">
    <section class="hero is-small">
      <div class="hero-body">
        <h1 class="title">Login</h1>
        <section>
          <div class="columns is-centered">
            <div class="column is-half is-offset-one-quarter">
              <div class="box">
                <div class="field">
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      type="email"
                      placeholder="Username"
                      v-model="username"
                    />
                    <span class="icon is-small is-left">
                      <i class="pi pi-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                      <i class="pi pi-check"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control has-icons-left">
                    <input
                      class="input"
                      type="password"
                      placeholder="Password"
                      v-model="password"
                    />
                    <span class="icon is-small is-left">
                      <i class="pi pi-lock"></i>
                    </span>
                  </p>
                </div>
                <div class="field">
                  <p class="control">
                    <button
                      type="submit"
                      class="button is-link"
                      @click.prevent="login"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
              <LoginFailed v-if="loginFailed" />
            </div>
            <div class="column"></div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import LoginFailed from "../components/LoginFailed.vue";

export default defineComponent({
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const authStore = useAuthStore();
    const loginFailed = ref(false);

    async function login() {

      if (await authStore.login(username.value, password.value, loginFailed.value)) {
        // autenticação bem-sucedida, faça algo aqui
        await router.push({ name: "chassis" });
      } else {
        // autenticação falhou, exiba LoginFailed
        loginFailed.value = true;
      }
    }
    return {
      username,
      password,
      loginFailed,
      login,
    };
  },
  components: { LoginFailed },
});
</script>

<style scoped>
.box {
  padding: 0.5em;
  background-color: #f9f9f9;
  border: 1px #eee solid;
}
</style>
