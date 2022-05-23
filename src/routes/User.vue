<script>
import Header from "../components/Headercomponent.vue";
import CommentReact from "../components/CommentReact.vue";
export default {
  components: {
    Header,
    CommentReact,
  },
  data() {
    return {
      user: [],
      posts: [],
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const userId = this.$route.params.userId;
      const res = await fetch("http://localhost:3000/api/users/" + userId,{
        headers: {
          Authorization: "Bearer " + this.$store.state.saveToken,
        },
    });
      let user = await res.json();
      user.Posts = user.Posts.map((e) => {
        let comment = [];
        user.Comments.forEach((element) => {
          if (e.id === element.PostId) {
            comment.push(element);
          }
        });
        e.comment = comment;
        return e;
      });
      user.Comments = null;
      this.user = user;
    },
  },
};
</script>

<template>
  <div class="main-container">
    <div class="user-infos-container">
      <div class="pre-user-info">
        <div class="user">
          <img v-if="user.avatar" class="logo-user-info" :src="user.avatar" />
          <p class="user-infos">Nom: {{ user.username }}</p>
          <p class="user-infos">Prénom: {{ user.firstname }}</p>
          <p class="user-infos">Contact: {{ user.email }}</p>
          <p class="user-infos">Description: {{ user.description }}</p>
          <p class="user-infos">Crée le: {{ user.createdAt }}</p>
        </div>
      </div>
    </div>
    <div>
      <div class="posts-written" v-for="post in user.Posts" :key="post.id">
        <span>Nom du post: {{ post.content }}</span>
        <img
          v-if="post.media"
          class="post-content-user-id"
          :src="post.media"
          alt="media"
        />
        <div v-for="comment in post.comment" :key="comment.id">
          <span>Commentaire: {{ comment.content }}</span>
        </div>
      </div>
      <div class="posts-user-id-none" v-if="user.Posts?.length == 0">
        Cet Utilisateur n'a rien posté dernièrement
        <img src="../assets/warning.gif" />
        <div class="comments-user-id-none" v-if="user.Comments?.length == 0">
          Cet Utilisateur n'a rien commenté dernièrement
          <img src="../assets/warning.gif" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.pre-user-info {
  padding-top: 90px;
  padding-left: 20px;
}
.user {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 400px;
  min-height: 350px;
  align-items: center;
  gap: 20px;
}

.user-infos-container {
  display: flex;
  position: relative;
}

.commented-posts {
  position: relative;
}

.post-content-user-id {
  width: 95%;
  height: 100%;
  object-fit: cover;
  padding-bottom: 20px;
  border-radius: 20px;
}

.posts-written {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 700px;
  object-fit: cover;
  text-align: center;
  position: relative;
  left: 700px;
  bottom: 310px;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 20px;
}

.commented-posts {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 700px;
  object-fit: cover;
  text-align: center;
  position: absolute;
  left: 700px;
  bottom: 245px;
  align-items: center;
  border-radius: 20px;
}

.posts-user-id-none {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 400px;
  object-fit: cover;
  text-align: center;
  position: absolute;
  left: 830px;
  bottom: 325px;
  align-items: center;
  border-radius: 20px;
}

.comments-user-id-none {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 400px;
  object-fit: cover;
  text-align: center;
  position: absolute;
  left: 830px;
  bottom: 25px;
  align-items: center;
  border-radius: 20px;
}
</style>
