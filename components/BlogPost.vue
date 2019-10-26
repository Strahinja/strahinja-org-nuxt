<template>
    <article class="mb-10">
        <header>
            <h3 class="display-1">
                {{ frontmatter.title }}
            </h3>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <nuxt-link
                        :to="'/blog/'+frontmatter.name"
                        v-on="on">
                        <time :datetime="frontmatter.date" class="subtitle-1">
                            {{ formatDate(frontmatter.date) }}
                        </time>
                    </nuxt-link>
                </template>
                <span>Пермалинк</span>
            </v-tooltip>
            <div class="categories-container">
                Категорије:
                <ul class="categories">
                    <li
                        v-for="(category, categoryIndex) in
                            frontmatter.categories"
                        :key="categoryIndex">
                        {{ category }}
                    </li>
                </ul>
            </div><!--categories-->
        </header>
        <v-container class="py-0 pb-5">
            <v-row>
                <v-col :cols="10" :lg="8" class="py-0">
                    <DynamicMarkdown
                        :render-func="markdown.renderFunc"
                        :static-render-funcs="markdown.staticRenderFuncs"
                        :extra-component="markdown.extraComponent" />
                </v-col>
            </v-row>
        </v-container>
        <footer>
            <div v-if="hasTags" class="tags-container">
                Ознаке:
                <ul class="tags">
                    <li
                        v-for="(tag, tagIndex) in frontmatter.tags"
                        :key="tagIndex">
                        #{{ tag }}
                    </li>
                </ul>
            </div><!--tags-container-->
        </footer>
    </article>
</template>

<script>
import DynamicMarkdown from '~/components/DynamicMarkdown.vue';
export default {
    name: 'BlogPost',
    components: { DynamicMarkdown },
    props: {
        frontmatter: { type: Object, default: () => ({}) },
        markdown: { type: Object, default: () => ({}) }
    },
    computed: {
        hasTags()
        {
            return this.frontmatter.tags && this.frontmatter.tags.length>0;
        }
    },
    methods: {
        formatDate(str)
        {
            //eslint-disable-next-line no-unused-vars
            let [date, time] = str.split('T');
            let [year, month, day] = date.split('-');
            const monthNames = [
                '',
                'јан', 'феб', 'мар',
                'апр', 'мај', 'јун',
                'јул', 'авг', 'сеп',
                'окт', 'нов', 'дец',
            ];
            return '' + day + '. '
                + monthNames[month] + ' '
                + year + '.';
        },
    },
};
</script>

<style lang="sass">
@import '~/assets/sass/code.sass'

article > header > a
    color: $permalink-color !important
    text-decoration: none

.categories-container
    text-transform: uppercase
    font-size: .7rem
    color: $smallprint-color

.categories
    list-style-type: none
    padding-left: 0 !important
    display: inline-block
    margin-left: 0.5rem

.categories > li
    display: inline-block
    border-radius: .4rem
    margin-right: .5rem
    color: $category-color

.tags-container
    text-transform: uppercase
    font-size: .7rem
    color: $smallprint-color
    margin-left: 12px !important

.tags
    list-style-type: none
    padding-left: 0 !important
    display: inline-block
    margin-left: 0.5rem

.tags > li
    display: inline-block
    background: var(--v-secondary-lighten1)
    border-radius: .4rem
    margin-right: .5rem
    padding: 0 .5rem
    box-shadow: 1px 1px 3px
    font-size: .7rem
    font-weight: bold
    text-transform: none
    color: $tag-color
</style>
