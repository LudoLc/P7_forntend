<script>
import Header from "../components/Headercomponent.vue";
import CommentReact from "../components/CommentReact.vue";
export default {
  components: {
    Header,
    CommentReact,
  },
  data(){
    return {
      user: [],
      posts: [],
    }
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      const userId = this.$route.params.userId;
      const res = await fetch("http://localhost:3000/api/users/" +userId);
      const user = await res.json();
      this.user = user;
    },
}
}
</script>

<template>
<div class="main-container">
  <div class="pre-user-info">
    <div class="user" >
      <img v-if="user.avatar" class="logo-user-info" :src="user.avatar">
      <p class="user-infos">{{ user.id }}</p>
      <p class="user-infos">{{ user.firstname }}</p>
      <p class="user-infos">{{ user.username }}</p>
      <p class="user-infos">{{ user.email }}</p>
      <p class="user-infos">{{ user.createdAt }}</p>
    </div>
  </div>
  <div>
    <div v-for="post in user.Posts" class="posts-written" :key="post.id">
      {{ post.content }}
    </div>
    <br>
    <div v-for="comments in user.Comments" class="commented-posts" :key="comments.id">
      {{ comments.content }}
    </div>
  </div>
</div>
</template>

<style>

.pre-user-info{
  padding-top: 60px;
  padding-left: 20px;
}
.user {
  display: flex;
  flex-direction: column;
  background-color: grey;
  width: 300px;
  height: 350px;
  align-items: center;
}


.commented-posts {
  position: relative;
}
</style>