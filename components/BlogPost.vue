<template>
    <article
        class="blog-post mb-10"
        :class="{'folded': folded,
                 'standalone': standalone}">
        <header>
            <nuxt-link
                :to="`/blog/${frontmatter.name}`">
                <h3 v-if="standalone" :id="frontmatter.id" class="display-1">
                    {{ frontmatter.title }}
                </h3>
                <h4 v-else :id="frontmatter.id">
                    {{ frontmatter.title }}
                </h4>
            </nuxt-link>
            <!--eslint-disable-next-line vue/html-self-closing-->
            <a :name="frontmatter.name"></a>
            <client-only>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <h4 v-if="standalone">
                            <nuxt-link
                                :to="`/blog/${frontmatter.name}`">
                                <time
                                    :datetime="frontmatter.date"
                                    v-on="on">
                                    {{ formatDate(frontmatter.date) }}
                                </time>
                            </nuxt-link>
                        </h4>
                        <h5 v-else>
                            <nuxt-link
                                :to="`/blog/${frontmatter.name}`">
                                <time
                                    :datetime="frontmatter.date"
                                    v-on="on">
                                    {{ formatDate(frontmatter.date) }}
                                </time>
                            </nuxt-link>
                        </h5>
                    </template>
                    <span>Пермалинк</span>
                </v-tooltip>
            </client-only>
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
        <v-container class="py-0 pb-5 ml-0">
            <v-row>
                <v-col :cols="12" :lg="10" class="py-0">
                    <DynamicMarkdown
                        :highlight="highlight"
                        :extra-component="extraComponent"
                        :extra-component-params="extraComponentParams"
                        :render-func="renderFunc"
                        :static-render-funcs="staticRenderFuncs" />
                        <!-- :component="component" -->
                </v-col>
            </v-row>
            <div v-ripple class="folded-overlay col-lg-10 col-12" @click="toggleFolded">
                <div class="folded-overlay-inner">
                    <v-btn
                        color="accent"
                        class="black--text"
                        elevation="12">
                        <v-icon>
                            {{ folded
                                ? 'mdi-chevron-down'
                                : 'mdi-chevron-up' }}
                        </v-icon>
                        <span v-if="folded">Прикажи чланак</span>
                        <span v-else>Сакриј чланак</span>
                    </v-btn>
                </div><!--folded-overlay-inner-->
            </div><!--folded-overlay-->
        </v-container>
        <footer>
            <div v-if="hasTags" class="tags-container">
                Ознаке:
                <ul class="tags">
                    <li
                        v-for="(tag, tagIndex) in frontmatter.tags"
                        :key="tagIndex"
                        :class="{'highlight': tag==highlight}">
                        <nuxt-link :to="tagUrl(tag)">
                            #{{ tag }}
                        </nuxt-link>
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
        folded: { type: Boolean, default: false },
        frontmatter: { type: Object, default: () => ({}) },
        //component: { type: Object, default: null },
        renderFunc: { type: Object, default: () => ({}) },
        staticRenderFuncs: { type: Array, default: () => ([]) },
        extraComponent: { type: Object, default: null },
        extraComponentParams: { type: Object, default: null },
        highlight: { type: String, default: '' },
        standalone: { type: Boolean, default: true },
    },
    computed: {
        hasTags()
        {
            return this.frontmatter.tags && this.frontmatter.tags.length>0;
        },
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
        tagUrl(tag)
        {
            return `/blog/tag/${tag}`;
            //return `http://strahinja.org/blog/tag/${tag}`;
        },
        toggleFolded()
        {
            this.folded = !this.folded;
            this.$nextTick(() =>
            {
                if (this.folded)
                {
                    this.$vuetify.goTo(`#${this.frontmatter.id}`, {
                        duration: 500
                    });
                }
            });
        }
    },
};
</script>

<style lang="sass">
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'

article.blog-post > header a
    color: $permalink-color !important
    text-decoration: none

article.blog-post > .container
    height: auto
    transition: all .3s ease

article.blog-post.folded > .container
    position: relative
    max-height: 15em
    height: 15em
    overflow: hidden
    transition: all .3s ease

article.blog-post > .container .row
    opacity: 1
    transition: all .3s ease

article.blog-post.folded > .container .row
    opacity: .5

article.blog-post .folded-overlay
    position: relative
    text-align: center

article.blog-post.folded .folded-overlay
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0

article.blog-post.standalone .folded-overlay
    display: none

article.blog-post.folded .folded-overlay .folded-overlay-inner
    display: block
    position: absolute
    cursor: pointer
    top: 0
    bottom: 0
    left: 0
    right: 0
    text-decoration: none

article.blog-post.folded .folded-overlay .folded-overlay-inner::before
    content: ' '
    display: inline-block
    height: 100%
    vertical-align: middle

article.blog-post.folded .folded-overlay .folded-overlay-inner::after
    content: ' '
    display: block
    position: absolute
    top: 100%
    height: 4em
    margin-top: -4em
    left: 0
    right: 0
    background: linear-gradient(0deg, #fff, transparent)

article.blog-post.folded .folded-overlay-container a .v-btn
    display: inline-block
    vertical-align: middle

article.blog-post.standalone h4
    font-size: .83em

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

.tags > li > a
    color: $tag-color !important
    text-decoration: none

span.highlight,
.tags > li.highlight > a
    color: $highlight-color !important
    background-color: $highlight-background-color !important
    box-shadow: 1px 1px 3px rgba(0,0,0,.8)

</style>
