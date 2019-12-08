<template>
    <!--eslint-disable-next-line vue/html-self-closing-->
    <div id="loading"></div>
    <!--v-fade-transition>
        <div
            v-if="loading"
            class="loading">
            <v-progress-circular
                :size="50"
                :width="5"
                :color="'#fff'"
                indeterminate />
        </div><!- -loading- ->
    </v-fade-transition-->
</template>

<script>
export default {
    computed: {
        loading()
        {
            return this && this.$store && this.$store.getters
                && this.$store.getters['loading/isStoreLoading'];
        }
    },
    methods: {
        start()
        {
            if (this.$store)
            {
                this.$store.dispatch('loading/startLoading', {
                    id: 'app'
                });
            }
        },
        finish()
        {
            if (this.$store)
            {
                this.$store.dispatch('loading/stopLoading', {
                    id: 'app'
                });
            }
        }
    }
};
</script>

<style lang="sass" scoped>
// #loading
    display: block
    position: absolute
    top: 0
    left: 0
    width: 200px
    height: 200px
    z-index: 100
    background: #fff

.loading
    display: block
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 100
    text-align: center
    padding-top: 5em
    transition: all .5s ease
    background-color: $loading-background-color
</style>

