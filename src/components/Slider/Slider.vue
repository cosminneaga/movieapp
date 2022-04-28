<!-- SLIDER COMPONENT 
@Responsibility: create carousel of pictures

holds 2 components: slider & slider-item
-->
<template>

<div>
    <br v-for="i in 5" :key="i" />

    <!-- display the category title => props['title']-->
    <div style="padding: 20px;">
      <p class="text-h5 text-sm-h3 grey--text text-darken-5">{{title}}</p>
    </div>

      <!-- SLIDER WRAPPER -->
      <slider 
      ref="slider" 
      :options="{
          currentPage: 0,
          tracking: false,
          thresholdDistance: 100,
          thresholdTime: 300,
          infinite: 1,
          slidesToScroll: 2,
          loop: true,
          speed: 1000,
      }" 
      :autoplay="regulateSpeed">
        
          <!-- SLIDER ITEM -->
          <slideritem 
          v-for="item in list" 
          :key="item.id">

          <!-- MAIN IMAGE -->
          <v-img 
          width="100%" 
          height="100%"
          :src="
          imagesSecureBaseUrl+'w780'+
          item.poster_path"
          :lazy-src="
          imagesSecureBaseUrl+'w780'+
          item.poster_path"
          :alt="item.original_title"
          @click="goToMovie(item.id)">

          <!-- LAZY LOADING IMAGE SLOT -->
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5">
                  </v-progress-circular>
              </v-row>
            </template>

          </v-img>
          <!-- MAIN IMAGE ENDS -->
          
          </slideritem>
          <!-- SLIDER ITEM ENDS -->
          
          <!-- SLIDER ITEM SLOT -->
          <div slot="loading">
            <v-progress-circular
              indeterminate
              color="amber"
              :size="70"
              :width="7"></v-progress-circular>
          </div>

      </slider>
      <!-- SLIDER WRAPPER ENDS -->
</div>


</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'

// PROPS:
// *title: holds the category title displayed on the page
// *category: holds a string variable based on which the data gets selected and fetched from API
// *regulateSpeed: holds the variable used to regulate the speed of the automatic spinning slider
export default {
    props: {
      title: String,
      category: String,
      regulateSpeed: String
    },
    components: { slider, slideritem },
    data: () => ({
      imagesSecureBaseUrl: '',
      list: []
    }),
      methods: {
        // pushes to route the path for viewing the movie information
        // query: holds the movie id i.e. 550
        goToMovie(id){
            this.$router.push({
                path: '/movie',
                query: {
                    movie_id: id
                }
            })
        }    
      },
    // before component mount:
    // *check what category is
    // *fetch data from API based on the category
    // *set the movie list
    // *set images url
    async beforeMount(){    
      let category;
      switch(this.category){
        case 'top-rated':
          category = 'movie/top_rated'
          break
        case 'upcoming':
          category = 'movie/upcoming'
          break
        default:
          category = 'movie/popular'
          break
      }
      
      const response = await this.$axios.get(this.$store.getters.getGeneralBaseUrl + 
        category +
        this.$store.getters.getApiKey)
      this.list = response.data.results
        
      this.imagesSecureBaseUrl = this.$store.getters.getTMDBConfig.images.secure_base_url
    }
}
</script>

<style lang="scss" scoped>
.slider-container{
  & .slider-item{
    display: inline-block;
    width: 60%;
    height: auto;
    font-size: 18px;
    margin: 0 20px;
    transition: all .3s ease-in-out;
  }
  & .slider-item:hover{
    transform: scale(1.1);
    cursor: pointer;
  }
}

@media only screen and(min-width: 680px)  {
  .slider-container{
    & .slider-item{
        width: 40%;
    }
  }
}

@media only screen and(min-width: 880px)  {
  .slider-container{
    & .slider-item{
        width: 35%;
    }
  }
}

@media only screen and(min-width: 1024px)  {
  .slider-container{
    & .slider-item{
        width: 30%;
    }
  }
}

@media only screen and(min-width: 1350px)  {
  .slider-container{
    & .slider-item{
        width: 25%;
    }
  }
}

@media only screen and(min-width: 1600px)  {
  .slider-container{
    & .slider-item{
        width: 20%;
    }
  }
}
</style>