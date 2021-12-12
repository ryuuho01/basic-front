<template>
  <div>
    <div class="headcontainer">
      <div class="search">
        <div class="select01">
          <select v-model="vModelarea" name="area_name" id="select01">
            <option>All area</option>
            <option v-for="item in areaCurrent" :key="item.id">{{item.area_name}}</option>
          </select>
        </div>
        <div class="separation"></div>
        <div class="select02">
          <select v-model="vModelgenre" class="select" name="genre_name" id="select02">
            <option>All genre</option>
            <option v-for="item in genreCurrent" :key="item.id">{{item.genre_name}}</option>
          </select>
        </div>
        <div class="separation"></div>
        <div class="input">
          <input v-model="vModelkeyword" placeholder="Search..." type="text">
        </div>
      </div>
    </div>

    <div class="shopcards">

      <div class="shopcard" v-for="item in filteredShopcards" :key="item.id">

        <div class="shop-pic">
          <img :src="item.pic_path" alt="画像">
        </div>

        <div class="shop-des" >
          <h2>{{item.shop_name}}</h2>
          <p>
            <span>#{{item.area_name}} </span>
            <span>#{{item.genre_name}} </span>
          </p>
          <div class="flex">
            <button @click="detail(item.id)">詳しくみる</button>
              <img v-if="item.favorites == 1" @click="deleteFavorite(item.id)" src="/heart2.png" alt="画像">
              <img v-else @click="addFavorite(item.id)" src="/heart1.png" alt="画像">
          </div>
        </div>

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
        userId: null,
        shopCurrent: null,
        areaCurrent: null,
        genreCurrent: null,
        vModelarea: "All area",
        vModelgenre: "All genre",
        vModelkeyword: "",
        }
    },
    
    async created() {
      const userresData = await this.$axios.get("https://afternoon-beyond-97179.herokuapp.com/api/user");
      await axios
        .get("https://afternoon-beyond-97179.herokuapp.com/api/shop")
        .then((response) => (this.shopCurrent = response.data.data));

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

          for(let i=0; i < this.shopCurrent.length; i++) {
            let count = 0;
            for(let j=0; j < this.shopCurrent[i]["favorites"].length; j++) {
              if(this.shopCurrent[i]["favorites"][j]["user_id"] == this.userId && this.shopCurrent[i]["favorites"][j]["favorite"] == 1) {
                count++;
              }
            }
            if(count != 0){
              this.shopCurrent[i]["favorites"] = 1;
            } else {
              this.shopCurrent[i]["favorites"] = 0;
            }
          }
        }
      })
    },

    async mounted() {
      axios
      .get("https://afternoon-beyond-97179.herokuapp.com/api/area")
      .then((response) => (this.areaCurrent = response.data.data));
      axios
      .get("https://afternoon-beyond-97179.herokuapp.com/api/genre")
      .then((response) => (this.genreCurrent = response.data.data));
    },

    computed: {
      filteredShopcards:function() {
        return this.filterShopcards();
      },
    },

    methods: {

        async getInfo() {
          const userresData = await this.$axios.get("https://afternoon-beyond-97179.herokuapp.com/api/user");
          await axios
            .get("https://afternoon-beyond-97179.herokuapp.com/api/shop")
            .then((response) => (this.shopCurrent = response.data.data));

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

              for(let i=0; i < this.shopCurrent.length; i++) {
                let count = 0;
                for(let j=0; j < this.shopCurrent[i]["favorites"].length; j++) {
                  if(this.shopCurrent[i]["favorites"][j]["user_id"] == this.userId && this.shopCurrent[i]["favorites"][j]["favorite"] == 1) {
                    count++;
                  }
                }
                if(count != 0){
                  this.shopCurrent[i]["favorites"] = 1;
                } else {
                  this.shopCurrent[i]["favorites"] = 0;
                }
              }
            }
          })
        },

        addFavorite: async function(item_id) {
          const user = firebase.auth().currentUser;
          if(user !== null) {
          const favoriteData = {
            user_id: this.userId,
            shop_id: item_id,
            favorite: true,
          }
          await axios
            .post("https://afternoon-beyond-97179.herokuapp.com/api/favorite",favoriteData);

          this.getInfo();

          } else {
            this.$router.replace('/login')
          };
        },

        deleteFavorite: async function(item_id) {

          let favoriteId = 0;
          const favoriteresData = await this.$axios.get("https://afternoon-beyond-97179.herokuapp.com/api/favorite");
          for(let i=0; i < favoriteresData.data.data.length; i++) {
            if(favoriteresData.data.data[i]["user_id"] == this.userId && favoriteresData.data.data[i]["shop_id"] == item_id) {
              favoriteId = favoriteresData.data.data[i]["id"];
              break
            };
          }
          const deletepath = "https://afternoon-beyond-97179.herokuapp.com/api/favorite/"+favoriteId;
          await axios
          .delete(deletepath);

          this.getInfo();
        },

        filterShopcards() {
          if (this.vModelarea == "All area" && this.vModelgenre == "All genre" && this.vModelkeyword == "") {
            return this.shopCurrent
          } else if(this.vModelarea != "All area" && this.vModelgenre == "All genre" && this.vModelkeyword == "") {
            let filtered = [];
            for (let i in this.shopCurrent) {
              let shopcard = this.shopCurrent[i];
              if (shopcard.area_name.indexOf(this.vModelarea) !== -1) {
                  filtered.push(shopcard);
              }
            }
            return filtered;
          } else if(this.vModelgenre != "All genre" && this.vModelarea == "All area" && this.vModelkeyword == "") {
            let filtered = [];
            for (let i in this.shopCurrent) {
              let shopcard = this.shopCurrent[i];
              if (shopcard.genre_name.indexOf(this.vModelgenre) !== -1) {
                  filtered.push(shopcard);
              }
            }
            return filtered;
          } else if(this.vModelkeyword != "" && this.vModelarea == "All area" && this.vModelgenre == "All genre") {
            let filtered = [];
            for (let i in this.shopCurrent) {
              let shopcard = this.shopCurrent[i];
              if (shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
                  filtered.push(shopcard);
              }
            }
            return filtered;
          } else if(this.vModelarea != "All area" && this.vModelgenre != "All genre" && this.vModelkeyword == "") {
            let filtered = [];
            for (let i in this.shopCurrent) {
              let shopcard = this.shopCurrent[i];
              if (shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.genre_name.indexOf(this.vModelgenre) !== -1) {
                  filtered.push(shopcard);
              }
            }
            return filtered;
          } else if(this.vModelarea != "All area" && this.vModelkeyword != "" && this.vModelgenre == "All genre") {
            let filtered = [];
            for (let i in this.shopCurrent) {
              let shopcard = this.shopCurrent[i];
              if (shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
                  filtered.push(shopcard);
              }
            }
            return filtered;
          } else if(this.vModelarea != "All genre" && this.vModelkeyword != "" && this.vModelarea == "All area") {
            let filtered = [];
            for (let i in this.shopCurrent) {
              let shopcard = this.shopCurrent[i];
              if (shopcard.genre_name.indexOf(this.vModelgenre) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
                  filtered.push(shopcard);
              }
            }
            return filtered;
          } else if(this.vModelarea != "All genre" && this.vModelarea != "All area" && this.vModelkeyword != "") {
            let filtered = [];
            for (let i in this.shopCurrent) {
              let shopcard = this.shopCurrent[i];
              if (shopcard.area_name.indexOf(this.vModelarea) !== -1 && shopcard.genre_name.indexOf(this.vModelgenre) !== -1 && shopcard.shop_name.indexOf(this.vModelkeyword) !== -1) {
                  filtered.push(shopcard);
              }
            }
            return filtered;
          }
        },

        detail: function(item_id) {
          this.$router.replace('/detail/'+item_id);
        }
    },
}
</script>


