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
                            :to="$store.state.pages.pages[$store.state.pages.pageIndex].parentUrl"
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
                            $store.state.pages.pages[
                                $store.state.pages.pageIndex
                            ].parentName
                        }}
                    </span>
                </v-tooltip>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <h3>Чланци са ознаком #{{ tagId }}</h3>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <section>
                    <BlogPost
                        v-for="(file, fileIndex) in files"
                        :key="fileIndex"
                        :folded="true"
                        :frontmatter="file.frontmatter"
                        :markdown="file.markdown"
                        :standalone="false" />
                </section>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'BlogByTag',
    head()
    {
        let idx = this.$store.state.pages.pageIndex;
        let globals = {
            title: this.$store.state.pages.pages[idx].title,
            description: this.$store.state.pages.pages[idx].text,
            url: 'http://strahinja.org/'
                + this.$store.state.pages.pages[idx].url.path
                + '/' + this.tagId,
            image: this.$store.state.pages.pages[idx].image,
            imageAlt: this.$store.state.pages.pages[idx].imageAlt,
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
    async asyncData({params})
    {
        const resolve = await require.context('~/static/blog', true, /\.md$/);
        let filesList = [];
        await resolve.keys().map(key =>
        {
            return {
                name: key,
                file: resolve(key)
            };
        }).forEach(fileObj =>
        {
            const attr = fileObj.file.attributes;
            console.log('tag.asyncData: attr = ', attr);
            filesList.push({
                frontmatter: {
                    colors: attr.colors,
                    date: attr.date,
                    categories: attr.categories,
                    tags: attr.tags,
                    description: attr.description,
                    id: attr.id,
                    name: fileObj.name
                        .replace(/\.\//, '').replace(/\.md$/, ''),
                    related: attr.related,
                    title: attr.title,
                },
                markdown: {
                    renderFunc: fileObj.file.vue.render,
                    staticRenderFuncs: fileObj.file.vue.staticRenderFns,
                    extraComponent: attr.extraComponent
                }
            });
        });
        filesList = filesList.filter(filesListItem =>
        {
            return filesListItem.tags && filesListItem.tags.indexOf(params.id) != -1;
        });
        filesList.sort((fileListItem1, fileListItem2) =>
        {
            return fileListItem1.date > fileListItem2.date;
        });
        return {
            files: filesList,
            tagId: params.id,
        };
    },
    updated()
    {
        this.setpageIndex();
    },
    mounted()
    {
        this.setpageIndex();
    },
    methods: {
        setpageIndex()
        {
            this.$store.commit('pages/setPageIndex', { newIndex:
                this.$store.state.pages.routeIds.PAGE_BLOG_TAG_INDEX });
        }
    },
};
</script>

<style lang="sass" scoped>
</style>

