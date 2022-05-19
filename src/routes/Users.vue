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
  mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      const res = await fetch("http://localhost:3000/api/users");
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
        <img v-if="user.avatar" class="logo-user-info" :src="user.avatar">
        <p class="user-list-infos">{{ user.firstname }}</p>
        <p class="user-list-infos">{{ user.username }}</p>
        <p class="user-list-infos">{{ user.email }}</p>
        <p class="user-list-infos">{{ new Date(user.createdAt).toLocaleString() }}</p>
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
}

.container-info-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
  min-width: 300px;
  background: grey;
  margin: 10px;
}

.list-users {
  width: 25%;
  display: flex;
  justify-content: center;
}

.logo-user-info {
width: 60px;
height: 60px;
border-radius: 100%;
margin-top: 10px;
margin-bottom: 10px;
}

</style>
