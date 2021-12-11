<template>
  <div class="mypage-container">
  <!------------ left side ------------>
    <div class="left-side">
      <h2>予約状況</h2>
      <div v-for="(item, index) in reservationsCurrent" :key="item.id" class="reservation">
        <p>予約{{index+1}}</p>
        <div class="time-pic">
          <img src="/time.png" alt="画像">
        </div>
        <div class="close-pic">
          <img @click="destroy(item.id)" src="/close.png" alt="画像">
        </div>
        <table>
          <tr>
            <th>Shop</th>
            <td>{{item.shop_name}}</td>
          </tr>
          <tr>
            <th>Date</th>
            <td v-for="obj in item.reservations" :key="obj.id">{{obj.reservation_date.replace(obj.reservation_date.slice(-9),'')}}</td>
          </tr>
          <tr>
            <th>Time</th>
            <td v-for="obj in item.reservations" :key="obj.id">{{obj.reservation_date.slice(-9).slice(0,6)}}</td>
          </tr>
          <tr>
            <th>Number</th>
            <td v-for="obj in item.reservations" :key="obj.id">{{obj.num_members}}人</td>
          </tr>
        </table>
      </div>
    </div>
    <!------------ right side ------------>
    <div class="right-side">
      <h2>{{userName}}さん</h2>
      <p>お気に入り店舗</p>

      <div class="shopcards">

        <div v-for="item in favoriteCurrent" :key="item.id" class="shopcard">

          <div class="shop-pic">
            <img :src="item.pic_path" alt="画像">
          </div>

          <div class="shop-des">
            <h2>{{item.shop_name}}</h2>
            <p>
              <span>#{{item.area_name}} </span>
              <span>#{{item.genre_name}} </span>
            </p>
            <div class="flex">
              <button @click="detail(item.id)">詳しくみる</button>
              <div>
                <img v-if="item.favorites == 1" @click="favorite(item.id)" src="/heart2.png" alt="画像">
                <img v-else @click="favorite(item.id)" src="/heart1.png" alt="画像">
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import axios from "axios"
export default {
    data() {
        return {
        userId: null,
        userName: null,
        shopCurrent: null,
        reservationsCurrent: null,
        favoriteCurrent: null,
        }
    },

    async created() {
      const userresData = await this.$axios.get("http://127.0.0.1:8000/api/user/");
      await axios
        .get("http://127.0.0.1:8000/api/shop/")
        .then((response) => (this.shopCurrent = response.data.data));

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const email = user.email;
          let userId = 0;
          let userName = "";
          for(let i=0; i < userresData.data.data.length; i++) {
            if(userresData.data.data[i]["email"] == email) {
              userId = userresData.data.data[i]["id"];
              userName = userresData.data.data[i]["name"];
            };
          }
          this.userId = userId;
          this.userName = userName;
　　　　　　// 予約のデータを取得
          let shops = [];
          for(let i=0; i < this.shopCurrent.length; i++) {
            for(let j=0; j < this.shopCurrent[i]["reservations"].length; j++) {
              if(this.shopCurrent[i]["reservations"][j]["user_id"] == this.userId) {
                shops.push(this.shopCurrent[i]);
              }
            }
          }
          this.reservationsCurrent = shops;

　　　　　　// お気に入りデータを取得
          let favorite = [];
          let count = 0;
          for(let i=0; i < this.shopCurrent.length; i++) {
            for(let j=0; j < this.shopCurrent[i]["favorites"].length; j++) {
              if(this.shopCurrent[i]["favorites"][j]["user_id"] == this.userId && this.shopCurrent[i]["favorites"][j]["favorite"] == 1) {
                favorite.push(this.shopCurrent[i]);
                count++;
              }
            }
            if(count != 0){
              this.shopCurrent[i]["favorites"] = 1;
            } else {
              this.shopCurrent[i]["favorites"] = 0;
            }
          }
          this.favoriteCurrent = favorite;
        }
      })
    },

    methods: {
      async getData() {
        await axios
        .get("http://127.0.0.1:8000/api/shop/")
        .then((response) => (this.shopCurrent = response.data.data));
        let shops = [];
        for(let i=0; i < this.shopCurrent.length; i++) {
          for(let j=0; j < this.shopCurrent[i]["reservations"].length; j++) {
            if(this.shopCurrent[i]["reservations"][j]["user_id"] == this.userId) {
              shops.push(this.shopCurrent[i]);
            }
          }
        }
        this.reservationsCurrent = shops;

        let favorite = [];
          let count = 0;
          for(let i=0; i < this.shopCurrent.length; i++) {
            for(let j=0; j < this.shopCurrent[i]["favorites"].length; j++) {
              if(this.shopCurrent[i]["favorites"][j]["user_id"] == this.userId && this.shopCurrent[i]["favorites"][j]["favorite"] == 1) {
                favorite.push(this.shopCurrent[i]);
                count++;
              }
            }
            if(count != 0){
              this.shopCurrent[i]["favorites"] = 1;
            } else {
              this.shopCurrent[i]["favorites"] = 0;
            }
          }
          this.favoriteCurrent = favorite;
      },
      destroy: async function(item_id){
        const reservationresData = await this.$axios.get("http://127.0.0.1:8000/api/reservation/");
        let reservationId = 0;
        for(let i=0; i < reservationresData.data.data.length; i++) {
            if(reservationresData.data.data[i]["user_id"] == this.userId && reservationresData.data.data[i]["shop_id"] == item_id) {
              reservationId = reservationresData.data.data[i]["id"];
            };
          }
        const deletepath = "http://127.0.0.1:8000/api/reservation/"+reservationId;
          await axios
          .delete(deletepath);
          this.getData();
      },

      detail: function(item_id) {
          this.$router.replace('/detail/'+item_id);
      },
      
      favorite: async function(item_id) {
          const user = firebase.auth().currentUser;
          if(user !== null) {
            const favoriteresData = await this.$axios.get("http://127.0.0.1:8000/api/favorite/");

            let currentFavorite = 0;
            let favorite_id = 0;
            for(let i=0; i < favoriteresData.data.data.length; i++) {
              if(favoriteresData.data.data[i]["shop_id"] == item_id && favoriteresData.data.data[i]["user_id"] == this.userId) {
                currentFavorite = favoriteresData.data.data[i]["favorite"];
                favorite_id = favoriteresData.data.data[i]["id"]
              }
            }

            if(currentFavorite == 0) {
              const favoritechangetData = {
                favorite: true,
              }
            await axios
              .put("http://127.0.0.1:8000/api/favorite/"+favorite_id,favoritechangetData);

            } else {
              const favoritechangetData = {
              favorite: false,
            }
            await axios
              .put("http://127.0.0.1:8000/api/favorite/"+favorite_id,favoritechangetData);
            }

          } else {
              this.$router.replace('/login')
          };
          this.getData();
        },
    },
}
</script>


