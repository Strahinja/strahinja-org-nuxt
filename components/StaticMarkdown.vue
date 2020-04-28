<template lang="pug">
    subpage(:source-url="true")
        .markdown-body(v-html="markdown")
</template>

<script>
import Subpage from '~/components/Subpage';
import md from '~/plugins/markdown-it';
export default {
    name: 'StaticMarkdown',
    components: { Subpage },
    props: {
        linkId: { type: String, required: true },
    },
    computed:
    {
        markdown()
        {
            if (this && this.$store)
            {
                let article = this.$store.getters['articles/article'];
                return article && article.markdown
                    ? md.render(article.markdown)
                    : {};
            }

            return {};
        }
    },
    mounted()
    {
        let linkId = this.linkId;
        this.$store.dispatch('articles/loadArticle', { linkId },
                             { root: true });
    }
};
</script>

<style lang="sass">
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'
</style>

