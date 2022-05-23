<script>
export default {
  props: {
    links: {
      type: Array,
      required: false,
    },
  },
  components: {
    
  },
  methods: {
      disconnectUser() {
        localStorage.clear();
        this.$store.commit("SET_SAVE_TOKEN", null);
        this.$store.commit("SET_CONNECTED_USER", {});
        this.$router.push({ name: "login" });
      },
    }
};
</script>

<template>
  <main>
    <div v-if="$store.state.saveToken" class="header-container">
      <div class="header-section">
        <router-link :to="{ name: 'login' }">
          <img class="header-img" src="../assets/logo_white.png" alt="header"/>
        </router-link>
        <h1 class="groupomania">Groupomania</h1>
        <div class="buttons">
          <router-link :to="{ name: 'posts' }">
            <button id="myButton" class="router-header-button">
              Workplace
            </button>
          </router-link>
          <router-link :to="{ name: 'users' }">
            <button id="myButton" class="router-header-button">
              Utilisateurs
            </button>
          </router-link>
          <router-link :to="{ name: 'options' }">
            <button id="myButton" class="router-header-button">Options</button>
          </router-link>
        </div>
      </div>
      <div class="header-section">
        <router-link v-if="this.$store.state.connectedUser" :to="{ name: 'options' }">
        <img v-if="this.$store.state.connectedUser.avatar" class="header-img" :src="this.$store.state.connectedUser.avatar"/>
        <img v-else class="header-img" src="../assets/profile_white.png" />
        </router-link>
        <img @click="disconnectUser()" class="header-img" src="../assets/onoff_white.png" />
        <Toggle :mode="mode" @toggle="$emit('toggle')"/>
      </div>
    </div>
    <div v-else class="header-container">
      <div class="header-section">
        <router-link :to="{ name: 'login' }">
          <img class="header-img" src="../assets/logo_white.png" alt="header"/>
        </router-link>
        <h2 class="groupomania">Groupomania</h2>
      </div>
    </div>
  </main>
</template>

<style>
body {
  margin: 0;
  background-color: grey;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
}

.header-container {
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #d1515a;
  height: 100px;
}

.header-section {
  height: 100%;
  margin: 3%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.header-img {
  cursor: pointer;
  width: auto;
  height: auto;
  max-width: 60px;
  min-height: 60px;
  object-fit: cover;
  border-radius: 30px;
}

.groupomania {
  color: white;
  padding-left: 10px;
  padding-right: 20px;
}

.router-header-button {
  height: 40px;
  width: 100px;
  border-radius: 20px;
}

#myButton {
  cursor: pointer;
}

.buttons {
  display: flex;
  gap: 20px;
}


</style>