<style scoped>
.headcontainer {
  position: relative;
}
.search {
  position: absolute;
  top: -68px;
  right: 0px;
  background-color: white;
  width: 530px;
  height: 40px;
  margin: 0 80px 0 auto;
  text-align: left;
  display: flex;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  border-radius: 5px;
}

.separation {
  height: 25px;
  width: 2px;
  background-color: rgb(240, 240, 240);
  margin: auto 5px;
}
.search #select01 {
  display: inline-block;
  width: 85px;
  height: 40px;
  border-radius: 5px 0 0 5px;
  border: none;
  background-color: white;
  padding-left: 10px;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  position: relative;
}
select {
  background-image: url("~static/direction.png");
  background-position: right 1px center;
  background-repeat: no-repeat;
  background-size: 12px 12px;
}

.search #select02 {
  display: inline-block;
  width: 85px;
  height: 40px;
  border: none;
  background-color: white;
  padding-left: 10px;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

select::-ms-expand {
  display: none;
}
.search input {
  display: inline-block;
  width: 300px;
  height: 38px;
  border-radius: 0 5px 5px 0;
  border: none;
  background-color: white;
  padding-left: 35px;
  cursor: pointer;
}
.input input{
  background-image: url("~static/search.png");
  background-position: left 4px center;
  background-repeat: no-repeat;
  background-size: 18px 18px;
}

</style>

<style scoped>
.shopcards {
  margin: 0 70px 0 80px;
  display: flex;
  flex-wrap: wrap;
}
.shopcard {
  width: 262.5px;
  height: 245px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgb(171, 171, 171);
  margin-right: 10px;
  margin-bottom: 20px;
}
.shop-pic {
  height: 135px;
  border-radius: 5px 5px 0 0;
}
.shop-pic img {
  width: 100%;
  height: 135px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}
.shop-des {
  width: 260px;
  height: 110px;
}
.shop-des h2 {
  padding: 15px 0 0 15px;
}
.shop-des p {
  padding: 5px 15px;
  font-size: 11px;
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
  padding: 10px 15px;
}
.flex img{
  height: 27px;
  width: 27px;
  cursor: pointer;
}
</style>