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
                <client-only>
                    <v-tooltip
                        v-if="showBackButton"
                        class="hidden-xs-only"
                        bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn
                                v-if="showBackButton"
                                fab depressed dark small
                                :to="parentUrl"
                                color="secondary"
                                class="hidden-xs-only text-center align-center mr-3
                               mt-1"
                                v-on="on">
                                <v-icon dark class="align-center">
                                    mdi-arrow-left
                                </v-icon>
                            </v-btn>
                        </template>
                        <span>Назад на
                            {{ parentName }}
                        </span>
                    </v-tooltip>
                </client-only>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <section>
                    <h3 class="display-1">
                        Чланци са ознаком
                        <span class="highlight">#{{ tagId }}</span>
                    </h3>
                    <BlogPost
                        v-for="(post, postIndex) in posts"
                        :key="postIndex"
                        :folded="true"
                        :frontmatter="post.frontmatter"
                        :extra-component="post.extraComponent"
                        :extra-component-params="post.extraComponentParams"
                        :highlight="tagId"
                        :standalone="false" />
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import BlogPost from '~/components/BlogPost.vue';

export default {
    name: 'BlogByTag',
    components: { BlogPost },
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
        parentUrl()
        {
            if (this && this.page)
            {
                return this.page.parentUrl;
            }
            return '/';
        },
        parentName()
        {
            if (this && this.page)
            {
                return this.page.parentName;
            }
            return 'почетну страницу';
        },
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
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

