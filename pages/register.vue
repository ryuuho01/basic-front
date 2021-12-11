<template>
  <validation-observer ref="obs" v-slot="ObserverProps">

      <div class="registration-window">
        <div class="register-ttl">
          <p>Registration</p>
        </div>

        <validation-provider v-slot="ProviderProps" rules="required|max:20">
          <div class="register register01">
            <input v-model="name" id="name" type="text" name="ユーザーネーム" placeholder="Username">
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <validation-provider v-slot="ProviderProps" rules="required">
          <div class="register register02">
            <input v-model="email" id="email" type="email" name="メールアドレス" placeholder="Email">
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <validation-provider v-slot="ProviderProps" rules="required|min:6">
          <div class="register register03">
            <input v-model="password" id="password" type="password" name="パスワード" placeholder="Password">
            <span class="field-icon">
              <i toggle="password-field" class="mdi mdi-eye toggle-password"></i>
            </span>
          </div>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>

        <div class="button">
          <button class="register-button" @click="register(); insertUser()" :disabled="ObserverProps.invalid || !ObserverProps.validated">登録</button>
        </div>

      </div>

  </validation-observer>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  auth: false,
  data() {
    return {
      name: null,
      email: null,
      password: null,
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.logout();
            this.$router.replace('/thanks')
          })
        })
    },

    async insertUser() {
      const senduserData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      await this.$axios.post("https://afternoon-beyond-97179.herokuapp.com/user/", senduserData);
    },
  },
}
</script>

<style scoped>

.registration-window {
  background: white;
  width: 350px;
  margin: 120px auto;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  position: relative;
}
.register-ttl {
  height: 50px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px 5px 0 0;
}
.register-ttl p {
  color: white;
  padding: 17px;
  font-size: 14px;
}

.register {
  margin: 18px 30px 0 50px;
}
.register01::before {
  content: "";
  background: url("~static/profile.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 75px;
  left: 20px;
}
.register02::before {
  content: "";
  background: url("~static/mail.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 47%;
  left: 20px;
}
.register03::before {
  content: "";
  background: url("~static/lock.png") no-repeat;
  background-size: cover;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 67%;
  left: 20px;
}

.register input {
  width: 100%;
  height: 30px;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid black;
}

.register-button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.button {
  text-align: right;
}
.register-button {
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
  width: 290px;
}

</style>