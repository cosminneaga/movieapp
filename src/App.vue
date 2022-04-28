<!-- MAIN APP 
@Responsibility: render all application parts

this file holds main three components, such as:
--Search component 
--Drawer(main navigation)
--Router Views
also within navigation container along the Drawer component 'search icon' and 'logo' are framed-->

<template>
  <v-app class="theme--dark" id="app">

    <!-- search component 
    :display holds the searc state which is regulary swaped from 'true' to 'false' by search icon and burger menu
    @toggleSearch emits 'false' from within this component in order to control the visibility of the search container in this file-->
    <Search :display="searchState" @toggleSearch="toggleSearch"/>
    
    <div class="navigation-container">
      <!-- drawer 
      @desc = holds all navigational links -->
      <Drawer />

      <!-- search icon 
      @click => changes the state of the search container constantly to true -->
      <div class="icon">
        <v-icon
        dark
        color="white"
        size="50"
        @click="searchState=true">mdi-movie-search-outline</v-icon>
      </div>

      <!-- main page logo
      @click => goes to home page -->
      <div class="logo">
        <img 
          src="@/assets/logo-animated.gif" 
          alt="logo"
          width="100px"
          height="80px"
          @click="goHome()">
      </div>
    </div>

    <br><br><br>

    <!-- main router view
    the entire colletions of view and/or components are rendered here -->
    <v-main id="page-wrap">
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
import Drawer from './components/Navigation/Drawer.vue'
import Search from './components/Navigation/Search.vue'

export default {
  name: 'App',
  components: { Drawer, Search},
  data: () => ({
    searchState: false
  }),
  methods: {
    goHome() {
      if(this.$route.path !== '/') this.$router.push('/')
    },
    toggleSearch(value) {
      this.searchState = value
    }
  },
  beforeMount() {
    // on component create make a request for the configuration settings to TMDB
    this.$axios.get('https://api.themoviedb.org/3/configuration?api_key=af511e4ff76c1a7979abdb0618561716')
    .then((response) => {
      // on Promise resolved commit the response to the main store of this application
      this.$store.commit('setTMDBConfig', response.data)
    })
  }
};
</script>

<!-- import style files used to style the links within drawer -->
<style src="./assets/style/links/base.css"></style>
<style src="./assets/style/buttons/base.css"></style>
<style lang="scss">
::-webkit-scrollbar{
  width: 10px;
}

::-webkit-scrollbar-track{
  background-color:#fff;
}

::-webkit-scrollbar-thumb{
  background: red;
  border-radius: 10px;
}
.bm-burger-button > *{
  background-color: white;
}
</style>
<style lang="scss" scoped>
.navigation-container{
  z-index: 1;

.logo{
  position: absolute;
  right: 30px;
  top: 5px;
}
.logo:hover{
  cursor: pointer;
}

  .icon{
    position: absolute;
    top: 10px;
    right: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 50%;
  }  
}
</style>