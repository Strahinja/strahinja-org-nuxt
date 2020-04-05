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

.source-url .v-icon
    margin-right: .25rem

.source-url .theme--light.v-icon
    color: #000
</style>
