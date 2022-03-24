<template>
  <div class="container">
    <NavBarVue class="nav-bar" />
    <div class="photo">
      <input
        type="file"
        class="file"
        accept="image/*"
        @change="onChange"
        style="font-size: x-large"
      />
      <div class="image-box">
        <img class="preview" :src="item.imageUrl" />
      </div>

      <button style="cursor: pointer" id="upload" @submit.prevent="upload">Upload</button>
    </div>
    <div class="newlogo">
      <img class="image1" src="../assets/EB_Long.png" />
    </div>
    <div class="information-panel">
      <div class="info-grid">
        <img class="image2" src="../assets/big-bully.jpg" />
        <p>
          Get your prized bully featured here!<br />
          Get noticed for your hard work!
        </p>
      </div>
      <!-- <div class="api">
        <select  placeholder="Select Breed"
          v-model="breeds"
        >
        <option  v-for="breed in breeds" :key="breed.id">{{breed.name}}</option>    
        </select>
        <img class="selected-img" v-for="i in images" :key="i" :src="i.url"> 
       
      </div> -->
    </div>

    <ChatWindowVue class="chat-window" />
    <ChatFormVue class="chat-form" />
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from "vue-router";
import NavBarVue from "../components/NavBar.vue";
import getUser from "../composables/getUser";
import ChatFormVue from "../components/ChatForm.vue";
import ChatWindowVue from "../components/ChatWindow.vue";
import { watch } from "vue";
export default {
  data() {
    return {
      item: {
        image: null,
        imageUrl: null,
      },
       images: [],
        breeds: [],
        selected_breed: {},
        current_image: {},
    };
  },
  created() {
    this.getBreeds();
  },
  watch: {
    selected_breed: function () {

     
      this.getImages();
    },
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
    },

            async getBreeds()
            {
                try{
                    axios.defaults.headers.common['x-api-key'] = "ecbe9b73-ccde-420b-98b5-17935366cf7c"  
                    let response = await axios.get('https://api.thedogapi.com/v1/breeds' ) 
                    this.breeds = response.data;
                                
                    // pick one to display initially
                    this.selected_breed = this.breeds[10].name
                    
                }catch(err){
                    console.log(err)
                }
            },
            async getImages()
            {
                try{
               
                    let query_params = {
                        breed_ids: this.selected_breed.breed_ids,
                        limit:4
                    }

                    let response = await axios.get('https://api.thedogapi.com/v1/images/search', { params: query_params} ) 
                    
                    // this.pagination_count = response.headers['pagination-count'];
                    this.images = response.data 
                    this.current_image = this.images[0]

                    

                    
                }catch(err){
                    console.log(err)
                }
            }
  },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    // uploadFile(user => {
      
    // })

    watch(user, () => {
      if (!user.value) {
        router.push({
          name: "Welcome",
        });
      }
    });
    return { user };
  },
  components: {
    NavBarVue,
    ChatFormVue,
    ChatWindowVue,
  },
};
</script>

<style scoped>
.selected-img{
  height:500px;
  width:500px;
}
select{
  width: fit-content;
  padding: 1rem;
  font-size: x-large;
  top: 50px;
}
#upload {
  width: fit-content;
  height: auto;
  font-size: xx-large;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: black;
  color: white;
}
p {
  font-size: xx-large;
}
.file {
  width: 500px;
  height: auto;
  font-size: xx-large;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: black;
  color: white;
}
.preview {
  height: 700px;
  width: 700px;
  padding: 1rem;
}
.image-box {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
  border: 1rem;
  border-radius: 2rem;
  border-style: dotted;
  border-color: black;
  padding: 1rem;
}
.photo {
  grid-area: 4/1;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  justify-content: center;
  align-items: center;
}
.newlogo {
  grid-area: 2/1 / span 1 / span 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.information-panel {
  grid-area: 3/1 / span 1 / span 3;
  background: linear-gradient(to bottom, #e52d27, #b31217);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.info-grid {
  display: grid;
  grid-template-areas: 1/3;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.image1 {
  grid-area: 1/1;

  margin: 0.3rem;
  width: 900px;
}
.image2 {
  grid-area: 1/2;
  border: 1rem;
  border-radius: 2rem;
  border-style: dashed;
  border-color: black;
  margin: 1rem;
  margin-top: 1rem;
  justify-content: center;
}
.image3 {
  grid-area: 1/3;
  border-radius: 2rem;
  margin: 1rem;
}
.nav-bar {
  grid-area: 1/1 / span 1 / span 3;
}
.chat-window {
  grid-area: 4/2 / span 1 / span 2;
  /* background-color: black; */
}
.chat-form {
  grid-area: 5/2 / span 1 / span 1;
  display: flex;
  justify-content: center;
}
.container {
  display: grid;
  grid-template-rows: 200px 400px 1fr 1fr 400px;
  grid-template-columns: 1fr 1fr 1fr;
}
#message-title {
  margin-top: 2rem;
  text-align: right;
}
</style>