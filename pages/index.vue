<template lang="pug">
    v-container.ma-0.pa-0(fluid,
    no-gutters)
        splash(height="200px",
        :bg-color="pageTheme().firstSplashBackgroundColor",
        :fg-color="pageTheme().firstSplashForegroundColor")
            h1 Лична страница Страхиње Радића
        v-toolbar.main-toolbar.d-flex.justify-center(flat)
            v-tooltip(v-for=`(mainToolbarPage, mainToolbarPageIndex) in
            mainToolbarPages`,
            :key="mainToolbarPageIndex",
            bottom)
                template(v-slot:activator="{ on }")
                    v-btn(:to="mainToolbarPage.url.path",
                    :x-large="$breakpoint.is.smAndUp",
                    :large="$breakpoint.is.xsOnly",
                    :rounded="$breakpoint.is.smAndUp",
                    :fab="$breakpoint.is.xsOnly",
                    :class=`{
                        'mx-4': $breakpoint.is.smAndUp,
                        'mx-2': $breakpoint.is.xsOnly
                    }`,
                    :color="pageTheme().mainToolbarBtnBg",
                    v-on="on")
                        v-icon {{ mainToolbarPage.icon }}
                        span(v-if="$breakpoint.is.smAndUp").
                            {{ mainToolbarPage.title }}
                span {{ mainToolbarPage.text }}
        v-col.text-center.my-8
            v-container.pa-0
                v-row.ma-0
                    v-col.offset-1.offset-lg-2(:cols="10",
                    :lg="8")
                        h2 Добродошли!
                        p.text-left.
                            Овај сајт је замишљен као колекција мојих радова, презентација
                            моје радне биографије и пословни портфолио. Сајт је још увек у
                            изградњи, па неке могућности још нису додате или нису функционалне.
                            Молим за стрпљење, јер је време које могу да посветим изради овог
                            сајта веома ограничено.
        splash(height="300px",
        :bg-color="pageTheme().secondSplashBackgroundColor",
        :fg-color="pageTheme().secondSplashForegroundColor")
            v-container
                v-row
                    v-col(cols=10,
                    md=4,
                    offset=1,
                    offset-md=2)
                        v-carousel.elevation-5.showcase-carousel(cycle,
                        height=200,
                        interval=6000,
                        show-arrows-on-hover)
                            v-carousel-item(v-for=`(portfolioItem,
                            portfolioItemIndex) in portfolioItems`,
                            :key="portfolioItemIndex")
                                img.splash-picture(:src="portfolioItem.image_thumb")
                    v-col.text-left.align-self-center(cols=10,
                    md=4,
                    offset=1,
                    offset-md=0,
                    :class=`{
                        'text-left': $breakpoint.is.mdAndUp,
                        'text-center': $breakpoint.is.smAndDown,
                    }`,
                    :style=`{
                        'padding-left': $breakpoint.is.mdAndUp
                            ? '2rem'
                            : '0'
                    }`)
                        h2 Портфолио
                        p Пројекти на којима сам радио
                        v-tooltip(bottom)
                            template(v-slot:activator="{ on }")
                                v-btn.black--text(:to="portfolioPage.url.path",
                                x-large,
                                rounded,
                                color="accent",
                                v-on="on")
                                    v-icon {{ portfolioPage.icon }}
                                    | {{ portfolioPage.title }}
                            span {{ portfolioPage.text }}
        v-col.text-center.my-8
            v-container.pa-0
                v-row.ma-0
                    v-col.offset-1.offset-lg-2(:cols="10",
                    :lg="8")
                        h2.mt-10 Коришћене технологије
                        ul.tech-list.my-10(:class=`{
                        'xs-only': $breakpoint.is.xsOnly
                        }`)
                            li(:class=`{
                            'sm-and-up': $breakpoint.is.smAndUp,
                            'xs-only': $breakpoint.is.xsOnly,
                            'mr-10': $breakpoint.is.smAndUp,
                            'mb-10': $breakpoint.is.xsOnly
                            }`)
                                made-with(title="Nuxt.js",
                                :height="madewithHeight",
                                url="https://nuxtjs.org")
                                    logo-nuxt.madewith-icon
                            li(:class=`{
                            'sm-and-up': $breakpoint.is.smAndUp,
                            'xs-only': $breakpoint.is.xsOnly,
                            'mr-10': $breakpoint.is.smAndUp,
                            'mb-10': $breakpoint.is.xsOnly
                            }`)
                                made-with(title="Vue.js",
                                :height="madewithHeight",
                                url="https://vuejs.org")
                                    logo-vue.madewith-icon
                            li(:class=`{
                            'sm-and-up': $breakpoint.is.smAndUp,
                            'xs-only': $breakpoint.is.xsOnly
                            }`)
                                made-with(title="Vuetify",
                                :height="madewithHeight",
                                url="https://vuetifyjs.com")
                                    logo-vuetify.madewith-icon
</template>

<script>
import LogoVue from '~/assets/svg/logo-vue.svg?inline';
import LogoVuetify from '~/assets/svg/logo-vuetify.svg?inline';
import LogoNuxt from '~/assets/svg/logo-nuxt.svg?inline';
import { routeIds } from '~/store/pages';

export default {
    name: 'Home',
    components: { LogoVue, LogoVuetify, LogoNuxt },
    head ()
    {
        return {
            link: [
                { hid: 'canonical', rel: 'canonical', href: 'https://strahinja.org' }
            ]
        };
    },
    data()
    {
        return {
            madewithHeight: 75,
            loading: false,
            parentUrl: '/',
            portfolioItems: [],
        };
    },
    computed: {
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
        navigationPages()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/navigationPages'];
            }
            else
            {
                return [];
            }
        },
        mainToolbarPages()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/mainToolbarPages'];
            }
            else
            {
                return [];
            }
        },
        portfolioPage()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/pageById'](
                    routeIds.PAGE_PORTFOLIO);
            }
            else
            {
                return {};
            }
        }
    },
    async asyncData({ store })
    {
        let portfolioItems = [];
        await store.dispatch('portfolio/loadItems', null, { root: true });
        portfolioItems = store.getters['portfolio/firstN'](3);

        return {
            portfolioItems,
        };
    },
    methods: {
        pageTheme()
        {
            return this && this.$store
                ? this.$store.getters['themes/element'](
                    this.$store.getters['themes/theme'],
                    routeIds.PAGE_HOME
                )
                : {};
        }
    }
};
</script>

<style lang="sass" scoped>
$filler-height: 10em
$filler-margin-top: 5em

.card-clickable
    cursor: pointer

.main-toolbar
    transform: translateY(-50%)
    background-color: transparent !important

.filler
    min-height: $filler-height
    margin-top: $filler-margin-top

.tech-list
    display: block
    list-style-type: none
    margin: 0 40px

.tech-list > li
    display: inline-block

.tech-list > li.xs-only
    display: block
    width: 100%

.v-carousel
    margin-left: auto
    margin-right: auto

.showcase-carousel
    max-width: 355px
    border-radius: 28px

.splash-picture
    width: 355px
</style>
