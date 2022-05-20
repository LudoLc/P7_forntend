<script>
import Header from "../components/Headercomponent.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      images: "",
      changeAvatar: false,
      user: {
        firstname: this.$store.state.connectedUser.firstname,
        username: this.$store.state.connectedUser.username,
        description: this.$store.state.connectedUser.description
          ? this.$store.state.connectedUser.description
          : "",
        password: this.$store.state.connectedUser.password
      },
    };
  },
  methods: {
    changeFile() {
      this.images = this.$refs.file.files[0];
    },
    async updateInfos() {
      const formData = new FormData();
      if (this.user.username) formData.append("username", this.user.username);
      if (this.user.firstname) formData.append("firstname", this.user.firstname);
      if (this.user.description)
        formData.append("description", this.user.description);
      // if (this.user.password) formData.append("password", this.user.password);
      if (this.user.question) formData.append("question", this.user.question);
      if (this.user.reponse) formData.append("reponse", this.user.reponse);
      const headers = new Headers({
        Authorization: "Bearer " + this.$store.state.saveToken,
      });
      const res = await fetch(
        "http://localhost:3000/api/users/" + this.$store.state.connectedUser.id,
        { method: "PUT", body: formData, headers }
      );
      const data = await res.json();
    },
    async sendAvatar(){
      const formData = new FormData();
      formData.append("image", this.images);
      const headers = new Headers({
        Authorization: "Bearer " + this.$store.state.saveToken,
        //"Content-type": "multipart/form-data"
      });
      const res = await fetch(
        "http://localhost:3000/api/users/avatar/" + this.$store.state.connectedUser.id,
        { method: "PUT", body: formData, headers }
      );
      const data = await res.json();
      this.$store.commit("SET_CONNECTED_USER", data.user);
    } 
  },
};
</script>

<template>
  <div>
    <div class="main-container">
      <div class="modify-info">
        Modifier votre nom
        <input class="name-area" type="text" v-model="this.user.username" />
      </div>
      <br />
      <div class="modify-info">
        Modifier votre prénom
        <input class="name-area" type="text" v-model="this.user.firstname" />
      </div>
      <br />
      <div class="modify-info">
        Modifier votre description
        <input class="name-area" type="text" v-model="this.user.description" />
      </div>
      <div class="modify-info">
        Modifier votre mot de passe
        <input
          class="name-area"
          type="text"
          v-model="this.user.password"
          placeholder="**********"
        />
      </div>
      <br />
      <button @click="updateInfos">Modifir les infos</button>
      <button @click="changeAvatar = !changeAvatar">Modifier l'avatar</button>
      <div v-if="changeAvatar">
      <input @change="changeFile" ref="file" class="submit-avatar" type="file" value="" />
      <button @click="sendAvatar">Envoyer l'avatar</button>
      </div>
    </div>
  </div>
</template>

<style>
.modify-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  padding-left: 10px;
  width: 25%;
}

textarea {
  background-color: white;
  height: 50px;
  width: 100%;
  border-radius: 5px;
}

.submit-info {
  background-color: grey;
  width: 100px;
}

.name-area {
  height: 50px;
}
</style>
