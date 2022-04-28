<!-- MOVIE PAGE 
@Responsibility: render single movie information based on movied_id query
-->
<template>
    <div>

        <!-- main wrapper -->
        <div 
        class="movie-wrapper"
        :style="{
            backgroundImage: pictures !== null ? 'url('+$store.getters.getTMDBConfig.images.secure_base_url +'/w780'+ pictures.backdrops[0].file_path +')' : ''}">

            <!-- content wrapper -->
            <v-container class="wrapper-content">

                <!-- SECTION TITLE
                displays data fetched:
                * original movie title
                * tagline
                * average vote
                * release date
                 -->
                <v-sheet
                    color="white"
                    elevation="12"
                    height="auto"
                    rounded
                    width="100%"
                    class="py-8 px-6">
                    
                        <v-row class="justify-space-around" v-if="main_info">
                            <div>
                            <span class="text-md-h4 text-h5">{{main_info.original_title}}</span>
                            <br>
                            <span class="text-subtitle-1 purple--text">{{main_info.tagline}}</span>
                            </div>

                            <div>
                                <span class="text-md-h4 text-h5">
                                    <v-icon
                                    color="yellow"
                                    size="50">mdi-star</v-icon>
                                    <sup>{{main_info.vote_average}}</sup>/<sub>10</sub>
                                </span>
                            </div>

                            <div>
                                <span class="text-md-h4 text-h5">
                                    {{main_info.release_date}}
                                </span>
                            </div>
                        </v-row>

                    </v-sheet>
                    <!-- SECTION TITLE ENDS -->

                    <!-- SECTION OVERVIEW 
                    display data: 
                    * genre names
                    * homepage link
                    * movie runtime
                    * summary
                    * poster photo
                    -->
                    <v-sheet
                    color="white"
                    elevation="12"
                    height="auto"
                    width="100%"
                    rounded
                    class="py-8 px-6 mt-7"
                    v-if="main_info">
                        <v-row no-gutters>
                            <v-col 
                            class="col-12 col-md-6">

                                <div>
                                    <span class="subtitle-1 font-weight-bold">Genres</span>
                                    <br>
                                    <span 
                                    v-for="genre in main_info.genres" 
                                    :key="genre.id"
                                    class="pr-2 subtitle-1 blue--text text--darken-3 genres">{{genre.name}}</span>
                                </div>

                                <div>
                                    <span class="subtitle-1 font-weight-bold">Homepage</span>
                                    <br>
                                    <a 
                                    :href="main_info.homepage"
                                    target="_blank" 
                                    rel="noopener noreferrer">{{main_info.homepage}}</a>
                                </div>

                                <div>
                                    <span class="subtitle-1 font-weight-bold">Runtime</span>
                                    <br>
                                    <span class="pr-2 subtitle-1 blue--text text--darken-3">
                                        {{main_info.runtime}} min
                                    </span>
                                </div>

                                <div>
                                    <span class="subtitle-1 font-weight-bold">Summary</span>
                                    <br>
                                    <span class="pr-2 subtitle-1">
                                        {{main_info.overview}}
                                    </span>
                                </div>
                            </v-col>

                            <v-col class="col-12 col-md-6 d-flex justify-center">
                                <v-card :width="$vuetify.breakpoint.smAndDown ? '90%' : '60%'" height="auto">
                                    <v-img 
                                    width="100%"
                                    height="100%"
                                    :lazy-src="$store.getters.getTMDBConfig.images.secure_base_url+'w780'+main_info.poster_path"
                                    :src="$store.getters.getTMDBConfig.images.secure_base_url+'w780'+main_info.poster_path"></v-img>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-sheet>
                    <!-- SECTION OVERVIEW ENDS -->
                        
                    <!-- SECTION OFFICIAL TRAILER 
                    display:
                    * official trailer based parsed from Youtube based on video key provided by TMDB-->
                    <v-sheet
                    color="white"
                    elevation="12"
                    height="auto"
                    width="100%"
                    rounded
                    class="py-8 px-6 mt-7"
                    v-if="main_info && videoKey">
                        <span class="text-h5 text-md-h4">Official Trailer</span>

                        <iframe 
                        width="100%" 
                        height="500" 
                        :src="'https://www.youtube.com/embed/' + videoKey" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </v-sheet>
                    <!-- SECTION OFFICIAL TRAILER ENDS -->

                    <!-- SECTION CAST MEMBERS 
                    display:
                    * the list of cast members, items displayed:
                    ** cast member picture
                    ** name
                    ** character name
                    -->
                    <v-sheet
                    color="white"
                    elevation="12"
                    height="auto"
                    width="100%"
                    rounded
                    class="py-8 px-6 mt-7"
                    v-if="main_info && credits">
                        <p v-if="credits.cast" class="subtitle-1 font-weight-bold">Cast</p>
                        <v-row class="justify-center">

                            <div 
                            v-for="member in credits.cast"
                            :key="member.cast_id"
                            class="cast-member-container">
                                <div class="cast-header">
                                    <img 
                                    v-if="member.profile_path !== null"
                                    :src="$store.getters.getTMDBConfig.images.secure_base_url+'original'+member.profile_path" 
                                    :alt="member.name">

                                    <img 
                                    v-if="member.profile_path === null"
                                    src="../assets/images/no-image-icon-300x300.jpg" 
                                    alt="no-image">
                                </div>

                                <div class="cast-content">
                                    <span class="text-body-1">
                                        {{member.name}}
                                    </span>
                                    <br>
                                    <span class="text-body-1 purple--text">
                                        {{member.character}}
                                    </span>
                                </div>
                            </div>

                        </v-row>
                    </v-sheet>
                    <!-- SECTION CAST MEMBERS ENDS -->

                    <!-- SECTION SIMILAR MOVIES 
                    display:
                    * first page list of similar movies based on movies id fetched from TMDB-->
                    <v-sheet
                    color="white"
                    elevation="12"
                    height="auto"
                    width="100%"
                    rounded
                    class="py-8 px-6 mt-7"
                    v-if="similars">
                        <p class="subtitle-1 font-weight-bold">Similar Movies</p>
                    
                        <MovieCard :list="similars" />
                    </v-sheet>
                    <!-- SECTION SIMILAR MOVIES ENDS -->

            </v-container>

        </div>
    </div>
