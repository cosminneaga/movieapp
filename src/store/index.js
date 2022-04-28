import Vue from 'vue'
import Vuex from 'vuex'

// use Vuex with main application and enable it globally
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tmdb: {
      apiKey: '?api_key=af511e4ff76c1a7979abdb0618561716',
      generalBaseUrl: 'https://api.themoviedb.org/3/',
      config: {}
    }
  },
  mutations: {
    // set config data to store
    setTMDBConfig(state, payload) {
      state.tmdb.config = payload
    }
  },
  getters: {
    // get config data
    getTMDBConfig: state => state.tmdb.config,
    getApiKey: state => state.tmdb.apiKey,
    getGeneralBaseUrl: state => state.tmdb.generalBaseUrl,
  }
})
