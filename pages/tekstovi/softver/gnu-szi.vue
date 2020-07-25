<template lang="pug">
    static-markdown(:markdown="markdown")
</template>

<script>
//import StaticMarkdown from '~/components/StaticMarkdown';
export default {
    name: 'GnuSzi',
    //components: { StaticMarkdown },
    data()
    {
        return {
            markdown: '',
        };
    },
    async asyncData({ store, app })
    {
        let linkId = 'gnu-szi';
        await store.dispatch('loading/clearLoading', null, { root: true });
        await store.dispatch('articles/loadArticle', { linkId },
                             { root: true });
        let article = store.getters['articles/article'];
        return {
            markdown: article && article.markdown
                ? app.$mdRender(article.markdown)
                : ''
        };
    },
    async mounted()
    {
        await this.$store.dispatch('loading/clearLoading',
                                   null, { root: true });
    },
};
</script>

