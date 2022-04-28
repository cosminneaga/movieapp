<!-- DRAWER COMPONENT 
@Responsibility: holds link data, this is main navigational component
-->
<template>
    <Push 
    class="drawer"
    :closeOnNavigation="true">

    <div class="logo">
      <img 
        src="@/assets/logo.png" 
        alt="logo"
        width="100px"
        height="80px"
        @click="goHome">
    </div>
    
      <div>
        <span @click="goTo('movie/now_playing', 0, 'Now Playing in Cinemas')" class="link link--elara">
          <span>Now Playing</span>
        </span>
      </div>
      <div>
        <span @click="goTo('movie/popular', 0, 'Popular Movies')" class="link link--elara">
          <span>Popular</span>
        </span>
      </div>
      <div>
        <span @click="goTo('movie/top_rated', 0, 'Top Rated Movies')" class="link link--elara">
          <span>Top Rated</span>
        </span>
      </div>
      <div>
        <span @click="goTo('movie/upcoming', 0, 'Upcoming Movies')" class="link link--elara">
          <span>Upcoming</span>
        </span>
      </div>
      <div>
        <span @click="goTo('', 0, 'Discover Collection of Movies')" class="link link--elara">
          <span>Discover</span>
        </span>
      </div>

      <v-divider dark inset />

      <div v-for="link in links.genres" :key="link.id">
        <span @click="goTo('', link.id, link.name)" class="link link--elara">
          <span>{{link.name}}</span>
        </span>
      </div>


    </Push>
</template>


<script>
import { Push } from 'vue-burger-menu'

export default {
    components: { Push },
    data: () => ({
        drawerState: false,
        links: []
    }),
    methods: {
        // link click redirect to movies genre page
        // category: in case category is selected
        // genreID: the genre id requested by API
        // genreName: the genre name used to be display on target page
        async goTo(category, genreId, genreName){
          const routeObj = {
            path: '/movies',
            query: {
              category: category,
              genreName: genreName,
              genreId: genreId
            }
          }
          // if genre name is same previous do not push to router only contrary
          if(this.$route.query.genreName !== routeObj.query.genreName) this.$router.push(routeObj) 
        },
        // redirects user to home page 
        goHome() {
          if(this.$route.path !== '/') this.$router.push('/')
        }
    },
    // before this component mounts fetch the links list
    async beforeMount(){
      this.$axios.get(
        this.$store.getters.getGeneralBaseUrl +
        'genre/movie/list' +
        this.$store.getters.getApiKey)
        .then(response => {
          this.links = response.data
        })
    }
}

</script>
<style lang="scss">
.bm-menu::-webkit-scrollbar{
  width: 2px;
  & .logo {
    z-index: -1;    
  }
}
</style>
<style lang="scss" scoped>
.logo{
  position: absolute;
  right: 30px;
  top: 5px;
}
.logo:hover{
  cursor: pointer;
}
</style>