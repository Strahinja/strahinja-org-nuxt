<template>
    <article
        class="blog-post mb-10"
        :class="{'folded': postFolded,
                 'standalone': standalone}">
        <header>
            <nuxt-link
                :to="`/blog/${frontmatter.name}`">
                <h3 v-if="standalone" :id="frontmatter.id" class="display-1">
                    {{ frontmatter.title }}
                </h3>
                <h4 v-else :id="frontmatter.id" ref="title">
                    {{ frontmatter.title }}
                </h4>
            </nuxt-link>
            <!--eslint-disable-next-line vue/html-self-closing-->
            <a :name="frontmatter.name"></a>
            <h4 v-if="standalone">
                <nuxt-link
                    :to="`/blog/${frontmatter.name}`">
                    <time
                        :datetime="frontmatter.date">
                        {{ formatDate(frontmatter.date) }}
                    </time>
                </nuxt-link>
            </h4>
            <h5 v-else>
                <nuxt-link
                    :to="`/blog/${frontmatter.name}`">
                    <time
                        :datetime="frontmatter.date">
                        {{ formatDate(frontmatter.date) }}
                    </time>
                </nuxt-link>
            </h5>
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
        <v-container
            class="py-0 pb-5 ml-0"
            :style="{
                'max-height': postFolded ? '15em' : rowHeight
            }">
            <v-row ref="articleRow">
                <v-col :cols="12" :lg="10" class="py-0">
                    <DynamicMarkdown
                        :file-name="frontmatter.name"
                        :highlight="highlight"
                        :extra-component="extraComponent"
                        :extra-component-params="extraComponentParams" />
                </v-col>
            </v-row>
            <div v-ripple class="folded-overlay col-lg-10 col-12" @click="toggleFolded">
                <div class="folded-overlay-inner">
                    <v-btn
                        color="accent"
                        class="black--text"
                        hovered
                        elevation="2">
                        <v-icon>
                            {{ postFolded
                                ? 'mdi-chevron-down'
                                : 'mdi-chevron-up' }}
                        </v-icon>
                        <span v-if="postFolded">Прикажи чланак</span>
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
        extraComponent: { type: String, default: null },
        extraComponentParams: { type: Object, default: null },
        highlight: { type: String, default: '' },
        standalone: { type: Boolean, default: true },
    },
    data()
    {
        return {
            scrollAnimationDuration: 1000,
            postFolded: false,
        };
    },
    computed: {
        hasTags()
        {
            return this.frontmatter.tags && this.frontmatter.tags.length>0;
        },
        rowHeight()
        {
            if (this && this.$refs && this.$refs.articleRow)
            {
                let totalHeight = this.$refs.articleRow.scrollHeight +
                    (4 * 19);
                // 4em * 19px base font-size
                return `${totalHeight}px`;
            }
            return '100%';
        }
    },
    created()
    {
        this.postFolded = this.folded;
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
        },
        toggleFolded()
        {
            console.log('vuetify.goTo(#',
                        this.frontmatter.id,
                        ')');
            //this.$vuetify.goTo(`#${this.frontmatter.id}`, {
            let gbcr = this.$refs.title.getBoundingClientRect();
            console.log('gbcr = ', gbcr);
            this.$vuetify.goTo(gbcr.top, {
                duration: this.scrollAnimationDuration
            });
            this.$nextTick(() =>
            {
                this.postFolded = !this.postFolded;
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
    max-height: 100%
    position: relative
    transition: all .5s ease

article.blog-post.folded > .container
    max-height: 15em
    overflow: hidden
    transition: all .5s ease

article.blog-post > .container .row
    opacity: 1
    transition: all .5s ease

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
    margin: .25rem .5rem .25rem 0
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
