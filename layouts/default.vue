<template lang="pug">
    v-app(:class=`{
        'sm-and-down': $breakpoint.is.smAndDown
    }`)
        v-navigation-drawer(v-model="showNav",
        app,
        :mini-variant="miniVariant",
        :clipped="clipped")
            v-list
                v-list-item(v-if="$breakpoint.is.xsOnly",
                :to="homePage.url")
                    v-list-item-action
                        Strahinjaorg.icon-normal
                    v-list-item-title.title //strahinja.org
                v-divider(v-if="$breakpoint.is.xsOnly")
                v-list-item(v-if="$breakpoint.is.smAndUp",
                :to="homePage.url")
                    v-list-item-action
                        v-icon {{ homePage.icon }}
                    v-list-item-title {{ homePage.title }}
                v-list-item(v-for="(navigationPage, navigationPageIndex) in navigationPages",
                :key="navigationPageIndex",
                :to="navigationPage.url")
                    v-list-item-action
                        v-icon {{ navigationPage.icon }}
                    v-list-item-title {{ navigationPage.title }}
        v-app-bar.full-width-toolbar(app,
        :clipped-left="clipped",
        dark,
        color="primary",
        :class="{ loading: pageLoading }")
            client-only
                v-tooltip(bottom)
                    template(v-slot:activator="{ on }")
                        v-app-bar-nav-icon(v-on="on",
                        @click="showNav = !showNav")
                    span Главни мени
            v-toolbar-title.mr-4
                nuxt-link.hidden-xs-only(:to="'/'") //strahinja.org
            v-divider(vertical)/
            client-only
                v-tooltip.hidden-sm-and-up(v-if="showBackButton",
                bottom)
                    template(v-slot:activator="{ on }")
                        v-btn.hidden-sm-and-up.text-center.align-center(
                        v-if="showBackButton",
                        icon,
                        dark,
                        :to="parentUrl")
                            v-icon.align-center(dark) mdi-arrow-left
                    span Назад на почетну
            v-spacer/
            v-toolbar-items
                client-only
                    v-col.pa-0(cols="auto")
                        v-expand-x-transition
                            .my-input-container(v-show="showSearch",
                            :class=`{
                                'sm-and-down': $breakpoint.is.smAndDown
                            }`)
                                v-form(ref="appbarSearchForm",
                                v-model="appbarSearchFormValid",
                                @submit.prevent="onAppbarSearchFormSubmit($event)")
                                    v-text-field(ref="appbarSearchText",
                                    v-model="appbarSearchText",
                                    v-on-clickaway="searchClickaway",
                                    name="q",
                                    label="Претрага",
                                    color="black--text",
                                    solo-inverted,
                                    :rules="appbarSearchTextRules",
                                    hover,
                                    :counter="maxSearchTextLength",
                                    clearable,
                                    dense,
                                    prepend-inner-icon="mdi-magnify",
                                    @blur="searchBlur()")
                    v-fade-transition(:hide-on-leave="true")
                        .vertical-center(v-show="!showSearch")
                            .vertical-center-slot
                                client-only
                                    v-tooltip(bottom)
                                        template(v-slot:activator="{ on }")
                                            v-btn(ref="appbarSearchBtn",
                                            icon,
                                            v-on="on",
                                            @click="searchBtnClick()")
                                                v-icon(ref="appbarSearchIcon").
                                                    | mdi-magnify
                                        span Претрага
                                    v-tooltip(bottom)
                                        template(v-slot:activator="{ on }")
                                            v-btn(ref="appbarThemeModeBtn",
                                            icon,
                                            v-on="on",
                                            @click="themeModeBtnClick()")
                                                v-icon(ref="appbarThemeModeIcon").
                                                    | {{ isThemeDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}
                                        span Тема: {{ isThemeDark ?  'светла' : 'тамна' }}
                                    profile-menu/
        v-content
            nuxt/
        client-only
            cookie-disclaimer(color="primary darken-1 white--text",
            :show="showCookieConsent")/

        v-footer(app,
        absolute,
        padless,
        dark,
        height="auto")
            v-card.flex.text-center(text,
            tile)
                v-card-text.primary.text-center
                    v-spacer/
                    client-only
                        v-tooltip(v-for="(footerLink, footerLinkIndex) in footerLinks",
                        :key="footerLinkIndex",
                        bottom)
                            template(v-slot:activator="{ on }")
                                v-btn.mx-2(text,
                                icon,
                                v-on="on")
                                    a(:href="footerLink.url.path",
                                    target="_blank")
                                        v-icon.white--text {{footerLink.iconName }}
                            span {{ footerLink.text }}
                v-card-actions.primary.darken-1.d-block.text-left(:class=`{
                    'text-center': $breakpoint.is.xsOnly
                }`)
                    v-container.ma-0.pa-0(v-if="$breakpoint.is.xsOnly",
                    fluid,
                    no-gutters)
                        v-row.ma-0
                            v-col.pa-0(:cols="12")
                                a(href="https://creativecommons.org/licenses/by/4.0/",
                                rel="license")
                                    img.inline-image(alt="Creative Commons License",
                                    src="/img/80x15.png")
                        v-row.ma-0
                            v-col.pa-0(:cols="12") Copyright © 1999-{{ currentYear }}
                        v-row.ma-0
                            v-col.pa-0(:cols="12") Страхиња Радић (Strahinya Radich)
                    v-container.ma-0.pa-0(v-else,
                    fluid,
                    no-gutters)
                        v-row.ma-0
                            v-col.pa-0(:cols="12")
                                .d-inline-block.mr-1
                                    a(href="https://creativecommons.org/licenses/by/4.0/",
                                    rel="license")
                                        img.inline-image(alt="Creative Commons License",
                                        src="/img/80x15.png")
                                .d-inline.mr-1 Copyright © 1999-{{ currentYear }}
                                .d-inline Страхиња Радић (Strahinya Radich)
</template>

<script>
import ProfileMenu from '~/components/ProfileMenu';
import CookieDisclaimer from '~/components/CookieDisclaimer';
import Strahinjaorg from '~/assets/svg/strahinjaorg.svg?inline';
import { mixin as clickaway } from 'vue-clickaway';

export default {
    name: 'App',
    middleware: ['set-page-id', 'cookie-consent'],
    components: { CookieDisclaimer, Strahinjaorg, ProfileMenu },
    mixins: [clickaway],
    data()
    {
        return {
            clipped: true,
            miniVariant: false,
            extraProps: {},
            showNav: false,
            appbarSearchText: '',
            showSearch: false,
            maxSearchTextLength: 255,
            appbarSearchFormValid: false,
            appbarSearchTextRules: [
                //v => !!v || 'Мора се задати текст',
                v => v.length<this.maxSearchTextLength ||
                    `Текст мора бити мањи од ${this.maxSearchTextLength} знакова`,
            ],
        };
    },
    computed: {
        dark()
        {
            return this && this.$vuetify && this.$vuetify.theme.dark;
        },
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
        homePage()
        {
            if (this && this.$store)
            {
                return this.$store.getters['pages/pageById'](
                    this.$store.state.pages.routeIds.PAGE_HOME);
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
        footerLinks()
        {
            if (this && this.$store)
            {
                return this.$store.state.pages.footerLinks;
            }
            else
            {
                return [];
            }
        },
        pageLoading()
        {
            return this && this.$store && this.$store.getters ?
                this.$store.getters['loading/isStoreLoading'] :
                true;
        },
        showBackButton()
        {
            return this.$breakpoint.is.xsOnly && this.$route.path != '/';
        },
        isThemeDark()
        {
            return this && this.$store && this.$store.getters ?
                this.$store.getters['pages/isThemeDark'] :
                false;
        },
        showCookieConsent()
        {
            return this && this.$store && this.$store.getters ?
                this.$store.getters['pages/showCookieConsent'] :
                true;
        },
        currentYear()
        {
            return (new Date()).getFullYear();
        }
    },
    watch: {
        dark(newValue)
        {
            this.setHtmlClass(newValue);
        }
    },
    mounted()
    {
        this.setHtmlClass(this.dark);
    },
    head()
    {
        let url = 'https://strahinja.org';
        let globals = {
            title: null,
            description: 'Лична веб страна Страхиње Радића',
            url: url,
            image: `${url}/static/img/preview-home-strahinja-org.png`,
            imageAlt: 'Лого са иницијалима СР и текст //strahinja.org',
            imageWidth: 1127,
            imageHeight: 492,
            imageType: 'image/png'

        };
        let titlefun = title =>
        {
            return title ? `${title} //strahinja.org` : '//strahinja.org';
        };
        return {
            htmlAttrs: {
                lang: 'en'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                { hid: 'og:type', name: 'og:type',
                    property: 'og:type', content: 'website' },
                { hid: 'og:url', name: 'og:url',
                    property: 'og:url', content: globals.url },
                { hid: 'og:title', name: 'og:title',
                    property: 'og:title',
                    content: globals.title,
                    template: titlefun
                },
                { hid: 'og:description', name: 'og:description',
                    property: 'og:description', content: globals.description },
                { hid: 'og:image', name: 'og:image',
                    property: 'og:image', content: globals.image },
                { hid: 'og:image:type', name: 'og:image:type',
                    property: 'og:image:type', content: globals.imageType },
                { hid: 'og:image:width', name: 'og:image:width',
                    property: 'og:image:width', content: globals.imageWidth },
                { hid: 'og:image:height', name: 'og:image:height',
                    property: 'og:image:height', content: globals.imageHeight },
                { hid: 'og:image:alt', name: 'og:image:alt',
                    property: 'og:image:alt', content: globals.imageAlt },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                { hid: 'twitter:url', name: 'twitter:url', content: globals.url },
                { hid: 'twitter:title',
                    name: 'twitter:title',
                    content: globals.title,
                    template: titlefun
                },
                { hid: 'twitter:creator', name: 'twitter:creator', content: '@strahinja_radic' },
                { hid: 'twitter:description', name: 'twitter:description', content: globals.description },
                { hid: 'twitter:image', name: 'twitter:image', content: globals.image },
                { hid: 'name', name: 'name', itemprop: 'name',
                    content: globals.title,
                    template: titlefun
                },
                { hid: 'description', name: 'description',
                    itemprop: 'description', content: globals.description },
                { hid: 'image', name: 'image',
                    itemprop: 'image', content: globals.image },

                { name: 'google-site-verification',
                    content: 'IabK5ejyfSF3lFra1K5Gkr0cqO2wXBs7IQlBEgMR9xE' }
            ],
            title: null,
            titleTemplate: titlefun,
            description: globals.description,
            author: 'https://linkedin.com/in/strahinja-radic',
            link: [
                { rel: 'shortcut icon', href: '/favicon.ico' },
            ]
        };
    },
    methods: {
        setHtmlClass(dark)
        {
            if (document)
            {
                let html = document.getElementsByTagName('html');
                if (html && html[0])
                {
                    if (dark)
                    {
                        html[0].classList.add('theme--dark');
                    }
                    else
                    {
                        html[0].classList.remove('theme--dark');
                    }
                }
            }
        },
        searchBtnClick()
        {
            if (!this.showSearch)
            {
                this.showSearch = true;
                this.$nextTick(() =>
                {
                    this.$refs.appbarSearchText.focus();
                });
            }
        },
        onAppbarSearchFormSubmit()
        {
            if (this.appbarSearchText.length>0)
            {
                let searchText = this.appbarSearchText;
                this.showSearch = false;
                this.appbarSearchText = '';
                this.$router.push({ name: 'search',
                    query: { q: searchText } });
            }
        },
        searchBlur()
        {
            if (!this.appbarSearchText || this.appbarSearchText.length === 0)
            {
                this.showSearch = false;
            }
        },
        nodeListIndexOf(nodeList, elem)
        {
            let i = 0;
            let found = false;
            while (!found && i < nodeList.length)
            {
                if (nodeList[i] === elem)
                {
                    found = true;
                }
                else
                {
                    i++;
                }
            }
            return found ? i : -1;
        },
        searchClickaway(event)
        {
            let t = event && event.target ? event.target : null;
            let isAChild =
                this.nodeListIndexOf(this.$refs.appbarSearchBtn.$el.childNodes, t) !==
                -1;
            if (
                t &&
                t !== this.$refs.appbarSearchBtn.$el &&
                t !== this.$refs.appbarSearchIcon.$el &&
                !isAChild &&
                this.showSearch &&
                (!this.appbarSearchText || this.appbarSearchText.length === 0)
            )
            {
                this.showSearch = false;
            }
        },
        themeModeBtnClick()
        {
            this.$store.dispatch('pages/cycleTheme', {
                vuetify: this.$vuetify,
            });
        }
    }
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/styles.sass'
@import '~/assets/sass/pxplus.sass'
@import '~/assets/sass/common.sass'
@import '~/assets/sass/transition.sass'

@keyframes title-gradient
    0%
        background-position: 0% 50%
    50%
        background-position: 100% 0%
    100%
        background-position: 0% 50%

.v-toolbar .v-toolbar__content
    transition: all .5s ease

.v-toolbar.loading .v-toolbar__content
    background: linear-gradient(280deg,transparent 0%,hsla(119, 63%, 69%, 0.5) 20%,transparent 40%,hsla(119, 63%, 69%, 0.2) 50%,transparent 60%,hsla(119, 63%, 69%, 0.5) 80%,transparent 100%)
    background-size: 150% 150%
    animation: title-gradient 5s ease infinite
    transition: all .5s ease

.v-application.theme--dark .v-app-bar.primary,
.v-application.theme--dark .v-card__actions.primary.darken-1
    background-color: $app-toolbar-background-color-dark !important

.my-input-container
    height: 100%
    padding-top: $my-input-container-padding-top

.my-input-container.sm-and-down
    padding-top: $my-input-container-padding-top-sm-and-down

.my-input-container.sm-and-down .v-input__slot
    min-height: 0

.my-input-container .v-input__icon .theme--dark.v-icon
    color: #000

.adjust-svgicons > svg
    vertical-align: middle
    margin-top: -3px

.v-navigation-drawer
    z-index: 55 !important
    max-height: 100% !important

.v-footer
    z-index: 40

.v-footer button a
    text-decoration: none

.v-navigation-drawer svg,
.v-navigation-drawer svg *
    fill: map-get($material-light, 'text-color') !important

.theme--dark.v-application .v-navigation-drawer svg,
.theme--dark.v-application .v-navigation-drawer svg *
    fill: map-get($material-dark, 'text-color') !important

.v-navigation-drawer--clipped:not(.v-navigation-drawer--temporary):not(.v-navigation-drawer--is-mobile)
    z-index: 40 !important

</style>
