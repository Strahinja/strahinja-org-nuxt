<template lang="pug">
    subpage(override-head
    source-url)
        blog-post(v-if="document"
        :document="document")
</template>

<script>
export default {
    name: 'BlogSlug',
    data()
    {
        return {
            document: {},
        };
    },
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
            return this && this.document && this.document.slug
                ? this.document.slug
                : '';
        }
    },
    head()
    {
        const doc = this ? this.document : null;
        let globals = {
            title: doc && doc.title ? doc.title : 'Ненасловљени чланак',
            description: doc && doc.description ? doc.description : 'Чланак без описа',
            parentUrl: 'https://strahinja.org/blog',
            url: doc && doc.name ?
                `https://strahinja.org/blog/${doc.name}` :
                'https://strahinja.org/blog',
            date: doc && doc.date ? doc.date : new Date().toISOString(),
            image: doc && doc.image ? doc.image :
                this.page.image,
            imageAlt: doc && doc.imageAlt ? doc.imageAlt :
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
                /*
                 *{
                 *    rel: 'stylesheet',
                 *    href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.11.1/katex.min.css'
                 *},
                 */
                { hid: 'canonical', rel: 'canonical', href: globals.url },
                { hid: 'directory', rel: 'directory', href: globals.parentUrl }
            ],
            title: globals.title,
            description: globals.description,
        };
    },
    jsonld()
    {
        if (!this || !this.document)
        {
            return {};
        }

        const doc = this.document;
        let globals = {
            title: doc && doc.title ? doc.title : 'Ненасловљени чланак',
            description: doc && doc.description ? doc.description :
                'Чланак без описа',
            parentUrl: 'https://strahinja.org/blog',
            url: doc && doc.name ?
                `https://strahinja.org/blog/${doc.name}` :
                'https://strahinja.org/blog',
            date: doc && doc.date ? doc.date : new Date().toISOString(),
            image: doc && doc.image ? doc.image :
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
    async asyncData({ $content, params, error, store })
    {
        let document;
        try
        {
            document = await $content(`blog/${params.slug}`).fetch();
            //console.log('asyncData: document = ', document);
            if (!document)
            {
                error({ statusCode: 404, message: 'Чланак није пронађен' });
            }

            if (document.gistId)
            {
                try
                {
                    await store.dispatch('gists/loadGist', { gistId: document.gistId });
                    const gist = store.getters['gists/gistById'](document.gistId);
                    if (!gist)
                    {
                        throw 'Неуспешно учитавање';
                    }
                    document.gist = gist.data;
                    /*
                     *console.log('pages/cont/_slug.vue: loaded gist: ',
                     *            document.gist);
                     */
                }
                catch(err)
                {
                    error({ statusCode: 500,
                        message: `Гист ${document.gistId} не може да се учита` });
                }
            }
        }
        catch(err)
        {
            error({ statusCode: 500, message: err });
            //console.error('pages/cont/slug: ', err);
        }
        return {
            document,
        };
    }
};
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'
</style>
