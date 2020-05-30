<template lang="pug">
    static-markdown(:markdown="markdown")
</template>

<script>
//import StaticMarkdown from '~/components/StaticMarkdown';
export default {
    name: 'Brelred',
    //components: { StaticMarkdown },
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
        let linkId = 'brelred';
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

