<template lang="pug">
    subpage(source-url)
        section
            h1.display-1 Блог
            blog-post(v-for="(post, postIndex) in posts"
            :key="postIndex"
            :folded="postIndex>0"
            :document="post"
            standalone=false)
</template>

<script lang="js">

export default {
    name: 'Blog',
    data()
    {
        return {
            posts: [],
        };
    },
    async asyncData({ $content, error, store })
    {
        let posts = [];
        try
        {
            posts = await $content('blog')
                .where({ visible: { $eq: true } })
                .sortBy('date', 'desc')
                .limit(5)
                .fetch();
        }
        catch(err)
        {
            console.log('pages/blog/index.vue: ', err);
            error({ statusCode: 500,
                message: 'Чланци не могу да се учитају' });
        }
        return {
            posts,
        };
    }
};
</script>

<style lang="sass" scoped>
</style>

