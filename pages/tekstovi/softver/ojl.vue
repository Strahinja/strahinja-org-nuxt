<template lang="pug">
    static-markdown(:markdown="markdown")
</template>

<script>
import StaticMarkdown from '~/components/StaticMarkdown';
export default {
    name: 'Ojl',
    components: { StaticMarkdown },
    data()
    {
        return {
            markdown: '',
        };
    },
    async asyncData({ store, app })
    {
        let linkId = 'ojl';
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

