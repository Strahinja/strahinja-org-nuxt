<template lang="pug">
    subpage(:override-head="true")
        section(:key="q")
            h1.display-1(v-if="q && q.length>0").
                Претрага: #[span.highlight {{ q }}]
            h1.display-1(v-else=true) Претрага
            v-form(ref="pageSearchForm",
            v-model="searchFormValid",
            @submit.prevent="onSearchFormSubmit()")
                v-container.ml-0
                    v-row
                        v-col.pa-0
                            v-text-field(ref="searchFormSearchTextField",
                            v-model="searchText",
                            name="q",
                            :value="q",
                            :rules="searchTextRules",
                            :counter="maxSearchTextLength",
                            label="Тражени текст",
                            text=true,
                            autofocus=true,
                            color="black--text",
                            outlined=true,
                            hover=true,
                            prepend-inner-icon="mdi-magnify",
                            solo=true,
                            clearable=true,
                            required=true,
                            @input="onSearchTextInput()")
            blog-post(v-for="post,postIndex in posts"
            :key="postIndex"
            :document="post"
            :folded="true"
            :highlight="q"
            :standalone="false")
            no-results(v-if="posts.length==0")
</template>

<script>
//import Subpage from '~/components/Subpage';
//import BlogPost from '~/components/BlogPost.vue';
//import NoResults from '~/components/NoResults.vue';

export default {
    name: 'SearchIndex',
    //components: { BlogPost, NoResults, Subpage },
    watchQuery: true,
    middleware: ['load-posts'],
    data()
    {
        return {
            maxSearchTextLength: 255,
            searchSubmitTimeout: 1000,
            submitTimeout: null,
            searchFormValid: false,
            searchText: this.q,
            searchTextRules: [
                v => !!v && v.length>0 || 'Мора се задати текст',
                v => !!v && v.length<this.maxSearchTextLength ||
                    `Текст мора бити мањи од ${this.maxSearchTextLength} знакова`,
            ],
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
        /*
         *posts()
         *{
         *    if (this && this.$content)
         *    {
         *        return this.$store.getters['posts/postsBySearchTerm'](this.q);
         *    }
         *    return [];
         *},
         */
        q()
        {
            if (this && this.$route && this.$route.query.q)
            {
                return this.$route.query.q;
            }
            return '';
        },
    },
    /*
     *async fetch({ store })
     *{
     *    await store.dispatch('posts/loadPosts');
     *},
     */
    async asyncData({ $content, store, route })
    {
        let posts = await $content('blog', { text: true }).search(route.query.q).fetch();
        posts.forEach(async (post) =>
        {
            if (post.gistId)
            {
                try
                {
                    await store.dispatch('gists/loadGist',
                                         { gistId: post.gistId });
                    const gist = store.getters['gists/gistById'](post.gistId);
                    if (!gist)
                    {
                        throw 'Неуспешно учитавање гиста';
                    }
                    post.gist = gist.data;
                }
                catch(err)
                {
                    console.error('pages/search/index.vue: ', err);
                }
            }
        });
        return {
            posts,
        };
    },
    mounted()
    {
        this.$refs.searchFormSearchTextField.$el.focus();
        this.searchText = this.q;
    },
    methods: {
        clearSubmitTimeout()
        {
            if (this.submitTimeout)
            {
                clearTimeout(this.submitTimeout);
                this.submitTimeout = null;
            }
        },
        submitSearch()
        {
            this.$router.push({ name: 'search', query: { q: this.searchText } });
        },
        onSearchFormSubmit()
        {
            this.clearSubmitTimeout();
            if (!this.$refs.pageSearchForm.validate())
            {
                return;
            }
            this.submitSearch();
        },
        onSearchTextInput()
        {
            this.clearSubmitTimeout();
            if (!this.$refs.pageSearchForm.validate())
            {
                return;
            }
            this.submitTimeout = setTimeout(() =>
            {
                this.clearSubmitTimeout();
                this.submitSearch();
            }, this.searchSubmitTimeout);
        }
    },
    head()
    {
        let globals = {
            title: this.page.title + `: ${this.q}`,
            description: this.page.text + `: ${this.q}`,
            url: 'https://strahinja.org'
                + this.page.path
                + '?q=' + this.q,
            image: this.page.image,
            imageAlt: this.page.imageAlt,
        };
        return {
            meta: [
                { name: 'robots', content: 'noindex' },
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

