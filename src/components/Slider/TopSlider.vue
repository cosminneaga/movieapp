<!-- TOP SLIDER COMPONENT 
@Responsibility: create carousel of pictures, along with infomation about movie

holds 2 components: slider & slider-item
-->
<template>

<div>

  <br><br>
  <!-- MAIN CONTAINER -->
  <v-responsive :aspect-ratio="16/9">
      <!-- SLIDER -->
      <slider 
      ref="slider" 
      :options="{
          effect: 'slide',
          itemAnimation: true,
          centeredSlides: true,
          loopedSlides: 1,
          slidesToScroll: 1,
          autoplay: '6000',
          loop:true,
          speed: 1000,
          timingFunction: 'ease',
          pagination: false
        }">
        
          <!-- SLIDER ITEM -->
          <slideritem 
          v-for="item in list" 
          :key="item.id">

            <!-- MOVIE OVERVIEW CARD -->
            <v-card
              class="card"
              max-width="600"
              min-width="300"
              dark
              style="z-index:99;">

              <v-chip
                class="chip"
                color="primary">Playing in cinema</v-chip>

              <v-card-text class="text-left">
                <v-card-title class="header"> 
                  <p class="text-h5 text-md-h4 text--primary">
                  {{item.original_title}}
                  </p>
                  <p class="text-h5 text-md-h4 text--primary">
                    {{item.release_date}}
                  </p>
                </v-card-title>
                <v-divider></v-divider>
                <div>
                  <br>
                  <p class="text-body-1 text-sm-h5">{{item.overview}}</p>
                </div>

                <div>
                  <v-chip color="red" v-if="item.adult">18+</v-chip>
                  <v-chip color="green" v-if="!item.adult">13+</v-chip>
                  <v-chip color="blue">{{item.original_language}}</v-chip>
                </div>
              </v-card-text>
            </v-card>
            <!-- MOVIE OVERVIEW CARD ENDS -->

            <!-- GOTO DETAILS BUTTON -->
            <!-- goToMovie(item.id) redirects user to the /movie route
            where information about a certain movie are displayed -->
            <v-btn
              color="red"
              x-large
              dark
              class="button"
              style="z-index: 99;"
              @click="goToMovie(item.id)">
              details
              <v-icon>mdi-movie-play-outline</v-icon>
            </v-btn>
            <!-- GOTO DETAILS BUTTON ENDS -->
            
            <!-- MAIN MOVIE IMAGE -->
            <v-img 
            width="100%" 
            height="100%"
            :src="
            $vuetify.breakpoint.smAndDown ? 
            imagesSecureBaseUrl+'w780'+item.poster_path : 
            imagesSecureBaseUrl+'w780'+item.backdrop_path"
            :lazy-src="
            $vuetify.breakpoint.smAndDown ? 
            imagesSecureBaseUrl+'w780'+item.poster_path : 
            imagesSecureBaseUrl+'w780'+item.backdrop_path"
            :alt="item.original_title">

              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"> 

                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>

                </v-row>
              </template>
            </v-img>
            <!-- MAIN MOVIE IMAGE ENDS -->

            <!-- RATING CONTAINER -->
            <div class="rating-container">
              <div class="text-center">
                <v-rating
                  v-model="item.vote_average"
                  background-color="light"
                  color="orange"
                  :size="20"
                  :length="10"
                  width="100%"
                  dark
                  readonly></v-rating>
              </div>
              <div class="votes-date">
                <span>{{item.vote_count}} votes</span>
                <span>{{item.release_date}}</span>
              </div>
            </div>
            <!-- RATING CONTAINER ENDS -->

          </slideritem>
          <!-- SLIDER ITEM ENDS -->
          
          <!-- LOADING SLOT -->
          <div slot="loading">
            <v-progress-circular
              indeterminate
              color="amber"
              :size="70"
              :width="7"></v-progress-circular>
          </div>

      </slider>
      <!-- SLIDER ENDS -->
      </v-responsive>
      <!-- MAIN CONTAINER ENDS -->
</div>

</template>


<script>
import { slider, slideritem } from 'vue-concise-slider'

export default {
   data: () => ({
        list:[],
        imagesSecureBaseUrl: ''
    }) ,
    components: { slider, slideritem },
    // before mount set the movie list and the images url for correctly fetching the images
    async beforeMount(){  

      const response = await this.$axios.get(this.$store.getters.getGeneralBaseUrl +
        'movie/now_playing' + this.$store.getters.getApiKey)
      this.list = response.data.results

      this.imagesSecureBaseUrl = this.$store.getters.getTMDBConfig.images.secure_base_url 
    },
    methods: {
      // logic pushes new route in order to display information about a movie
      // query: contains movie id
        goToMovie(id){
            this.$router.push({
                path: '/movie',
                query: {
                    movie_id: id
                }
            })
        } 
    }
}
</script>

<style lang="scss" scoped>
.slider-container{
    & .slider-item {
      background: rgba(0, 0, 0, 0.1);
    & .button{
      position: absolute;
      top: 70%;
      right: 10%;
      transform: translate(-10%, -70%)
    }
    & .chip{
      position: absolute;
      top: -15px;
      right: -10px;
    }
    & .card{
      display: flex;
      position: absolute;
      top: 15%;
      left: 5%;
      transform: translate(-5%, -15%);
      background-color: rgba(0,0,0,0.7);
      color: #fff;
      width: auto;
      max-width: 300px;
      height: auto;
      font-size: 20px;
      padding: 5px 15px;
      word-wrap: break-word;
      word-wrap: break-all;
      & .header{
        display: flex;
        justify-content: space-between;
      }
    }
    & .rating-container{
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 16px;
      background-color: rgba(0,0,0,0.7);
      color: #fff;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      padding: 0 15px;
        & .votes-date{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
    }
  }
  & .slider-item.slider-active {
    transform:scale(1.0);
    z-index: 999;
  }
  & .slider-item.slider-active-copy {
    transform:scale(1.0);
    z-index: 999;
  }
}
</style>