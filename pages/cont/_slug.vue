<template lang="pug">
    //-subpage
        //-article
    nuxt-content(:document="document")
</template>

<script>
import Subpage from '~/components/Subpage';
import SourceUrl from '~/components/SourceUrl';
export default {
    name: 'Cont',
    components: { Subpage, SourceUrl },
    async asyncData({ $content, params })
    {
        const document = await $content(params.slug).fetch();

        return {
            document,
        };
    }
};
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'
</style>
