<template lang="pug">
    article.blog-post.mb-10(:class=`{
        'folded': postFolded,
        'standalone': standalone
    }`)
        header
            h1.display-1.article-title(v-if="standalone",
            :id="document.id")
                nuxt-link(:to="`/blog/${document.slug}`") {{ document.title }}
            h2.article-title(v-else,
            :id="document.id",
            ref="title")
                nuxt-link(:to="`/blog/${document.slug}`") {{ document.title }}
            a(:name="document.slug")
            h2.date(v-if="standalone")
                nuxt-link(:to="`/blog/${document.slug}`")
                    time(:datetime="document.date").
                        {{ formatDate(document.date) }}
            h3.date(v-else)
                nuxt-link(:to="`/blog/${document.slug}`")
                    time(:datetime="document.date").
                        {{ formatDate(document.date) }}
            .categories-container Категорије:
                ul.categories
                    li(v-for="(category, categoryIndex) in document.categories",
                    :key="categoryIndex") {{ category }}
        v-container.py-0.pb-5.ml-0
            v-row(ref="articleRow")
                foldable(:folded="postFolded",
                folded-height="15em")
                    v-col.py-0.folded(:cols="12",
                    :lg="10")
                        nuxt-content(:document="document")/
                        //-dynamic-markdown(:file-name="frontmatter.name",
                        //-:standalone="standalone",
                        //-:highlight="highlight",
                        //-:extra-component="extraComponent",
                        //-:extra-component-params="extraComponentParams")

            .folded-overlay.col-lg-10.col-12(v-ripple,
            @click="toggleFolded")
                .folded-overlay-inner
        footer
            .tags-container(v-if="hasTags") Ознаке:
                ul.tags
                    li(v-for="(tag, tagIndex) in document.tags",
                    :key="tagIndex",
                    :class=`{
                        'highlight': tag==highlight
                    }`)
                        nuxt-link(:to="tagUrl(tag)") {{ '#' + tag }}
            v-container.py-0(v-if="!standalone",
            fluid)
                v-row
                    v-col.text-center(:cols="12",
                    :lg="10")
                        v-btn.black--text(color="accent",
                        hovered,
                        rounded,
                        elevation="2",
                        @click="toggleFolded")
                            v-icon {{ postFolded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
                            span(v-if="postFolded") Прикажи чланак
                            span(v-else) Сакриј чланак
</template>

<script>
import BlogGist from '~/components/blog/Gist';
export default {
    name: 'BlogPost',
    components: { BlogGist },
    props: {
        document: { type: Object, default: () => ({}), required: true },
        folded: { type: Boolean, default: false, required: false },
        highlight: { type: String, default: '', required: false },
        standalone: { type: Boolean, default: true, required: false },
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
            return this.document.tags && this.document.tags.length>0;
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
            if (!str || str.length==0)
            {
                return '';
            }
            //eslint-disable-next-line no-unused-vars
            let [date, time] = str.split('T');
            if (!date || date.length==0)
            {
                return '';
            }
            let [year, month, day] = date.split('-');

            month = parseInt(month); // for "01", etc.

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
            this.postFolded = !this.postFolded;
            this.$nextTick(() =>
            {
                let gbcr = this.$refs.title.getBoundingClientRect();
                let navbarHeight = 0;
                if (document)
                {
                    let appBars = document.getElementsByClassName('v-app-bar');
                    if (appBars && appBars.length>0)
                    {
                        navbarHeight = appBars[0].getBoundingClientRect().height;
                    }
                }
                smoothScrollBy(gbcr.top - navbarHeight);
                gbcr = null;
            });
        }
    },
};

function smoothScrollBy(amount, duration = 500, steps = 10, step = 0)
{
    if (step < steps)
    {
        setTimeout(() =>
        {
            if (window) window.scrollBy(0, amount / steps);
            smoothScrollBy(amount, duration, steps, step+1);
        }, duration/steps);
    }
}
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
@import '~/assets/sass/code.sass'
@import '~/assets/sass/markdown.sass'

article.blog-post > header a
    color: $permalink-color !important
    text-decoration: none

.theme--dark.v-application article.blog-post > header a
    color: $permalink-color-dark !important

article.blog-post > .container
    height: auto
    max-height: 100%
    position: relative
    transition: height .5s ease-in-out, opacity .5s ease-in-out

article.blog-post.folded > .container
    max-height: 15em
    overflow: hidden
    transition: height .5s ease-in-out, opacity .5s ease-in-out

article.blog-post > .container .row
    opacity: 1
    transition: height .5s ease-in-out, opacity .5s ease-in-out

//-article.blog-post.folded > .container .row
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

.theme--dark.v-application article.blog-post.folded .folded-overlay .folded-overlay-inner::after
    background: linear-gradient(0deg, map-get($material-dark, 'surface'), transparent)

article.blog-post.folded .folded-overlay-container a .v-btn
    display: inline-block
    vertical-align: middle

article.blog-post.standalone h4
    font-size: .9rem

.categories-container
    text-transform: uppercase
    font-size: .7rem
    color: $smallprint-color

.theme--dark .categories-container
    color: $smallprint-color-dark

.blog-post.standalone .categories-container
    font-size: .8rem

.categories
    list-style-type: none
    padding-left: 0 !important
    display: inline-block
    margin-left: .5rem

.categories > li
    display: inline-block
    border-radius: .4rem
    margin-right: .5rem
    color: $category-color

.theme--dark.v-application .categories > li
    color: $category-color-dark

.tags-container
    text-transform: uppercase
    font-size: .7rem
    color: $smallprint-color
    margin-left: 12px !important

.theme--dark .tags-container
    color: $smallprint-color-dark

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
