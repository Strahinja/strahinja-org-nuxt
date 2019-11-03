<template>
    <v-container fluid>
        <v-row
            class="mt-3 mb-7"
            no-gutters>
            <v-col
                v-if="showBackButton"
                :sm="1"
                align="center"
                class="text-center hidden-xs-only"
                style="min-width: 60px;">
                <v-tooltip
                    v-if="showBackButton"
                    class="hidden-xs-only"
                    bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-if="showBackButton"
                            fab depressed dark small
                            :to="$store.state.pages.list[$store.state.pages.pageIndex].parentUrl"
                            v-on="on"
                            color="secondary"
                            class="hidden-xs-only text-center align-center mr-3
                               mt-1">
                            <v-icon dark class="align-center">
                                mdi-arrow-left
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Назад на
                        {{
                            $store.state.pages.list[
                                $store.state.pages.pageIndex
                            ].parentName
                        }}
                    </span>
                </v-tooltip>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <BlogPost
                    :frontmatter="frontmatter"
                    :markdown="markdown" />
            </v-col>
        </v-row>
    </v-container>
    <!--client-only>
    </client-only-->
</template>

<script lang="js">
//import path from 'path';
import BlogPost from '~/components/BlogPost.vue';

export default {
    name: 'Blog',
    components: { BlogPost },
    middleware ({store})
    {
        store.commit('pages/setPageIndex', { newIndex:
            store.state.pages.routeIds.PAGE_BLOG_POST });
    },
    head()
    {
        let idx = this.$store.state.pages.pageIndex;
        let globals = {
            title: this.frontmatter && this.frontmatter.title ?
                this.frontmatter.title : 'Ненасловљени чланак',
            description: this.frontmatter && this.frontmatter.description ?
                this.frontmatter.description : 'Чланак без описа',
            parentUrl: 'http://strahinja.org/blog',
            url: this.frontmatter && this.frontmatter.name ?
                `http://strahinja.org/blog/${this.frontmatter.name}` :
                'http://strahinja.org/blog',
            date: this.frontmatter && this.frontmatter.date ?
                this.frontmatter.date : new Date().toISOString(),
            image: this.frontmatter && this.frontmatter.image ?
                this.frontmatter.image :
                this.$store.state.pages.list[idx].image,
            imageAlt: this.frontmatter && this.frontmatter.imageAlt ?
                this.frontmatter.imageAlt :
                this.$store.state.pages.list[idx].imageAlt,
        };
        /*let tagsMeta = [];
        this.frontmatter.tags.forEach(tag => {
            tagsMeta.push({
                rel: 'tag',
                href: `http://strahinja.org/tags/${tag}` 
            });
        });*/
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
                { hid: 'canonical', rel: 'canonical', href: globals.url },
                { hid: 'directory', rel: 'directory', href: globals.parentUrl } 
            ],//.concat(tagsMeta),
            title: globals.title,
            description: globals.description,
        };
    },
    data ()
    {
        return {
            pageIndex: this.$store.state.pages.routeIds.PAGE_BLOG_POST,
            frontmatter: {
            },
            markdown: {
            }
        };
    },
    jsonld()
    {
        let globals = {
            title: this.frontmatter && this.frontmatter.title ?
                this.frontmatter.title : 'Ненасловљени чланак',
            description: this.frontmatter && this.frontmatter.description ?
                this.frontmatter.description : 'Чланак без описа',
            parentUrl: 'http://strahinja.org/blog',
            url: this.frontmatter && this.frontmatter.name ?
                `http://strahinja.org/blog/${this.frontmatter.name}` :
                'http://strahinja.org/blog',
            date: this.frontmatter && this.frontmatter.date ?
                this.frontmatter.date : new Date().toISOString(),
            image: this.frontmatter && this.frontmatter.image ?
                this.frontmatter.image :
                'http://strahinja.org/img/preview-blog-strahinja-org.png',
            imageAlt: 'Цртеж врха пенкала са умањеним логом са иницијалима'
                + ' СР и текстом //strahinja.org',
        };
        return {
            '@context': 'http://schema.org',
            '@type': 'Article',
            'name': this.frontmatter && this.frontmatter.title ?
                this.frontmatter.title : 'Ненасловљени чланак',
            'author': {
                '@type': 'Person',
                'name': 'Страхиња Радић'
            },
            'datePublished': this.frontmatter && this.frontmatter.date ?
                this.frontmatter.date : new Date().toISOString(),
            'url': this.frontmatter && this.frontmatter.name ?
                `http://strahinja.org/blog/${this.frontmatter.name}` :
                'http://strahinja.org/blog' 
        };
    },
    fetch() {
    },
    computed: {
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
    asyncData({params})
    {
        return import(`~/static/blog/${params.slug}.md`)
            .then(res => {
                return {
                    frontmatter: {
                        colors: res.attributes.colors,
                        date: res.attributes.date,
                        categories: res.attributes.categories,
                        tags: res.attributes.tags,
                        description: res.attributes.description,
                        image: res.attributes.image,
                        imageAlt: res.attributes.imageAlt,
                        id: res.attributes.id,
                        name: params.slug,
                        related: res.attributes.related,
                        title: res.attributes.title,
                    },
                    markdown: {
                        renderFunc: res.vue.render,
                        staticRenderFuncs: res.vue.staticRenderFns,
                        extraComponent: res.attributes.extraComponent
                    }
                };
            });
    },
};
</script>

<style lang="sass" scoped>
</style>

