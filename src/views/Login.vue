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
                  <p class="control has-icons-left">
                    <input class="input" type="email" placeholder="Username" v-model="username" />
                    <span class="icon is-small is-left">
                      <i class="pi pi-user"></i>
                    </span>
                  </p>
                </div>
                <div class="field has-addons">
                  <p class="control has-icons-left is-expanded">
                    <input id="password" class="input" type="password" placeholder="Password" v-model="password" />
                    <span class="icon is-small is-left">
                      <i class="pi pi-lock"></i>
                    </span>
                  </p>
                  <div class="control">
                    <a class="button" id="eyeButton" @click="showPassword">
                      <i id="eye" class="pi pi-eye"></i>
                    </a>
                  </div>
                </div>
                <div class="field">
                  <p class="control">
                    <button type="submit" class="button is-link" :class="{ 'p-button-loading': loading }"
                      @click.prevent="login">
                      <span v-if="!loading">Sign in</span>
                      <span v-else>
                        <i class="pi pi-spin pi-spinner"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </div>
              <LoginFailed v-if="loginFailed" @close="loginFailed = false" />
              <div v-if="errorMessage" class="notification is-danger">
                {{ errorMessage }}
              </div>
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
  components: { LoginFailed },
  setup() {
    const username = ref("");
    const password = ref("");
    const authStore = useAuthStore();
    const router = useRouter();
    const loginFailed = ref(false);

    const loading = ref(false);
    const errorMessage = ref("");

    async function login() {
      loading.value = true;
      try {
        if (await authStore.login(username.value, password.value)) {
          // Successful authentication
          await router.push({ name: "chassis" });
        } else {
          // Authentication failed, display LoginFailed
          loginFailed.value = true;
        }
      } catch (error: any) {
        // Error handling
        const errorMessage = error.message;
        if (error.response && error.response.status === 401) {
          errorMessage.value = 'Invalid credentials. Please check your username and password.';
          password.value = ''; // Clear the password field.
        } else {
          errorMessage.value = 'An error occurred during login. Please try again.';
        }
      } finally {
        loading.value = false;
      }
    }

    function showPassword() {
      const typePassword: HTMLInputElement = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const typeIcon: HTMLInputElement = document.getElementById(
        "eye"
      ) as HTMLInputElement;
      if (typePassword.type == "password") {
        typePassword.type = "text";
        typeIcon.className = "pi pi-eye-slash";
      } else {
        typePassword.type = "password";
        typeIcon.className = "pi pi-eye";
      }
    }
    return {
      ...authStore,
      username,
      password,
      loading,
      login,
      loginFailed,
      errorMessage,
      showPassword,
    };
  },
  methods: {
    showPassword() {
      const typePassword: HTMLInputElement = document.getElementById(
        "password"
      ) as HTMLInputElement;
      const typeIcon: HTMLInputElement = document.getElementById(
        "eye"
      ) as HTMLInputElement;
      if (typePassword.type == "password") {
        typePassword.type = "text";
        typeIcon.className = "pi pi-eye-slash";
      } else {
        typePassword.type = "password";
        typeIcon.className = "pi pi-eye";
      }
    },
  },
});
</script>

<style scoped>
.box {
  padding: 2rem;
  background-color: #eff1fa;
  border: 1px #dbdbdb solid;
  box-shadow: none;
}

#eye {
  color: #dbdbdb;
}
</style>
