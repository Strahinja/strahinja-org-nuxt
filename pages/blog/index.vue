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
                            :to="'/'"
                            color="secondary"
                            class="hidden-xs-only text-center align-center mr-3
                               mt-1"
                            v-on="on">
                            <v-icon dark class="align-center">
                                mdi-arrow-left
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Назад на почетну</span>
                </v-tooltip>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <section>
                    <BlogPost
                        v-for="(file, fileIndex) in files"
                        :key="fileIndex"
                        :frontmatter="file.frontmatter"
                        :markdown="file.markdown" />
                </section>
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
    computed: {
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
    //eslint-disable-next-line no-unused-vars
    async asyncData({params, app})
    {
        const resolve = await require.context('~/static/blog', true, /\.md$/);
        //console.log('index.asyncData: resolve = ', resolve);
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
            console.log('index.asyncData: attr = ', attr);
            filesList.push({
                frontmatter: {
                    colors: attr.colors,
                    date: attr.date,
                    categories: attr.categories,
                    tags: attr.tags,
                    description: attr.description,
                    id: attr.id,
                    name: fileObj.file.name,
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
        console.log('index.asyncData: after forEach: files = ', filesList);
        return {
            files: filesList,
        };
    },
};
</script>

<style lang="sass">
</style>

