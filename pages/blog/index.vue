<template lang="pug">
    subpage
        section
            h1.display-1 Блог
            BlogPost(v-for="(post, postIndex) in posts",
            :key="postIndex",
            :folded="true",
            :frontmatter="post.frontmatter",
            :extra-component="post.extraComponent",
            :extra-component-params="post.extraComponentParams",
            :standalone="false")
</template>

<script lang="js">
import Subpage from '~/components/Subpage';
import BlogPost from '~/components/BlogPost';

export default {
    name: 'Blog',
    components: { BlogPost, Subpage },
    middleware: ['load-posts'],
    computed: {
        posts()
        {
            if (this && this.$store)
            {
                return this.$store.state.posts.list;
            }
            return [];
        },
    },
    fetch({ store })
    {
        return store.dispatch('posts/loadPosts');
    },
    async created()
    {
        await this.$store.dispatch('posts/loadPosts');
    },
};
</script>

<style lang="sass" scoped>
</style>

