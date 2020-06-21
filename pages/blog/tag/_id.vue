<template lang="pug">
    subpage(override-head)
        section
            h1.display-1.
                Чланци са ознаком #[span.highlight {{ '\#' + tagId }}]
            blog-post(v-for="(post, postIndex) in posts"
            :key="postIndex"
            :folded="true"
            :document="post"
            :highlight="tagId"
            :standalone="false")
</template>

<script>
export default {
    name: 'BlogTag',
    watchQuery: true,
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
        tagId()
        {
            if (this && this.$route)
            {
                return this.$route.params.id;
            }
            return '';
        },
    },
    head()
    {
        let globals = {
            title: this.page.title + ` #${this.tagId}`,
            description: this.page.text + ` #${this.tagId}`,
            url: 'https://strahinja.org'
                + this.page.path
                + '/' + this.tagId,
            image: this.page.image,
            imageAlt: this.page.imageAlt,
        };
        return {
            meta: [
                { hid: 'og:url', name: 'og:url', property: 'og:url', content: globals.url },
                { hid: 'og:title', name: 'og:title', property: 'og:title', content: globals.title },
                { hid: 'og:description', name: 'og:description', property: 'og:description', content: globals.description },
                { hid: 'og:image', name: 'og:image', property: 'og:image', content: globals.image},
                { hid: 'og:image:alt', name: 'og:image:alt', property: 'og:image:alt', content: globals.imageAlt },
                { hid: 'twitter:url', name: 'twitter:url', content: globals.url },
                { hid: 'twitter:title', name: 'twitter:title', content: globals.title },
                { hid: 'twitter:description', name: 'twitter:description', content: globals.description },
                { hid: 'twitter:image', name: 'twitter:image', content:
                    globals.image},
                { hid: 'name', name: 'name', itemprop: 'name', content: globals.title },
                { hid: 'description', name: 'description', itemprop: 'description', content: globals.description },
                { hid: 'image', name: 'image', itemprop: 'image', content: globals.image},
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css'
                },
                { hid: 'canonical', rel: 'canonical', href: globals.url }
            ],
            title: globals.title,
            description: globals.description,
        };
    },
    async asyncData({ $content, error, store, route })
    {
        let posts = [];
        try
        {
            posts = await $content('blog')
                .where({ $and: [
                    { visible: { $eq: true } },
                    { tags: { $contains: route.params.id } },
                ] })
                .sortBy('date', 'desc')
                .limit(5)
                .fetch();
            posts.forEach(async (post) =>
            {
                if (post.gistId)
                {
                    try
                    {
                        console.log(`pages/blog/tag[${post.gistId}]: calling loadGist`);
                        await store.dispatch('gists/loadGist', {
                            gistId: post.gistId
                        });
                        const gist = store.getters['gists/gistById'](
                            post.gistId
                        );
                        console.log(`pages/blog/tag[${post.gistId}]: gist = `,
                                    gist);
                        if (gist)
                        {
                            post.gist = gist.data;
                        }
                    }
                    catch(err)
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
            console.error('pages/blog/tag: error= ', err);
            error({ statusCode: 500,
                message: 'Чланци не могу да се учитају' });
        }
        return {
            posts
        };
    },
    async mounted()
    {
        let posts = [];
        try
        {
            posts = await this.$content('blog')
                .where({ $and: [
                    { visible: { $eq: true } },
                    { tags: { $contains: this.tagId } },
                ] })
                .sortBy('date', 'desc')
                .limit(5)
                .fetch();
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
                    catch(err)
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
            console.error('pages/blog/tag: error= ', err);
            this.$nuxt.error({ statusCode: 500,
                message: 'Чланци не могу да се учитају' });
        }
        this.posts = posts;
    },
};
</script>

<style lang="sass" scoped>
</style>

