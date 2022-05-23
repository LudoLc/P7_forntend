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
      posts: [],
      user: [],
      content: "",
      image: null,
    };
  },
  created() {
    this.loadPosts();
  },
  methods: {
    async loadPosts() {
      const res = await fetch("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + this.$store.state.saveToken,
        },
      });
      const posts = await res.json();
      this.posts = posts.map((post) => {
        return {
          ...post,
          displayModifyPost: false,
          displayPost: false,
          Comments: post.Comments.map((comment) => ({
            ...comment,
            displayOptions: false,
            displayEdit: false,
          })),
        };
      });
    },
    async deletePost(post) {
      const wantContinue = window.confirm(
        "Voulez-vous vraiment supprimer ce poste?!"
      );
      if (!wantContinue) return;
      const res = await fetch("http://localhost:3000/api/posts/" + post.id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + this.$store.state.saveToken,
        },
      }).then(() => {
        this.loadPosts();
      });
    },
    sendFile(e) {
      this.image = e.target.files[0];
    },
    async createPost() {
      if (this.image !== null) {
        const formData = new FormData();
        formData.append("image", this.image);
        if (this.content) formData.append("content", this.content);
        const headers = new Headers({
          Authorization: "Bearer " + this.$store.state.saveToken,
        });
        const res = await fetch("http://localhost:3000/api/posts/", {
          method: "POST",
          body: formData,
          headers,
        });
        this.content = "";
        this.image = null ;
        this.loadPosts();
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.saveToken,
      };
      const res = await fetch("http://localhost:3000/api/posts/", {
        method: "POST",
        headers,
        body: JSON.stringify({ content: this.content }),
      });
      this.content = "";
      this.loadPosts();
    },
    togglePost(index){
      this.posts[index].displayPost = !this.posts[index].displayPost;
    },
    toggleModifyPost(index){
      this.posts[index].displayModifyPost = !this.posts[index].displayModifyPost;
      this.posts[index].displayPost = false;
    },
    async submitPostEdit(index){
      const post = this.posts[index];
      if (this.images !== null) {
        const formData = new FormData();
        formData.append("image", this.image);
        if (post.content) formData.append("content", post.content);
        const headers = new Headers({
          Authorization: "Bearer " + this.$store.state.saveToken,
        });
        const res = await fetch(
          "http://localhost:3000/api/posts/" +
          post.id,
          { method: "PUT",
          body: formData,
          headers }
        );
        this.loadPosts();
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.$store.state.saveToken,
      };
      const res = await fetch(
        "http://localhost:3000/api/posts/" + post.id,
        { method: "PUT", headers, body: JSON.stringify(this.user) }
      );
      this.loadPosts();
    },
  },
};
</script>

<template>
  <div class="main-container">
    <div class="xxx">
      <h1 class="missing-content">Ce que vous avez peut-être raté !</h1>
      <div class="create-post-section">
    <h2 class="post-title">Racontez-nous...</h2>
        <div class="top-post-section">
        <router-link :to="{ name: 'options' }">
          <img class="comment-logo" :src="this.$store.state.connectedUser.avatar" alt="comment"/>
        </router-link>
        <textarea aria-label="textbox" class="" v-model="content" placeholder=" Ecrivez votre poste..."></textarea>
        </div>
        <div class="bottom-post-section">
          <button aria-label="create-box" @click="createPost" class="create-post" type="submit">Créer poste</button>
          <input aria-label="submit-box" @change="sendFile" ref="file" class="submit-file" type="file" value=""/>
        </div>
      </div>
      <div class="comment-section" v-for="(post, index) in posts" :key="post.id">
        <div class="user-comment-section">
        <router-link :to="{ name: 'user', params: {userId: post.UserId} }">
          <img class="comment-logo" :src="post.User?.avatar" alt="logo-avatar"/>
        </router-link>
        <span class="span-color"> {{ post.User?.username }}</span>
        <span class="span-color"> {{ post.User?.firstname }}</span>
        <span class="span-color">{{ new Date(post.createdAt).toLocaleString() }}</span>
        </div>
        <div class="content-post-general">
          <img v-if="this.$store.state.connectedUser.Role?.admin  || $store.state.connectedUser.id === post.UserId" @click="deletePost(post)" class="delete-logo" src="../assets/corbeille_white.png" alt="delete-button"/>
          <img v-if="this.$store.state.connectedUser.Role?.admin  || $store.state.connectedUser.id === post.UserId" @click="toggleModifyPost(index)" class="edit-post" src="../assets/edit.png" alt="toggle-post"/>
          <br />
        </div>
        <div class="content-post-text">
          <form class="comment-content-area" v-if="post.displayModifyPost" @submit.prevent="submitPostEdit(index)">
            <textarea v-model="post.content" ></textarea>
            <input class="input-modified-post" type="submit">
          </form>
          <p class="span-color" v-else>{{ post.content }}</p>
          <input v-if="post.displayModifyPost" @change="sendFile" ref="file" class="submit-file" type="file" value=""/>
          <img v-if="post.media" class="post-content" :src="post.media" alt="media"/>
        </div>
        <CommentReact
          @refreshComments="loadPosts"
          :postId="post.id"
          :comments="post.Comments"
          :reactions="post.Reactions"
        ></CommentReact>
      </div>
    </div>
  </div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
.main-container {
  background-color: #867f7f;
  color: white;
}

.missing-content {
  justify-content: center;
  display: flex;
  width: 550px;
}

.create-post-section {
      min-width: 700px;
    background-color: #091F43;
    display: inline;
    border-radius: 15px;
    padding: 10px;
}

.post-content {
      object-fit: contain;
    height: fit-content;
    width: 100%;
}

.top-post-section {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.bottom-post-section {
  display: flex;
  justify-content: space-between;
}

.create-post {
  cursor: pointer;
  height: 40px;
  width: 120px;
  border-radius: 25px;
  background-color: white;
}

.submit-file {
  border-radius: 15px;
}

.post-title {
  text-align: center;

}

.post-logo {
  padding: 10px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
}

.span-color {
  color: white;

}

p.span-color{
  color: white;

}

.user-comment-section {
      display: flex;
    align-items: center;
}

.xxx {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  gap: 20px;
}

.edit-post {
      padding-top: 5px;
    cursor: pointer;
    margin-top: 10px;
    width: 20px;
    height: 20px;
    position: relative;
    left: 654px;
    top: -50px;
}

.delete-logo {
    cursor: pointer;
    margin-top: 10px;
    width: 20px;
    height: 20px;
    position: relative;
    left: 650px;
    top: -45px;
}


.comment-section {
      display: flex;
    background-color: #091F43;
    flex-direction: column;
    min-width: 725px;
    width: 100%;
    border-radius: 20px;
    padding-top: 10px;
}

.content-post-general {
  display: flex;
  justify-content: flex-start;
}

.content-post-text {
      display: flex;
    flex-direction: column;
    padding: 10px;
    margin: auto;
    word-break: break-all;
}


</style>
