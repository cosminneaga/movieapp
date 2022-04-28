<!-- PAGINATION COMPONENT 
@Responsibility: holds the pagination data

default start at position 1

also emits current page number to its parent to better control user experience if a second pagination component is used in same component
-->
<template>
    <div class="text-center">
        <v-container>
            <v-row justify="center">
                <v-col cols="12">
                <v-container class="max-width">
                    <v-pagination
                    v-model="pagination.page"
                    class="my-4"
                    :length="pagination.total"
                    :total-visible="7"
                    circle
                    dark
                    @input="getPage"
                    ref="pagination-input">
                    </v-pagination>
                </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    props: ['page', 'total'],
    data: () => ({
        pagination: {
            page: 0,
            total: 0
        }
    }),
    watch: {
        // watch for changes over 'total' prop
        total: function(val){
            this.pagination.total = val
        },
        // watch for changes over 'page' prop
        page: function(val){
            this.pagination.page = val
        }    
    },
    methods: {
        // emits the requested page number to its parent to sync with second pagination component in the parent component
        getPage(value){
            this.$emit('requestedPage', value)
        }
    },
    // before component mounts establish the data received from props
    beforeMount() {
        this.pagination.page = this.$props.page
        this.pagination.total = this.$props.total
    },
}
</script>