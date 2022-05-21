
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
      question: "",
      response: "",
      username: "",
      firstname: "",
      name: "",
  errors: {},
  connected: false
    } 
  },
  methods: {
    async submit() {
      this.errors = {};
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        body: JSON.stringify({ 
        email: this.email,
        password: this.password,
        question: this.question, 
        response: this.response, 
        username: this.username, 
        firstname: this.username
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const signup = await res.json();
      if ("errors" in signup) 
        return this.errors = signup.errors;
      if ("error" in signup) 
        return this.errors = { email: [signup.error] };
      if ("error" in signup) 
        return this.errors = { password: [signup.error] };
      if ("error" in signup) 
        return this.errors = { question: [signup.error] };
      if ("error" in signup) 
        return this.errors = { response: [signup.error] };
      if ("error" in signup) 
        return this.errors = { username: [signup.error] };
      if ("error" in signup) 
        return this.errors = { firstname: [signup.error] };
      this.$store.commit("SET_SAVE_TOKEN", signup.token);
      this.$store.commit("SET_CONNECTED_USER", signup.user);
      this.connected = true;
      setTimeout(()=>{
        this.$router.push({ name: "posts" });
      }, 1500)
    },
  }
}
</script>

<template>
  <div class="main-body">
  <h2 class="Login-title">Créez un compte</h2>
  <form @submit.prevent="submit">
  <label class="form" for="email">
    <span class="form-creat-acc-text">Email</span>
  </label>
  <input v-model="email" id="email" type="email" name="email" placeholder="xxx@xxxx.xx" />
  <ul v-if="'email' in errors">
    <li class="error" v-for="(error, i) of errors.email" :key="i">
      {{ error }}
    </li>
  </ul>
  <label class="form" for="username">
    <span class="form-creat-acc-text">Nom</span>
  </label>
  <input v-model="username" id="username" type="username" name="username" placeholder="*********" />
  <ul v-if="'username' in errors">
    <li class="error" v-for="(error, i) of errors.username" :key="i">
      {{ error }}
    </li>
  </ul>
  <label class="form" for="firstname">
    <span class="form-creat-acc-text">Prénom</span>
  </label>
  <input v-model="firstname" id="firstname" type="firstname" name="firstname" placeholder="*********" />
  <ul v-if="'firstname' in errors">
    <li class="error" v-for="(error, i) of errors.firstname" :key="i">
      {{ error }}
    </li>
  </ul>
  <label class="form" for="password">
    <span class="form-creat-acc-text">Mot de passe</span>
  </label>
  <input v-model="password" id="password" type="password" name="password" placeholder="*********" />
  <ul v-if="'password' in errors">
    <li class="error" v-for="(error, i) of errors.password" :key="i">
      {{ error }}
    </li>
  </ul>
  <label class="form" for="question">
    <span class="form-creat-acc-text">Question</span>
  </label>
  <input v-model="question" id="question" type="question" name="question" placeholder="*********" />
  <ul v-if="'question' in errors">
    <li class="error" v-for="(error, i) of errors.question" :key="i">
      {{ error }}
    </li>
  </ul>
  <label class="form" for="response">
    <span class="form-creat-acc-text">Réponse</span>
  </label>
  <input v-model="response" id="response" type="response" name="response" placeholder="*********" />
  <ul v-if="'response' in errors">
    <li class="error" v-for="(error, i) of errors.response" :key="i">
      {{ error }}
    </li>
  </ul>
  <button class="bouton-submit" type="submit">Créer votre compte</button>
  </form>
  <div class="connected-message" v-if="connected">Votre compte à bien été crée!</div>
  <router-link class="redirect-create-acc" :to="'/login'">Oups! J'ai déjà un compte</router-link>
  </div>
</template>


<style>
  .redirect-create-acc {
  padding-top: 20px;
  color: white;
  cursor: pointer;
}

.form-creat-acc-text {

  font-size: 20px;
}
</style>