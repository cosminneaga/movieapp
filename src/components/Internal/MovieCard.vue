<!-- MOVIE CARD COMPONENT 
@Responsibility: loops through the list of movies received through 'list' prop
and creates a row with multiple cards showing the poster picture of the movie

on click user will be redirected to '/movie' route containing movie_id in the query parameter
-->
<template>
    
    <!-- MAIN ROW -->
    <v-row
        justify="center"
        :key="key">
            <!-- CARD ITEM -->
            <v-card 
            v-for="item in list.results" 
            :key="item.id"
            :height="$vuetify.breakpoint.xs ? '20%' : 300"
            :width="$vuetify.breakpoint.xs ? '80%' : 210"
            class="ma-2 movie-card"
            dark
            elevation="16"
            align-items="center"
            @click="goToMovie(item.id)">

                <v-img 
                v-if="item.poster_path"
                :src="imagesSecureBaseUrl+
                'w780'+
                item.poster_path" 
                :lazy-src="imagesSecureBaseUrl+
                'w780'+
                item.poster_path" 
                :alt="item.original_title"
                width="100%"
                height="100%">
                <template v-slot:placeholder>
                    <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                    <v-progress-circular
                        indeterminate
                        color="yellow"
                    ></v-progress-circular>
                    </v-row>
                </template>
                </v-img>

                <div v-if="!item.poster_path">
                    <p class="text-h5 pa-1">
                        {{item.original_title}}
                    </p>
                    <img 
                    src="../../assets/images/no-image-available-animation.gif" 
                    :alt="item.original_title"
                    width="100%"
                    height="100%"/>
                </div>
            </v-card>
            <!-- CARD ITEM -->

            <p class="text-h3" v-if="noResults">No results available</p>

        </v-row>
        <!-- MAIN ROW ENDS -->

</template>

<script>
export default {
    props: ['list'],
    data: () => ({
        key: false,
        noResults: false,
        imagesSecureBaseUrl: ''
    }),
    watch: {
        list: function(value){
            this.$props.list = value
            this.key = !this.key
            value.results.length === 0 ? this.noResults = true : this.noResults = false
        }
    },
    beforeMount() {
        if(this.$props.list.length === 0) this.noResults = true
        this.imagesSecureBaseUrl = this.$store.getters.getTMDBConfig.images.secure_base_url
    },
    methods: {
        goToMovie(id){
            this.$router.push({
                path: '/movie',
                query: {
                    movie_id: id
                }
            }, 
            () => {}, 
            () => {})
        }    
    }
}
</script>

<style lang="scss" scoped>
.movie-card{
    overflow: hidden;
    transition: transform 0.2s ease-in-out, border 0.4s linear;
}

.movie-card:hover{
    cursor: pointer;
    transform: scale(1.1);
    border: 6px solid #4D42B3;
}
</style>