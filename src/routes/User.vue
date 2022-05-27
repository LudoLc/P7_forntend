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
      const res = await fetch("http://localhost:3000/api/users/" + userId, {
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
      user.Comments = [];
      this.user = user;
    },
  },
};
</script>

<template>
  <div class="main-container-user">
    <div class="user">
      <img
        v-if="user.avatar"
        class="logo-user-info"
        :src="user.avatar"
        alt="info-user"
      />
      <p class="user-infos">Nom: {{ user.username }}</p>
      <p class="user-infos">Prénom: {{ user.firstname }}</p>
      <p class="user-infos">Contact: {{ user.email }}</p>
      <p class="user-infos">Description: {{ user.description }}</p>
      <p class="user-infos">
        Crée le: {{ new Date(user.createdAt).toLocaleString() }}
      </p>
    </div>
    <div class="post-listing">
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
    </div>
  </div>
</template>

<style>
.main-container-user {
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;
}
.pre-user-info {
  padding-top: 90px;
  padding-left: 20px;
}
.user {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 400px;
  max-height: 350px;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  margin: 20px;
}

.user-infos-container {
  display: flex;
  position: relative;
}

.commented-posts {
  position: relative;
}

.post-listing {
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.post-content-user-id {
  width: 400px;
  height: 100%;
  object-fit: cover;
  padding-bottom: 20px;
}

.posts-written {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 500px;
  object-fit: cover;
  text-align: center;
  align-items: center;
  border-radius: 20px;
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

.warning-img {
  width: 400px;
  height: 400px;
}

.posts-user-id-none {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 500px;
  object-fit: cover;
  text-align: center;
  align-items: center;
  border-radius: 20px;
}

.comments-user-id-none {
  display: flex;
  flex-direction: column;
  background-color: #091f43;
  width: 500px;
  object-fit: cover;
  text-align: center;
  align-items: center;
  border-radius: 20px;
}

@media screen and (max-width: 500px) {
  .post-listing {
    max-width: 300px;
    width: 100%;
  }

  .post-content-user-id {
    max-width: 300px;
  }
}
</style>
