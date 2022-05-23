<script>
import Header from "../components/Headercomponent.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      images: null,
      changeAvatar: false,
      user: {
        firstname: "",
        username: "",
        description: "",
        password: "",
      },
    };
  },
  computed: {
    avatar() {
      if (this.images === null) return this.$store.state.connectedUser.avatar;
      return URL.createObjectURL(this.images);
    },
  },
  methods: {
    changeFile() {
      this.images = this.$refs.file.files[0];
    },
    async updateInfos() {
      const formData = new FormData();
      if (this.user.username) formData.append("username", this.user.username);
      if (this.user.firstname)
        formData.append("firstname", this.user.firstname);
      if (this.user.description)
        formData.append("description", this.user.description);
      if (this.user.password) formData.append("password", this.user.password);
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
      this.$store.commit("SET_CONNECTED_USER", data);
      console.log(data);
    },
    async sendAvatar() {
      const formData = new FormData();
      formData.append("image", this.images);
      const headers = new Headers({
        Authorization: "Bearer " + this.$store.state.saveToken,
      });
      const res = await fetch(
        "http://localhost:3000/api/users/avatar/" +
          this.$store.state.connectedUser.id,
        { method: "PUT", body: formData, headers }
      );
      const data = await res.json();
      this.$store.commit("SET_CONNECTED_USER", data.user);
    },
  },
};
</script>

<template>
  <div>
    <div class="main-container-options">
      <div class="infos">
        <div class="modify-info">
          Modifier votre nom
          <input class="name-area" type="text" v-model="this.user.username" />
        </div>
        <div class="modify-info">
          Modifier votre prénom
          <input class="name-area" type="text" v-model="this.user.firstname" />
        </div>
        <div class="modify-info">
          Modifier votre description
          <input
            class="name-area"
            type="text"
            v-model="this.user.description"
          />
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
        <div class="buttons-area">
          <button class="button-update-infos" @click="updateInfos">
            Modifier les infos
          </button>
          <button
            class="button-change-avatar"
            @click="changeAvatar = !changeAvatar"
          >
            Modifier l'avatar
          </button>
          <div class="preview-avatar-to-modify" v-if="changeAvatar">
            <span class="avatar-preview">Preview de l'avatar</span>
            <img class="avatar-loaded-user" :src="avatar" />
            <input
              @change="changeFile"
              ref="file"
              class="submit-avatar"
              type="file"
              value=""
            />
            <button @click="sendAvatar">Envoyer l'avatar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main-container-options {
  background-color: #867f7f;
  color: white;
  display: flex;
  justify-content: center;
}

.avatar-loaded-user {
  width: 350px;
  height: 200px;
  object-fit: cover;
}

.infos {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  padding-top: 10px;
}

.modify-info {
  display: flex;
  flex-direction: column;
  width: 500px;
}

textarea {
  background-color: white;
  height: 50px;
  width: 100%;
  border-radius: 5px;
}

.button-area {
  align-self: center;
}

.button-update-infos {
  height: 50px;
  border-radius: 20px;
}

.button-change-avatar {
  height: 50px;
  border-radius: 20px;
}

.preview-avatar-to-modify {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

.avatar-preview {
  padding: 10px;
}

.submit-avatar {
  background-color: grey;
}

.submit-info {
  background-color: grey;
  width: 100px;
}

.name-area {
  height: 50px;
  background-color: #091f43;
  color: white;
}
</style>
