<template lang="pug">
    a.source-url(target="_blank",
    :class=`{
        'anchor-dark': contrastDark,
        'anchor-light': contrastLight,
    }`,
    :href="url")
        v-icon(:class=`{
            'contrast-dark': contrastDark,
            'contrast-light': contrastLight,
        }`) mdi-xml
        | Изворни код

</template>

<script>
export default {
    name: 'SourceUrl',
    props: {
        contrastDark: { type: Boolean, default: false, required: false },
        contrastLight: { type: Boolean, default: false, required: false },
    },
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
