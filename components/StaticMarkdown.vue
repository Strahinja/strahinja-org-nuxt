<template lang="pug">
    subpage(:source-url="true")
        .markdown-body(v-html="markdown")
</template>

<script>
import Subpage from '~/components/Subpage';
export default {
    name: 'StaticMarkdown',
    components: { Subpage },
    props: {
        markdown: { type: String, default: '', required: false },
    },
};
</script>

<style lang="sass">
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'
</style>

