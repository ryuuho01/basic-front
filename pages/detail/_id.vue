<template>
  <div class="container">

　<validation-observer ref="obs" v-slot="ObserverProps">
    <form class="reservation" action="http://127.0.0.1:8000/api/reservation/" method="POST" @submit="date_check">
      <h2>予約</h2>
      <input type="text" v-model="userId" name="user_id" hidden>
      <input type="text" v-model="shopId" name="shop_id" hidden>
      <div class="date">
        <input v-model="reservationDate" type="date" name="reservation_date" id="reservation_date">
      </div>
      <validation-provider v-slot="ProviderProps" rules="custom_rule:時間">
        <div class="select01">
          <select v-model="reservationTime" class="select" name="reservation_time">
            <option hidden>時間</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
            <option>16:00</option>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
          </select>
        </div>
        <div class="error">{{ ProviderProps.errors[0] }}</div>
      </validation-provider>
      <validation-provider v-slot="ProviderProps" rules="custom_rule:人数">
        <div class="select02">
          <select v-model="numMembers" class="select" name="num_members">
            <option hidden>人数</option>
            <option>1人</option>
            <option>2人</option>
            <option>3人</option>
            <option>4人</option>
            <option>5人</option>
            <option>6人</option>
            <option>7人</option>
            <option>8人</option>
            <option>9人</option>
            <option>10人</option>
            <option>11人</option>
            <option>12人</option>
            <option>13人</option>
            <option>14人</option>
            <option>15人</option>
            <option>16人</option>
            <option>17人</option>
            <option>18人</option>
            <option>19人</option>
            <option>20人</option>
          </select>
        </div>
        <div class="error">{{ ProviderProps.errors[0] }}</div>
      </validation-provider>
      <div class="table-padding">
        <table>
          <tr>
            <th>Shop</th>
            <td>{{shopCurrent.shop_name}}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td>{{reservationDate}}</td>
          </tr>
          <tr>
            <th>Time</th>
            <td>{{reservationTime}}</td>
          </tr>
          <tr>
            <th>Number</th>
            <td>{{numMembers}}</td>
          </tr>
        </table>
      </div>
      <div class="button">
        <input :disabled="ObserverProps.invalid || !ObserverProps.validated" value="予約する" type="submit" @click="login_check">
      </div>
    </form>
　</validation-observer>

    <div class="shopcard">
      <div class="flex">
        <div class="back-button" @click="back">
          <p>&lt;</p>
        </div>
        <h2>{{shopCurrent.shop_name}}</h2>
      </div>
      <div class="shop-pic">
        <img :src="shopCurrent.pic_path" alt="画像">
      </div>

      <div class="shop-des">
        <p>
            <span>#{{shopCurrent.area_name}} </span>
            <span>#{{shopCurrent.genre_name}} </span>
        </p>
        <p>{{shopCurrent.description}}</p>
      </div>

    </div>

  </div>
    

</template>

<script>
import firebase from '~/plugins/firebase'
import axios from "axios";

export default {
    data() {
      return {
        shopCurrent: "",
        shopId: this.$route.params.id,
        userId: null,
        reservationDate: this.today_set(),
        reservationTime: "時間",
        numMembers: "人数",
      }

    },
    async created() {
      const userresData = await this.$axios.get("http://127.0.0.1:8000/api/user/");
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const email = user.email;
          let userId = 0;
          for(let i=0; i < userresData.data.data.length; i++) {
            if(userresData.data.data[i]["email"] == email) {
              userId = userresData.data.data[i]["id"];
            };
          }
          this.userId = userId;
        }
      })
    },

    async mounted() {
      await axios
        .get("http://127.0.0.1:8000/api/shop/"+this.$route.params.id)
        .then((response) => (this.shopCurrent = response.data.data));
    },

    methods: {
      back() {
        this.$router.replace('/');
      },

      today_set() {
        var today = new Date();
        today.setDate(today.getDate());
        var yyyy = today.getFullYear();
        var mm = ("0"+(today.getMonth()+1)).slice(-2);
        var dd = ("0"+today.getDate()).slice(-2);
        return yyyy+'-'+mm+'-'+dd;
      },

      date_check(event) {
        if(document.getElementById("reservation_date").value === '') {
          alert("日付を選択して下さい");
          event.preventDefault()
        }
      },

      login_check(event) {
        const user = firebase.auth().currentUser;
        if(user === null) {
          this.$router.replace('/login')
          event.preventDefault()
        }
      },
    }
}
</script>


<style scoped>
.container {
  position: relative;
}

.reservation {
  position: absolute;
  top: -68px;
  right: 7%;
  width: 40%;
  height: 600px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  color: white;
}

h2 {
  width: 90%;
  margin: 30px auto;
  font-size: 20px;
}
.date {
  margin-left: 22px;
}
.date input {
  border-radius: 5px;
  padding: 2px 10px;
  cursor: pointer;
}
.select01 {
  width: 100%;
  margin-top: 10px;
  margin-left: 22px;
}
.select01 select{
  width: 90%;
  border-radius: 5px;
  padding: 3px 5px;
  cursor: pointer;
}
.select02 {
  width: 100%;
  margin-top: 10px;
  margin-left: 22px;
}
.select02 select{
  width: 90%;
  border-radius: 5px;
  padding: 3px 5px;
  cursor: pointer;
}
.table-padding {
  width: 82%;
  padding: 20px;
  border-radius: 5px;
  background-color: rgb(77, 127, 255);
  margin: 15px auto;
}
.reservation table {
  width: 100%;
  text-align: left;
}
.reservation table tr {
  height: 25px;
}
.reservation table th {
  font-size: 12px;
  font-weight: initial;
  width: 80px;
  vertical-align: middle;
}
.reservation table td {
  font-size: 12px;
  vertical-align: middle;
}

.button {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.button input {
  width: 100%;
  border: none;
  color: white;
  background-color: rgb(31, 56, 255);
  padding: 10px 0;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
}
.button input:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.button input:disabled {
  background: rgb(159, 179, 255);
  color: rgb(255, 255, 255);
  opacity: 1;
  cursor: unset;
}

.error {
  color: rgb(255, 0, 115);
  padding-top: 5px;
  margin-left: 25px;
}

</style>

<style scoped>

.shopcard {
  width: 40%;
  height: auto;
  margin: 0 80px;
}
.flex {
  display: flex;
  margin: 50px 0 30px 0;
}
.flex h2 {
  display: flex;
  margin: auto;
  height: 30px;
  align-items: center;
  font-size: 24px;

}
.back-button {
  background-color: white;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.back-button p {
  transform: translate(0, -2px);
}


.shop-pic {
  height: auto;
}
.shop-pic img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.shop-des {
  width: 100%;
  height: 110px;
}
.shop-des h2 {
  padding: 15px 0 0 15px;
}
.shop-des p:first-child {
  padding: 20px 0px;
}
.shop-des p {
  font-size: 14px;
  line-height: 20px;
}
</style>