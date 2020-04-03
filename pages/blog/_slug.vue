<template lang="pug">
    subpage(:override-head="true")
        BlogPost(v-if="post",
        :frontmatter="post.frontmatter"
        :extra-component="post.extraComponent"
        :extra-component-params="post.extraComponentParams")
</template>

<script lang="js">
import Subpage from '~/components/Subpage';
import BlogPost from '~/components/BlogPost';

export default {
    name: 'BlogSlug',
    components: { BlogPost, Subpage },
    middleware: ['load-posts'],
    computed: {
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
        slug()
        {
            if (this && this.$route)
            {
                return this.$route.params.slug;
            }
            return '';
        },
        post()
        {
            if (this && this.$store)
            {
                return this.$store.getters['posts/postBySlug'](
                    this.$route.params.slug);
            }
            return {};
        },
    },
    async asyncData({ store, route, error })
    {
        await store.dispatch('posts/loadPosts');
        if (!store.getters['posts/postBySlug'](route.params.slug))
        {
            error({ statusCode: 404, message: 'Чланак није пронађен'});
        }
    },

    fetch({ store })
    {
        return store.dispatch('posts/loadPosts');
    },

    head()
    {
        const fm = this.post ? this.post.frontmatter : null;
        let globals = {
            title: fm && fm.title ? fm.title : 'Ненасловљени чланак',
            description: fm && fm.description ? fm.description : 'Чланак без описа',
            parentUrl: 'https://strahinja.org/blog',
            url: fm && fm.name ?
                `https://strahinja.org/blog/${fm.name}` :
                'https://strahinja.org/blog',
            date: fm && fm.date ? fm.date : new Date().toISOString(),
            image: fm && fm.image ? fm.image :
                this.page.image,
            imageAlt: fm && fm.imageAlt ? fm.imageAlt :
                this.page.imageAlt,
        };
        return {
            meta: [
                { hid: 'og:url', name: 'og:url', property: 'og:url',
                    content: globals.url },
                { hid: 'og:title', name: 'og:title', property: 'og:title',
                    content: globals.title },
                { hid: 'og:description', name: 'og:description', property:
                    'og:description', content: globals.description },
                { hid: 'og:image', name: 'og:image', property: 'og:image',
                    content: globals.image},
                { hid: 'og:image:alt', name: 'og:image:alt', property:
                    'og:image:alt', content: globals.imageAlt },
                { hid: 'twitter:url', name: 'twitter:url',
                    content: globals.url },
                { hid: 'twitter:title', name: 'twitter:title', content:
                    globals.title },
                { hid: 'twitter:description', name: 'twitter:description',
                    content: globals.description },
                { hid: 'twitter:image', name: 'twitter:image', content:
                    globals.image},
                { hid: 'name', name: 'name', itemprop: 'name', content:
                    globals.title },
                { hid: 'description', name: 'description', itemprop:
                    'description', content: globals.description },
                { hid: 'image', name: 'image', itemprop: 'image', content:
                    globals.image},
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css'
                },
                { hid: 'canonical', rel: 'canonical', href: globals.url },
                { hid: 'directory', rel: 'directory', href: globals.parentUrl }
            ],//.concat(tagsMeta),
            title: globals.title,
            description: globals.description,
        };
    },
    jsonld()
    {
        if (!this || !this.post || !this.post.frontmatter)
        {
            return {};
        }

        const fm = this.post.frontmatter;
        let globals = {
            title: fm && fm.title ? fm.title : 'Ненасловљени чланак',
            description: fm && fm.description ? fm.description :
                'Чланак без описа',
            parentUrl: 'https://strahinja.org/blog',
            url: fm && fm.name ?
                `https://strahinja.org/blog/${fm.name}` :
                'https://strahinja.org/blog',
            date: fm && fm.date ? fm.date : new Date().toISOString(),
            image: fm && fm.image ? fm.image :
                'https://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
        };
        return {
            '@context': 'https://schema.org',
            '@type': 'Article',
            'name': globals.title,
            'author': {
                '@type': 'Person',
                'name': 'Страхиња Радић'
            },
            'datePublished': globals.date,
            'url': globals.url
        };
    },
};
</script>

<style lang="sass" scoped>
</style>

