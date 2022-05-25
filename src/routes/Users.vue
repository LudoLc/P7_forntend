<script>
import Header from "../components/Headercomponent.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + this.$store.state.saveToken
        },
      });
      const users = await res.json();
      this.users = users;
    },
    async deleteUser(user){
      const res = await fetch("http://localhost:3000/api/users/"+ user.id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + this.$store.state.saveToken
        },
      })
      if(res.ok) this.users = this.users.filter((u)=>{
        return u.id !== user.id
      })
    },
  },
};
</script>

<template>
  <div class="main-container">
    <div class="users-list">
    <div class="list-users" v-for="user of users" :key="user.id">
      <div class="container-info-user">
        <router-link :to="{ name: 'user', params: {userId: user.id} }">
          <img v-if="user.avatar" class="logo-user-info" :src="user.avatar" alt="logo-avatar">
        </router-link>
        
        <p class="user-list-infos">Nom: {{ user.firstname }}</p>
        <p class="user-list-infos">Prénom: {{ user.username }}</p>
        <p class="user-list-infos">Contact: {{ user.email }}</p>
        <p class="user-list-infos">Crée le: {{ new Date(user.createdAt).toLocaleString() }}</p>
        <button v-if="$store.state.connectedUser?.Role.admin" @click="deleteUser(user)" type="button">Supprimer l'utilisateur</button>
      </div>
    </div>
    </div>
  </div>
</template>

<style>
.users-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.container-info-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 380px;
  min-width: 300px;
  background-color: #091F43;
  margin: 10px;
  border-radius: 20px;
}

.list-users {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 25%;
}

.logo-user-info {
width: 80px;
height: 80px;
border-radius: 100%;
margin-top: 10px;
margin-bottom: 10px;
object-fit: cover;
}

</style>
