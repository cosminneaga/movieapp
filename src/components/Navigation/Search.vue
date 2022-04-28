<!-- SEARCH COMPONENT 
@Responsibility: overlays over app, holds the search text input and also the collection of movie cards based on entered text in the search input

holds 2 components: pagination, movie card
-->
<template>
    <!-- MAIN WRAPPER -->
    <div
      :z-index="overlay.zIndex"
      v-if="overlay.show"
      class="overlay-wrapper">

      <!-- HEADER => SEARCH & CLOSE BUTTON -->
      <div class="overlay-header">
          <!-- SEARCH INPUT -->
          <v-text-field
            v-model="search.value"
            outlined
            clearable
            shaped
            hide-details
            filled
            dark
            color="yellow"
            label="Search your favourite movie"
            type="text"
            class="input ma-5"
            @change="getSearchInput">
            
            <template v-slot:append>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-if="search.loading"
                  size="29"
                  color="yellow"
                  indeterminate
                ></v-progress-circular>
                <v-btn v-else @click="getSearchInput">
                  <img
                  width="50"
                  height="100%"
                  src="../../assets/images/search-magnifier.png"
                  alt="search-magnifier">
                </v-btn>
              </v-fade-transition>
            </template>

          </v-text-field>
          <!-- SEARCH INPUT -->

          <v-icon
            color="red"
            @click="onClose"
            size="65">
            mdi-close-outline
        </v-icon>
      </div>
      <!-- HEADERS ENDS -->

      
      <div class="overlay-pagination">
        <Pagination :page="pagination.page" :total="pagination.total" @requestedPage="getPaginationInput" />
      </div>

      <div class="overlay-content">
        <MovieCard :list="cards.list" :imagesSecureBaseUrl="$store.getters.getTMDBConfig.images.secure_base_url"/>
      </div>

      <div class="overlay-pagination">
        <Pagination :page="pagination.page" :total="pagination.total" @requestedPage="getPaginationInput" />
      </div>

    </div>
    <!-- MAIN WRAPPER ENDS -->

</template>

<script>
import MovieCard from '../Internal/MovieCard.vue'
import Pagination from '../Internal/Pagination.vue'

  export default {
    components: {MovieCard, Pagination},
    props: ['display'],
    data: () => ({
      cards: {
        list: []
      },
      search: {
          loading: false,
          value: ''
      },
      overlay: {
        show: false
      },
      pagination: {
        total: 0,
        current: 1
      },
    }),
    watch: {
      // watch for display prop and set the document overflow to hidden/auto accordingly
      display: function(value){
        this.overlay.show = value
        value ? 
        document.documentElement.style.overflow = 'hidden' : 
        document.documentElement.style.overflow = 'auto'
      },
      // watch the route for this component in order to overcome the display of the search overlay, in case the user goes to same route but the query is not same as previous, in that set the search overlay state to false
      $route: function(to, from){
        if (from.path !== to.path){
            this.overlay.show = false
            this.$emit('toggleSearch', false)
        } else if(from.query !== to.query){
            this.overlay.show = false
            this.$emit('toggleSearch', false)
        }
      }
    },
    methods: {
      // method which is used to close the search overlay
      onClose (){
        this.overlay.show = false
        this.$emit('toggleSearch', false)
      },
      // function called to make request to API
      // *check if title is null or empty and set it to 'a'
      // *compose request url
      // *make the request and set the new list for cards rendering and also the pagination
      makeSearchRequest(title, page=1){
        if (title === '' || title === null) title = 'a'
 
        let url = this.$store.getters.getGeneralBaseUrl +
          'search/movie' +
          this.$store.getters.getApiKey +
          '&query=' + title + '&page=' + page

          this.$axios.get(url).then(response => {
            this.cards.list = response.data
            this.pagination = {
              page: response.data.page,
              total: response.data.total_pages
            }
          })
          
      },
      // get search input on enter or click and make request to API
      getSearchInput(){
        this.makeSearchRequest(this.search.value)
      },
      // get pagination input and make request to API
      getPaginationInput(page){
        this.makeSearchRequest(this.search.value, page)
      }
    },
    // on component create make default request
    created(){
      this.makeSearchRequest('')
    }
  }
</script>

<style lang="scss" scoped>
.overlay-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  z-index: 99;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  & .overlay-header{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;  
    align-items: center; 
    padding: 20px 15px; 
    z-index: 1;
      & .input{
        font-size: 2rem;
      }
    }
}
.overlay-wrapper::-webkit-scrollbar{
  width: 5px;
}
</style>