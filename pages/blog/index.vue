<template lang="pug">
    subpage(source-url)
        section
            h1.display-1 Блог
            blog-post(v-for="(post, postIndex) in posts"
            :key="postIndex"
            :folded="postIndex>0"
            :document="post"
            :standalone="false")
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
    computed:
    {
        page()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/pageById'](
                    this.$store.state.pages.pageId);
            }
            else
            {
                return null;
            }
        },
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
            if (!posts)
            {
                error({ statusCode: 404, message: 'Чланци се не могу учитати' });
            }
            posts.forEach(async (post) =>
            {
                if (post.gistId)
                {
                    try
                    {
                        await store.dispatch('gists/loadGist', {
                            gistId: post.gistId
                        });
                        const gist = store.getters['gists/gistById'](
                            post.gistId
                        );
                        if (gist)
                        {
                            post.gist = gist.data;
                        }
                    }
                    catch (err)
                    {
                        error({ statusCode: 500,
                            message: `Гист ${post.gistId} не може да се учита`
                        });
                    }
                }

            });
        }
        catch(err)
        {
            error({ statusCode: 500,
                message: 'Чланци не могу да се учитају' });
        }
        return {
            posts,
        };
    },
    async mounted()
    {
        let posts = [];
        try
        {
            posts = await this.$content('blog')
                .where({ visible: { $eq: true } })
                .sortBy('date', 'desc')
                .limit(5)
                .fetch();

            if (!posts)
            {
                this.$nuxt.error({ statusCode: 404,
                    message: 'Чланци се не могу учитати'});
            }
            posts.forEach(async (post) =>
            {
                if (post.gistId)
                {
                    try
                    {
                        await this.$store.dispatch('gists/loadGist', {
                            gistId: post.gistId
                        });
                        const gist = this.$store.getters['gists/gistById'](
                            post.gistId
                        );
                        if (gist)
                        {
                            post.gist = gist.data;
                        }
                    }
                    catch (err)
                    {
                        this.$nuxt.error({ statusCode: 500,
                            message: `Гист ${post.gistId} не може да се учита`
                        });
                    }
                }
            });
        }
        catch(err)
        {
            this.$nuxt.error({ statusCode: 500,
                message: 'Чланци не могу да се учитају' });
        }

        this.posts = posts;
    }
};
</script>

<style lang="sass" scoped>
</style>

