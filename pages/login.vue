<template>
  <validation-observer ref="obs" v-slot="ObserverProps">
    <div class="login-window">
      <div class="login-ttl">
        <p>Login</p>
      </div>

      <validation-provider v-slot="ProviderProps" rules="required">
        <div class="login login01">
          <input v-model="email" type="email" placeholder="Email" name="メールアドレス" required />
        </div>
        <div class="error">{{ ProviderProps.errors[0] }}</div>
      </validation-provider>

      <validation-provider v-slot="ProviderProps" rules="required">
        <div class="login login02">
          <input v-model="password" type="password" placeholder="Password" name="パスワード" required />
        </div>
        <div class="error">{{ ProviderProps.errors[0] }}</div>
      </validation-provider>

      <div class="button">
        <button class="login-button" @click="login" :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
      </div>
    </div>
  </validation-observer>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          this.$router.replace('/')
        })
    },
  },
}
</script>

<style scoped>

.login-window {
  background: white;
  width: 350px;
  margin: 120px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.login-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.login-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}

.login {
  margin: 18px 30px 0 50px;
}
.login01::before {
  content: "";
  background: url("~static/mail.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 75px;
  left: 20px;
}
.login02::before {
  content: "";
  background: url("~static/lock.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 60%;
  left: 20px;
}
.login input {
  width: 100%;
  height: 30px;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid black;
}

.button {
  text-align: right;
}
.login-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.login-button {
  background: rgb(48, 93, 255);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  margin: 15px 25px 15px 0;
}
.error {
  color: red;
  padding-top: 5px;
  margin-left: 50px;
}
</style>