</template>

<script>
import MovieCard from '../components/Internal/MovieCard.vue'

export default {
    components: {MovieCard},
    data: () => ({
        id: null,
        main_info: null,
        videoKey: null,
        pictures: null,
        similars: null,
        credits: null,
    }),
    watch: {
        // watch route for route changes -> refetch the requested data, also reload to ensure correct content is loaded
        $route: function(to, from){
            this.id = to.query.movie_id
            this.fetchMovieData()
            if (to.query !== from.query) this.$router.go(0)
        }
    },
    methods: {
        // fetch movie data from TMDB
        fetchMovieData(){
            const id = this.$route.query.movie_id
            this.id = id

            // url
            let url = this.$store.getters.getGeneralBaseUrl + 'movie/' + id

            // main_info
            this.$axios.get(url + this.$store.getters.getApiKey)
            .then(response => {
                this.main_info = response.data
            })

            // videos
            this.$axios.get(url + '/videos' + 
                            this.$store.getters.getApiKey + '&append_to_response=videos')
            .then(response => {
                if(response.data.results.length !== 0){
                    response.data.results.every(video => {
                    if(video.official === true){
                        this.videoKey = video.key 
                        return false
                        }
                    })
                }else{
                    this.videoKey = false
                }
            })

            // pictures
            this.$axios.get(url + '/images' + this.$store.getters.getApiKey)
            .then(response => {
                this.pictures = response.data
            })

            // first 20 similar
            this.$axios.get(url + '/similar'+ this.$store.getters.getApiKey + '&language=en-US&page=1')
            .then(response => {
                this.similars = response.data
            })

            // credits
            this.$axios.get(url +'/credits' +
                this.$store.getters.getApiKey + '&language=en-US')
            .then(response => {
                this.credits = response.data
            })
        }
    },
    // before mount the component fetch the requested data
    beforeMount() {
        this.fetchMovieData()
    }
}
</script>

<style lang="scss" scoped>
.movie-wrapper {
    height: auto;
    overflow-y: auto;
    background-position: top center;
    background-repeat: no-repeat;
    background-size: contain;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    & .wrapper-content{
        margin-top: 30%;
        & .genres:not(:last-child)::after{
            content: ',';
        }
        & .cast-member-container{
            width: 150px;
            height: auto;
            & .cast-header {
                width: 80%;
                height: 150px;
                margin: auto;
                & img {
                    border-radius: 50%;
                    outline: 2px solid #121212;
                    border: 5px solid #fff;
                    width: 100%;
                    height: 100%;
                }
            }
            & .cast-content{
                text-align: center;
            }
        }
    }
}

.wrapper::-webkit-scrollbar{
    width: 0;
}
</style>