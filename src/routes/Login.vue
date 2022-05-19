<script>
import Header from '../components/Headercomponent.vue'
export default {
  components: {
    Header
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      connected: false
    };
  },
  methods: {
    async submit() {
      this.errors = {};
      const res = await fetch("http://localhost:3000/api/auth/login", {
        body: JSON.stringify({ email: this.email, password: this.password }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const login = await res.json();
      if ("errors" in login) 
        return this.errors = login.errors;
      if ("error" in login) 
        return this.errors = { email: [login.error] };
      this.$store.commit("SET_SAVE_TOKEN", login.token);
      this.$store.commit("SET_CONNECTED_USER", login.user);
      this.connected = true;
      setTimeout(()=>{
        this.$router.push({ name: "posts" });
      }, 1500)
    },
  },
};
</script>

<template>
    <div class="main-body">
    <h2 class="Login-title">Connectez-vous :</h2>
    <form @submit.prevent="submit">
      <div>
        <label class="form" for="email">Email</label>
        <input aria-label="email-form" v-model="email" id="email" type="email" name="email" placeholder="xxx@xxxx.xx" />
        <ul v-if="'email' in errors">
          <li class="error" v-for="(error, i) of errors.email" :key="i">
            {{ error }}
          </li>
        </ul>
      </div>
      <div>
        <label class="form" for="password">Mot de passe</label>
        <input aria-label="password-form" v-model="password" id="password" type="password" name="password" placeholder="............"/>
        <ul v-if="'password' in errors">
          <li class="error" v-for="(error, i) of errors.password" :key="i">
            {{ error }}
          </li>
        </ul>
      </div>
      <button class="bouton-submit" type="submit">Connexion</button>
      <div class="connected-message" v-if="connected">Vous êtes bien connecté!</div>
    </form>
    <router-link class="redirect-create-acc" :to="'/signup'">Pas de compte ? Créez-en un!</router-link>
  </div>
</template>


<style>

body {
  background-color: #091F43;
}


.main-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.Login-title {
  padding-top: 20px;
  padding-bottom: 20px;
  color: white;
}

label {
  color: white;
  display: block;
  margin: auto;
  padding: 10px;
}

input {
  height: 25px;
  padding-left: 5px;
}

.bouton-submit {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

form {
  text-align: center;
  width: 100%;
}

ul {
  padding: 0;
  text-decoration-style: none;
}
.error {
  width: 100%;
  text-decoration-style: none;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.redirect-create-acc {
  padding-top: 20px;
  color: white;
  cursor: pointer;
}

.connected-message {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  color: white;
}
</style>