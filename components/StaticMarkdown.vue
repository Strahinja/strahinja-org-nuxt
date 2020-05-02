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
    data()
    {
        return {
            markdown: '',
        };
    },
    watch:
    {
        linkId()
        {
            if (this && this.$store)
            {
                let article = this.$store.getters['articles/article'];
                this.markdown = article && article.markdown
                    ? md.render(article.markdown)
                    : '';
            }
            else
            {
                this.markdown = '';
            }
        }
    },
    async mounted()
    {
        let linkId = this.linkId;
        await this.$store.dispatch('articles/loadArticle', { linkId },
                                   { root: true });
        let article = this.$store.getters['articles/article'];
        this.markdown = article && article.markdown
            ? md.render(article.markdown)
            : '';
    }
};
</script>

<style lang="sass">
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'
</style>

