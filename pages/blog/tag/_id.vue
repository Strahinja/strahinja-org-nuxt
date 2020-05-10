<template lang="pug">
    subpage(override-head)
        section
            h1.display-1.
                Чланци са ознаком #[span.highlight {{ '\#' + tagId }}]
            BlogPost(v-for="(post, postIndex) in posts",
            :key="postIndex",
            :folded="true",
            :frontmatter="post.frontmatter",
            :extra-component="post.extraComponent",
            :extra-component-params="post.extraComponentParams",
            :highlight="tagId",
            :standalone="false")
</template>

<script>
import Subpage from '~/components/Subpage';
import BlogPost from '~/components/BlogPost';

export default {
    name: 'BlogByTag',
    components: { BlogPost, Subpage },
    watchQuery: true,
    middleware: ['load-posts'],
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
        posts()
        {
            if (this && this.$store)
            {
                return this.$store.getters['posts/postsByTag'](this.$route.params.id);
            }
            return [];
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
    fetch({ store })
    {
        return store.dispatch('posts/loadPosts');
    },
    async created()
    {
        await this.$store.dispatch('posts/loadPosts');
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
};
</script>

<style lang="sass" scoped>
</style>

