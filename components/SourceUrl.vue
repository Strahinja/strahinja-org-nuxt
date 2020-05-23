<template lang="pug">
    a.source-url(target="_blank",
    :href="url")
        v-icon mdi-xml
        | Изворни код

</template>

<script>
export default {
    name: 'SourceUrl',
    computed: {
        url()
        {
            return this && this.$store
                ? this.$store.getters['pages/sourceURL']
                : null;
        }
    }
};
</script>

<style lang="sass" scoped>
.source-url
    text-decoration: none !important
    color: rgba(0,0,0,.5)

.theme--dark .source-url
    color: rgba(255,255,255,.5)

.source-url .v-icon
    margin-right: .25rem
    color: #fff

.source-url .theme--light.v-icon
    color: #000
</style>