<style scoped>
.mypage-container {
  display: flex;
  margin: 0 105px;
}
.left-side {
  width: 37%;
  margin-right: 80px;
}
.left-side h2 {
  font-size: 20px;
  padding: 30px 0;
  margin-top: 45px;
}
.reservation {
  width: 100%;
  height: 240px;
  background-color: rgb(48, 93, 255);
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  color: white;
  position: relative;
  margin-bottom: 20px;
}
.time-pic {
  background-color: white;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 28px;
  left: 25px;
}
.time-pic img {
  width: 25px;
  height: 25px;
}
.close-pic {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 28px;
  right: 27px;
}
.close-pic img {
  width: 23px;
  height: 23px;
  cursor: pointer;
}
.close-pic img:hover {
  opacity: 0.7;
  transition: 0.3s;
}

.reservation p {
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 12px;
  height: 80px;
  padding-left: 75px;
}

.reservation table {
  width: 100%;
  text-align: left;
}
.reservation table tr {
  height: 32px;
}
.reservation table th {
  font-size: 12px;
  font-weight: normal;
  width: 80px;
  vertical-align: middle;
  padding-left: 25px;
}
.reservation table td {
  font-size: 12px;
  vertical-align: middle;
}
</style>

<style scoped>
.right-side {
  width: 55%;
}
.right-side h2 {
  font-size: 25px;
  padding: 10px 0;
}
.right-side p {
  padding: 30px 0;
  font-size: 20px;
  font-weight: bold;
}

.shopcards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
}
.shopcard {
  width: 260px;
  height: 245px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  margin-bottom: 20px;
}
.shop-pic {
  height: 130px;
  border-radius: 5px 5px 0 0;
}
.shop-pic img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}
.shop-des {
  width: 270px;
  height: 110px;
}
.shop-des h2 {
  padding: 15px 0 0 20px;
  font-size: 15px;
}
.shop-des p {
  padding: 7px 20px;
  font-size: 12px;
}
.shop-des button {
  border-radius: 5px;
  border: none;
  background-color: rgb(48, 93, 255);
  color: white;
  padding: 5px 13px;
  cursor: pointer;
  font-size: 12px;
}
.shop-des button:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
.flex div img{
  height: 27px;
  width: 27px;
  margin-right: 10px;
  cursor: pointer;
}
</style>