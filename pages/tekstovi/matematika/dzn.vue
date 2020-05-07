<template lang="pug">
    static-markdown(:markdown="markdown")
</template>

<script>
import StaticMarkdown from '~/components/StaticMarkdown';
export default {
    name: 'Dzn',
    components: { StaticMarkdown },
    head: {
        link: [
            {
                rel: 'stylesheet',
                href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css'
            },
        ],
    },
    data()
    {
        return {
            markdown: '',
        };
    },
    async asyncData({ store, app })
    {
        let linkId = 'dzn';
        await store.dispatch('articles/loadArticle', { linkId },
                             { root: true });
        let article = store.getters['articles/article'];
        return {
            markdown: article && article.markdown
                ? app.$mdRender(article.markdown)
                : ''
        };
    }
};
</script>

<style lang="sass">
.markdown-body hr.footnotes-sep
    display: none

</style>

