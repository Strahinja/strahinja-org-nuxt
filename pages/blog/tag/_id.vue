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
                                :to="$store.state.pages.list[$store.state.pages.pageIndex].parentUrl"
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
                            {{
                                $store.state.pages.list[
                                    $store.state.pages.pageIndex
                                ].parentName
                            }}
                        </span>
                    </v-tooltip>
                </client-only>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <h3 class="display-1">
                    Чланци са ознаком
                    <span class="highlight">#{{ tagId }}</span>
                </h3>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <section>
                    <BlogPost
                        v-for="(post, postIndex) in posts"
                        :key="postIndex"
                        :folded="true"
                        :frontmatter="post.frontmatter"
                        :render-func="post.renderFunc"
                        :static-render-funcs="post.staticRenderFuncs"
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
    middleware ({store})
    {
        store.commit('pages/setPageIndex', { newIndex:
            store.state.pages.routeIds.PAGE_BLOG_TAG_INDEX });
    },
    head()
    {
        let idx = this.$store.state.pages.pageIndex;
        let globals = {
            title: this.$store.state.pages.list[idx].title + ` #${this.tagId}`,
            description: this.$store.state.pages.list[idx].text + ` #${this.tagId}`,
            url: 'http://strahinja.org'
                + this.$store.state.pages.list[idx].url.path
                + '/' + this.tagId,
            image: this.$store.state.pages.list[idx].image,
            imageAlt: this.$store.state.pages.list[idx].imageAlt,
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
    data()
    {
        return {
            posts: [],
            tagId: this.$route.params.id,
        };
    },
    async asyncData({params, store})
    {
        const resolve = await require.context('~/static/blog', true, /\.md$/);
        var filesList = [];
        await resolve.keys().map(key =>
        {
            return {
                name: key,
                file: resolve(key)
            };
        }).forEach(async fileObj =>
        {
            const attr = fileObj.file.attributes;
            var myParams = {};
            if (attr && attr.extraComponent &&
                attr.extraComponent == 'Gist' &&
                attr.extraComponentParams &&
                attr.extraComponentParams.gistId)
            {
                const gistId = attr.extraComponentParams.gistId;
                const filteredGist = store.getters['gists/gistById'](gistId);
                myParams = {...myParams, ...attr.extraComponentParams};
                if (filteredGist)
                {
                    myParams.gist = filteredGist.data;
                }
            }
            filesList.push({
                frontmatter: {
                    colors: attr.colors,
                    date: attr.date,
                    categories: attr.categories,
                    tags: attr.tags,
                    description: attr.description,
                    image: attr.image,
                    imageAlt: attr.imageAlt,
                    id: attr.id,
                    name: fileObj.name
                        .replace(/\.\//, '').replace(/\.md$/, ''),
                    related: attr.related,
                    title: attr.title,
                },
                renderFunc: fileObj.file.vue.render,
                staticRenderFuncs: fileObj.file.vue.staticRenderFns,
                extraComponent: attr.extraComponent,
                extraComponentParams: myParams
            });
        });
        filesList = filesList.filter(filesListItem =>
        {
            return filesListItem.frontmatter.tags &&
                filesListItem.frontmatter.tags.indexOf(params.id) != -1;
        });
        await filesList.sort((fileListItem1, fileListItem2) =>
        {
            return fileListItem1.frontmatter.date >
                fileListItem2.frontmatter.date ? -1 : 1;
        });
        return {
            posts: filesList,
            tagId: params.id,
        };
    },
    async mounted()
    {
        const resolve = await require.context('~/static/blog', true, /\.md$/);
        var filesList = [];
        await resolve.keys().map(key =>
        {
            return {
                name: key,
                file: resolve(key)
            };
        }).forEach(async fileObj =>
        {
            const attr = fileObj.file.attributes;
            var myParams = {};
            if (attr && attr.extraComponent &&
                attr.extraComponent == 'Gist' &&
                attr.extraComponentParams &&
                attr.extraComponentParams.gistId)
            {
                const gistId = attr.extraComponentParams.gistId;
                const filteredGist = store.getters['gists/gistById'](gistId);
                myParams = {...myParams, ...attr.extraComponentParams};
                if (filteredGist)
                {
                    myParams.gist = filteredGist.data;
                }
            }
            filesList.push({
                frontmatter: {
                    colors: attr.colors,
                    date: attr.date,
                    categories: attr.categories,
                    tags: attr.tags,
                    description: attr.description,
                    image: attr.image,
                    imageAlt: attr.imageAlt,
                    id: attr.id,
                    name: fileObj.name
                        .replace(/\.\//, '').replace(/\.md$/, ''),
                    related: attr.related,
                    title: attr.title,
                },
                renderFunc: fileObj.file.vue.render,
                staticRenderFuncs: fileObj.file.vue.staticRenderFns,
                extraComponent: attr.extraComponent,
                extraComponentParams: myParams
            });
        });
        filesList = filesList.filter(filesListItem =>
        {
            return filesListItem.frontmatter.tags &&
                filesListItem.frontmatter.tags.indexOf(
                    this.$route.params.id) != -1;
        });
        await filesList.sort((fileListItem1, fileListItem2) =>
        {
            return fileListItem1.frontmatter.date >
                fileListItem2.frontmatter.date ? -1 : 1;
        });
        return {
            posts: filesList,
            tagId: this.$route.params.id,
        };
    }
};
</script>

<style lang="sass" scoped>
</style>

