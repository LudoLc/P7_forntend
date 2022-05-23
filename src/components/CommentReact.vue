<script>
export default {
  data() {
    return {
      content: "",
      user: this.$store.state.connectedUser,
      showComments: false,
      comment: [],
      images: null,
      PostId: null,
    };
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    reactions: {
      type: Array,
      required: false,
    }
  },
  methods: {
    toggleComments(){
      this.showComments = !this.showComments
    },
    async sendComment() {
      const deliverMessage = {
        content: this.content,
        PostId: this.postId,
      };
      const res = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        body: JSON.stringify(deliverMessage),
        headers: {
          Authorization: "Bearer " + this.$store.state.saveToken,
          "Content-Type": "application/json",
        },
      });
      const message = await res.json();
      this.message = message;
      this.$emit('refreshComments');
    },
    toggleOptions(index) {
      this.comments[index].displayOptions = !this.comments[index].displayOptions;
    },
    toggleEditComment(index){
      this.comments[index].displayEdit = !this.comments[index].displayEdit;
      this.comments[index].displayOptions = false;
    },
    async submitCommentEdit(index){
      const comment = this.comments[index];
      const res = await fetch("http://localhost:3000/api/comments/" +comment.id, {
        method: "PUT",
        body: JSON.stringify(comment),
        headers: {
          Authorization: "Bearer " + this.$store.state.saveToken,
          "Content-Type": "application/json",
        },
      });
      this.$emit('refreshComments');
    },
    async deleteComment(index){
      const comment = this.comments[index];
      const res = await fetch("http://localhost:3000/api/comments/" +comment.id, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + this.$store.state.saveToken
        },
      });
      this.$emit('refreshComments');
    },
    async sendReaction(type){
      const reaction = {
        type,
        PostId: this.postId,
      }
      const res = await fetch("http://localhost:3000/api/reactions", {
        method: "POST",
        body: JSON.stringify(reaction),
        headers: {
          Authorization: "Bearer " + this.$store.state.saveToken,
          "Content-Type": "application/json",
        },
      });
      const reactions = await res.json();
      if(reactions.isWarning == true)
      alert (reactions.message)
      this.$emit('refreshComments');
    },
    async sendLike(){
      await this.sendReaction(1);
      this.$emit('refreshComments');
    },
    async sendDislike(){
      await this.sendReaction(0);
      this.$emit('refreshComments');
    }
  },
};
</script>

<template>
  <div class="comment-section">
    <div class="react-message">
      <div>
        <img
          @click="toggleComments"
          class="comment-img"
          src="../assets/comment_white.png"
          alt="comment-message"
        />
        <span class="span-color">Commentaires</span>
      </div>
      <div>
        <img @click="sendLike" class="like-img" :class="{active: reactions.find(e => e.UserId === $store.state.connectedUser.id)}" src="../assets/like_white.png" alt="like" />
        <span class="span-color">Like</span>
        {{ reactions.filter(e => e.type === 1).length}}
        <img @click="sendDislike" class="like-img" :class="{active: reactions.find(e => e.UserId === $store.state.connectedUser.id)}" src="../assets/dislike_white.png" alt="like" />
        <span class="span-color">Dislike</span>
        {{ reactions.filter(e => e.type === 0).length}}
      </div>
    </div>
    <input aria-label="reply-zone" v-model="content" class="reply-area" placeholder="Ecrivez votre commentaire...."/>
    <ul v-if="showComments" class="comment-list">
      <li class="replyy" v-for="(comment, index) in comments" :key="comment">
        <div class="user-reply-info">
          <div class="user-infos">
            <router-link :to="{name: 'user', params: {userId: comment.User.id}}"><img class="comment-logo" :src="comment.User?.avatar" alt="logo-user"/></router-link>
            <router-link class="name-container" :to="{name: 'user', params: {userId: comment.User.id}}">
              <span class="span-color">{{ comment.User.firstname }}</span> 
              <span class="span-color">{{ comment.User.username }}</span>
            </router-link>
            <span class="span-color">{{ new Date(comment.updatedAt).toLocaleString() }}</span>
          </div>
          <form class="comment-content-area" v-if="comment.displayEdit" @submit.prevent="submitCommentEdit(index)">
            <textarea v-model="comment.content" ></textarea>
            <button aria-label="input-modified" class="input-modified-comment" type="submit"></button>
          </form>
          <p class="span-color" v-else>{{ comment.content }}</p>
        </div>
        <img
          @click="toggleOptions(index)"
          class="dots"
          src="../assets/tripledot_white.png"
          alt="toggleOptions"
        />
        <ul v-if="comment.displayOptions" class="dots-modifications-ul">
          <li @click="toggleEditComment(index)" class="dots-modifications-li">Modifier le commentaire</li>
          <li @click="deleteComment(index)" class="dots-delete-comment">Supprimer le commentaire</li>
        </ul>
      </li>
    </ul>
    <div class="comment-button">
      <button aria-label="form" @click="sendComment" class="button-comment" type="button">
        Commenter!
      </button>
    </div>
  </div>
</template>

<style>
.react-message {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 10px;
  padding-top: 10px;
  align-items: center;
}

.user-infos{
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

.user-infos .name-container {
  flex-grow: 1;
  color: white;
  text-decoration: none;
}
.comment-img {
  cursor: pointer;
  height: 30px;
  width: 30px;
}

.comment-logo {
  object-fit: cover;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.reply-section {
  display: flex;
  width: 100%;
}

.reply-area {
  padding-left: 10px;
  margin-bottom: 10px;
  height: 40px;
  background-color: white;
  color: black;
}

.replyy {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  position: relative;
}

.user-reply-info {
  background-color: #bebaba;
  width: auto;
  padding: 5px;
  border-radius: 10px;
  width: 100%;
}

.user-reply-info p {
  word-break: break-all;
}

.comment-button {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.button-comment {
  cursor: pointer;
  height: 40px;
  width: 120px;
  border-radius: 25px;
  margin: 10px;
}

.comment-content-area{
  width: 100%;
}

.input-modified-comment {
  float: right;
}

.dots {
  height: 15px;
  cursor: pointer;
}

.dots:hover {
  border-radius: 100%;
}

.dots-modifications-ul {
  z-index: 1;
  position: absolute;
  top: 60px;
  right: -100px;
  display: flex;
  flex-direction: column;
  height: 80px;
  background-color: #635f68;
  border-radius: 20px;
  justify-content: center;
  gap: 10px;
  width: 45%;
  margin-top: 10px;
}

.dots-modifications-li {
  cursor: pointer;
  padding-left: 20px;

}

.dots-modifications-li:hover {
  color: #040404;
}

.dots-delete-comment:hover {
  color: #040404;
}

.dots-delete-comment {
  cursor: pointer;
  padding-left: 20px;

}

.like-img {
  cursor: pointer;
  height: 20px;
  width: 20px;
  color: #040404;
}


.like-img.active{
  fill: #f55555;
}

.profile-picture-reply {
  border-radius: 100%;
  height: 30px;
  width: 30px;
}
.share-img {
  height: 20px;
}

ul {
  list-style-type: none;
}
</style>
