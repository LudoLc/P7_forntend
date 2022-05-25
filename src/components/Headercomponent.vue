<script>
export default {
  name: 'App',
  metaInfo: {
    title: "Groupomania"
  },
  props: {
    links: {
      type: Array,
      required: false,
    },
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
          <router-link id="myButton1" class="router-header-button" :to="{ name: 'posts' }">
              Workplace
          </router-link>
          <router-link id="myButton2" class="router-header-button" :to="{ name: 'users' }">
              Utilisateurs
          </router-link>
          <router-link id="myButton3" class="router-header-button" :to="{ name: 'options' }">
            Options
          </router-link>
        </div>
      </div>
      <div class="header-section">
        <router-link v-if="this.$store.state.connectedUser" :to="{ name: 'options' }">
        <img v-if="this.$store.state.connectedUser.avatar" class="header-img" :src="this.$store.state.connectedUser.avatar" alt="header"/>
        <img v-else class="header-img" src="../assets/profile_white.png" alt="profile-pic"/>
        </router-link>
        <img @click="disconnectUser()" class="header-img" src="../assets/onoff_white.png" alt="on-off-img"/>
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
  background-color: #D7D7D7;
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
  align-items: baseline;
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
  width: 60px;
  height: 60px;
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
    border-radius: 10px;
    color: black;
    background-color: white;
    align-self: center;
    line-height: 40px;
    text-decoration: none;
    text-align: center;
}

#myButton1 {
  cursor: pointer;
}

#myButton2 {
  cursor: pointer;
}

#myButton3 {
  cursor: pointer;
}
.buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

@media screen and (max-width: 871px){
  .header-container {
    justify-content: center;
    height: auto;
  }
}
@media screen and (max-width: 362px){    
  .header-container {
    width: 100%;
  }
  .buttons {
    justify-content: center;
  }

  .users-list {
    padding: 5px;
  }

  .container-info-user {
    width: 100%;
    max-width: 300px;
    padding: 5px;
  }


}

</style>
