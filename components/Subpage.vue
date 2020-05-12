<template lang="pug">
    #subpage-container(v-scroll="onScroll")
        v-fab-transition(v-if="!disableScroll")
            v-btn(v-show="showTopFab",
            color="primary lighten-1",
            dark,
            fixed,
            bottom,
            right,
            fab,
            @click="scrollToTop()")
                v-icon(dark) mdi-arrow-up
        splash(v-if="splash",
        height="8rem",
        :bg-color="splashBgColor",
        :fg-color="splashFgColor",
        align="left",
        :vcentered="false")
            v-container(fluid)
                v-row.mt-3.mb-7(no-gutters)
                    v-col.text-center.hidden-xs-only(v-if="showBackButton",
                    :sm="1",
                    align="center",
                    style="min-width: 60px;")
                        v-tooltip.hidden-xs-only(v-if="showBackButton",
                        bottom)
                            template(v-slot:activator="{ on }")
                                v-btn.hidden-xs-only.text-center.align-center.mr-3.mt-1(
                                v-if="showBackButton",
                                fab,
                                depressed,
                                dark,
                                small,
                                :to="parentUrl",
                                color="secondary",
                                v-on="on")
                                    v-icon.align-center(dark) mdi-arrow-left
                            span Назад на {{ parentName }}
                    v-col.source-url-container-wrapper(:cols="12",
                    :sm="10")
                        slot(name="header")/
                        v-container.py-0.source-url-container(v-if="sourceUrl",
                        fluid)
                            v-row
                                v-col.py-0.text-right(:cols="12")
                                    source-url(:contrastDark="sourceUrlDark",
                                    :contrastLight="sourceUrlLight")/
                        slot/
        v-container(v-else,
        fluid)
            v-row.mt-3.mb-7(no-gutters)
                v-col.text-center.hidden-xs-only(v-if="showBackButton",
                :sm="1",
                align="center",
                style="min-width: 60px;")
                    v-tooltip.hidden-xs-only(v-if="showBackButton",
                    bottom)
                        template(v-slot:activator="{ on }")
                            v-btn.hidden-xs-only.text-center.align-center.mr-3.mt-1(
                            v-if="showBackButton",
                            fab,
                            depressed,
                            dark,
                            small,
                            :to="parentUrl",
                            color="secondary",
                            v-on="on")
                                v-icon.align-center(dark) mdi-arrow-left
                        span Назад на {{ parentName }}
                v-col.source-url-container-wrapper(:cols="12",
                :sm="10")
                    slot(name="header")/
                    v-container.py-0.source-url-container(v-if="sourceUrl",
                    fluid)
                        v-row
                            v-col.py-0.text-right(:cols="12")
                                source-url(:contrastDark="sourceUrlDark",
                                :contrastLight="sourceUrlLight")/
                    slot/
        v-container.py-0.col-12.col-lg-10.splash-content-container(fluid,
        v-if="splash",
        :class=`{
            sm: $breakpoint.is.smAndDown,
        }`)
            slot(name="outside-content")/
        slot(v-else,
        name="outside-content")/
</template>

<script>
const getProp = require('dotprop');
import Splash from '~/components/Splash';
import SourceUrl from '~/components/SourceUrl';
export default {
    components: { SourceUrl, Splash },
    props: {
        splash: { type: Boolean, default: false, required: false },
        disableScroll: { type: Boolean, default: false, required: false },
        overrideHead: { type: Boolean, default: false, required: false },
        sourceUrl: { type: Boolean, default: false, required: false },
        sourceUrlDark: { type: Boolean, default: false, required: false },
        sourceUrlLight: { type: Boolean, default: false, required: false },
    },
    data()
    {
        return {
            windowHeight: 0,
            scrollTop: 0,
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
        showTopFab()
        {
            return this && this.windowHeight
                ? this.scrollTop > this.windowHeight-64
                : false;
        },
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        },
        splashBgColor()
        {
            return getProp(this,
                           '$vuetify.theme.currentTheme.secondary.lighten1',
                           '#fff');
        },
        splashFgColor()
        {
            return '#000';
        }
    },
    mounted()
    {
        this.scrollTop = 0;
        this.windowHeight = window.innerHeight;
    },
    methods:
    {
        onScroll(event)
        {
            this.scrollTop = getProp(event,
                                     'target.scrollingElement.scrollTop',
                                     0);
        },
        scrollToTop()
        {
            this.$vuetify.goTo('#subpage-container', 0);
        },
    },
    head()
    {
        if (this.overrideHead)
        {
            return false;
        }
        let globals = {
            title: this.page.title,
            description: this.page.text,
            url: 'https://strahinja.org' + this.page.url.path,
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
                { hid: 'canonical', rel: 'canonical', href: globals.url }
            ],
            title: globals.title,
            description: globals.description,
        };
    },
};
</script>

<style lang="sass" scoped>
.splash-content-container
    margin-top: -3rem

.splash-content-container.sm
    margin-top: 0
    padding: 0

.source-url-container-wrapper
    position: relative

.sm-and-down .source-url-container-wrapper
    position: static

.source-url-container
    position: absolute
    top: 0

.sm-and-down .source-url-container
    position: static
    top: initial
</style>

