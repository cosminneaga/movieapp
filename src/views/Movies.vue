<!-- MOVIES PAGE 
@Responsibility: render collection of movie cards base on genre and also category


this file holds 2 components, such as:
--Pagination
--MovieCard
-->
<template>
    
    <v-container>
        <!-- get variable from route query and display it -->
        <h1>{{$route.query.genreName}}</h1>
        <br><br>

        <!-- pagination 
        :page = holds the current page number
        :total = holds the total pages number
        @requestedPage = respond with page number requested -->
        <Pagination :page="pagination.page" :total="pagination.total" @requestedPage="getPage" />
        <!-- movied card
        :list = array of movies list fetched from TMDB
        -->
        <MovieCard :list="list" />

        <Pagination :page="pagination.page" :total="pagination.total" @requestedPage="getPage" />

    </v-container>

</template>

<script>
// import MovieCard and Pagination components
import MovieCard from '../components/Internal/MovieCard.vue'
import Pagination from '../components/Internal/Pagination.vue'

export default {
    components: {MovieCard, Pagination},
    data: () => ({
        // pagination obj keeps state of pagination for current page
        pagination: {
            page: 1,
            total: 0
        },
        // list of movies fetched
        list: []
    }),
    methods: {
        // make the request in order to fetched needed data
        makeGenreRequest(category, genreId, page=1){
            let url =
             this.$store.getters.getGeneralBaseUrl +
                'discover/movie' +
                this.$store.getters.getApiKey + 
                '&with_genres=' +  genreId +
                '&page=' + page

            category !== '' ? url = url.replace('discover/movie', category) : url
            category !== '' ? url = url.replace('&with_genres=0', '') : url
            genreId === '0' ? url = url.replace('&with_genres=0', '') : url           

            this.$axios.get(url).then(res => {
                    this.list = res.data
                    this.pagination.page = res.data.page
                    this.pagination.total = res.data.total_pages
                })
        },
        // make request when user requests data for a certain page
        getPage(value){
            this.makeGenreRequest(this.$route.query.category, this.$route.query.genreId, value)
        },
    },
    // before the components is monted make a request for data
    beforeMount(){ 
        this.makeGenreRequest(this.$route.query.category, this.$route.query.genreId, 1) 
    },
    // watch for route changes and make request accordingly
    watch: {
        $route(to){
            this.makeGenreRequest(to.query.category, to.query.genreId, 1)
        }
    }
}
</script>