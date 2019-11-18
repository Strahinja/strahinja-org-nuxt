<template>
    <div
        v-if="loading"
        class="loading">
        <v-progress-circular
            :size="50"
            :width="5"
            :color="'#fff'"
            indeterminate />
    </div><!--loading-->
</template>

<script>
export default {
    data: () =>
    {
        return {
            loading: false
        };
    },
    methods: {
        start()
        {
            this.loading = true;
        },
        finish()
        {
            this.loading = false;
        }
    }
};
</script>

<style lang="sass" scoped>
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

