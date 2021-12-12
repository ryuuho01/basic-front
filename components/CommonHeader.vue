<template>
  <header>
    <nav class="nav" id="nav">
      <ul>
        <li @click="menuOpen" class="menu-item">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item" v-if=" userEmail == null ">
          <NuxtLink to="/register">Registration</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item" v-if=" userEmail == null ">
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
        <li @click="menuOpen(); logout()" class="menu-item" v-if=" userEmail != null ">
          <NuxtLink to="#">Logout</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item" v-if=" userEmail != null ">
          <NuxtLink to="/mypage">Mypage</NuxtLink>
        </li>
        <li @click="menuOpen" class="menu-item">
          <NuxtLink to="/manage" id="manage">Management</NuxtLink>
        </li>
      </ul>
    </nav>
    <div @click="menuOpen" class="menu-button" id="menu">
      <span class="menu_line-top"></span>
      <span class="menu_line-middle"></span>
      <span class="menu_line-bottom"></span>
    </div>
  </header>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      userEmail: null,
    }
  },
  created() {
    this.getloginInfo();
  },
  methods: {
    getloginInfo() {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("sign in");
          this.userEmail = user.email;
        } else {
          console.log("sign out");
          this.userEmail = null;
        }
      });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトが完了しました')
          window.location.href = "https://infinite-plateau-76316.herokuapp.com";
        })
    },
    menuOpen() {
      const target = document.getElementById("menu");
      const nav = document.getElementById("nav");
      target.classList.toggle('open');
      nav.classList.toggle('in');
    },
  },
};
</script>

<style scoped>

header {
  margin: 30px 80px;
  display: flex;
  align-items: center;
}

.nav {
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: -100%;
  margin-right: 80px;
  background-color: rgb(238, 238, 238);
  transition: 0s;
  text-align: center;
}

.nav.in{
  transform: translateX(100%);
  transition: 0.5s;
  z-index: 1000;
}

.nav ul{
  padding-top: 200px;
  
  font-size: 25px;
}
.nav ul li a{
  margin-top: 50px;
  color: blue;
  text-decoration: none;
}

/* ハンバーガーメニュー */
.menu-button {
  display: inline-block;
  cursor: pointer;
  position: relative;
  height: 35px;
  width: 35px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px;
  margin-right: 20px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  z-index: 1001;
}
.menu_line-top,
.menu_line-middle,
.menu_line-bottom {
  display: inline-block;

  height: 1px;
  background-color: white;
  position: absolute;
  transition: 0s;
  left: 7px;
}
.menu_line-top {
  width: 12px;
  top: 10px;
}
.menu_line-middle {
  width: 19px;
  top: 17px;
}
.menu_line-bottom {
  width: 7px;
  top:24px;
}
.menu-button.open span:nth-of-type(1) {
  width: 20px;
  top: 16px;
  transform: rotate(45deg);
  transition: 0.3s;
}
.menu-button.open span:nth-of-type(2) {
  opacity: 0;
  transition: 0.3s;
}
.menu-button.open span:nth-of-type(3) {
  width: 20px;
  top: 16px;
  transform: rotate(-45deg);
  transition: 0.3s;
}

/* メニュー */
.menu-item {
  padding: 10px 0;
}

/* サイトタイトル */
.header-ttl {
  text-decoration: none;
  font-size: 25px;
  color: rgb(48, 93, 255);
}



#manage{
  color: rgb(238, 238, 238);
}
</style>