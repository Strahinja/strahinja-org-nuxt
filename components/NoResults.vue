<template lang="pug">
    v-container.no-results.py-0
        v-row
            v-col.pa-0
                v-img.mx-auto(:width="300",
                :height="300",
                :src="image")
                    .text-center {{ message }}
</template>

<script>
export default {
    name: 'NoResults',
    props: {
        message: { type: String, default: 'Ништа није пронађено', required: false },
        image: { type: String, default: '/img/no-results-generic.svg', required: false },
    },
};
</script>

<style lang="sass">
.no-results .v-image .v-image__image
    opacity: .1

.theme--dark .no-results .v-image .v-image__image
    filter: invert(1)

.no-results .v-image .v-responsive__content
    align-self: center
</style>

