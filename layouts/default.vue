<template>
    <v-app :class="{'sm-and-down': $breakpoint.is.smAndDown}">
        <v-navigation-drawer
            v-model="showNav"
            app
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed>
            <v-list>
                <v-list-item
                    v-if="$breakpoint.is.mdAndDown"
                    :to="homePage.url">
                    <v-list-item-action>
                        <Strahinjaorg class="icon-normal" />
                    </v-list-item-action>
                    <v-list-item-title class="title">
                        //strahinja.org
                    </v-list-item-title>
                </v-list-item>
                <v-divider v-if="$breakpoint.is.mdAndDown" />
                <v-list-item
                    v-if="$breakpoint.is.lgAndUp"
                    :to="homePage.url">
                    <v-list-item-action>
                        <v-icon>
                            {{ homePage.icon }}
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title>
                        {{ homePage.title }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item
                    v-for="(navigationPage, navigationPageIndex) in navigationPages"
                    :key="navigationPageIndex"
                    :to="navigationPage.url">
                    <v-list-item-action>
                        <v-icon>{{ navigationPage.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>{{ navigationPage.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            app
            :clipped-left="clipped"
            dark
            color="primary"
            class="full-width-toolbar"
            :class="{ loading: pageLoading }">
            <client-only>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-app-bar-nav-icon
                            v-on="on"
                            @click="showNav = !showNav" />
                    </template>
                    <span>Главни мени</span>
                </v-tooltip>
            </client-only>
            <v-toolbar-title class="mr-4">
                <nuxt-link class="hidden-xs-only" :to="'/'">
                    //strahinja.org
                </nuxt-link>
            </v-toolbar-title>
            <v-divider vertical />
            <client-only>
                <v-tooltip
                    v-if="showBackButton"
                    class="hidden-sm-and-up"
                    bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-if="showBackButton"
                            icon dark
                            :to="parentUrl"
                            class="hidden-sm-and-up text-center align-center">
                            <v-icon dark class="align-center">
                                mdi-arrow-left
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Назад на почетну</span>
                </v-tooltip>
            </client-only>
            <v-spacer />
            <v-toolbar-items>
                <client-only>
                    <v-col cols="auto" class="pa-0">
                        <v-expand-x-transition>
                            <div
                                v-show="showSearch"
                                :class="{
                                    'sm-and-down': $breakpoint.is.smAndDown
                                }"
                                class="my-input-container">
                                <v-form
                                    ref="appbarSearchForm"
                                    v-model="appbarSearchFormValid"
                                    @submit.prevent="onAppbarSearchFormSubmit($event)">
                                    <v-text-field
                                        ref="appbarSearchText"
                                        v-model="appbarSearchText"
                                        v-on-clickaway="searchClickaway"
                                        name="q"
                                        label="Претрага"
                                        text
                                        color="black--text"
                                        solo-inverted
                                        :rules="appbarSearchTextRules"
                                        hover
                                        :counter="maxSearchTextLength"
                                        clearable
                                        dense
                                        prepend-inner-icon="mdi-magnify"
                                        @blur="searchBlur()" />
                                </v-form>
                            </div>
                        </v-expand-x-transition>
                    </v-col>
                    <v-fade-transition :hide-on-leave="true">
                        <div
                            v-show="!showSearch"
                            class="vertical-center">
                            <div class="vertical-center-slot">
                                <client-only>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                                ref="appbarSearchBtn"
                                                icon
                                                v-on="on"
                                                @click="searchBtnClick()">
                                                <v-icon ref="appbarSearchIcon">
                                                    mdi-magnify
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Претрага</span>
                                    </v-tooltip>

                                    <profile-menu />
                                </client-only>
                            </div><!--vertical-center-slot-->
                        </div>
                    </v-fade-transition>
                </client-only>
            </v-toolbar-items>
        </v-app-bar>

        <v-content>
            <nuxt />
        </v-content>

        <client-only>
            <cookie-disclaimer
                color="primary darken-1 white--text"
                :show="showCookieConsent" />
        </client-only>

        <v-footer
            app
            absolute
            padless
            dark
            height="auto">
            <v-card
                text
                tile
                class="flex text-center">
                <v-card-text class="primary text-center">
                    <v-spacer />
                    <client-only>
                        <v-tooltip
                            v-for="(footerLink, footerLinkIndex) in footerLinks"
                            :key="footerLinkIndex"
                            bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                    class="mx-2"
                                    text
                                    icon
                                    v-on="on">
                                    <a
                                        :href="footerLink.url.path"
                                        target="_blank">
                                        <v-icon class="white--text">
                                            {{ footerLink.iconName }}
                                        </v-icon>
                                    </a>
                                </v-btn>
                            </template>
                            <span>{{ footerLink.text }}</span>
                        </v-tooltip>
                    </client-only>
                </v-card-text>
                <v-card-actions
                    class="primary darken-1 d-block text-left"
                    :class="{'text-center': $breakpoint.is.xsOnly}">
                    <v-container
                        v-if="$breakpoint.is.xsOnly"
                        fluid class="ma-0 pa-0" no-gutters>
                        <v-row class="ma-0">
                            <v-col class="pa-0" :cols="12">
                                <a
                                    href="https://creativecommons.org/licenses/by/4.0/"
                                    rel="license"><img
                                        alt="Creative Commons License"
                                        class="inline-image"
                                        src="/img/80x15.png"></a>
                            </v-col>
                        </v-row>
                        <v-row class="ma-0">
                            <v-col class="pa-0" :cols="12">
                                Copyright © 1999-2019
                            </v-col>
                        </v-row>
                        <v-row class="ma-0">
                            <v-col class="pa-0" :cols="12">
                                Страхиња Радић (Strahinya Radich)
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container
                        v-else
                        fluid class="ma-0 pa-0" no-gutters>
                        <v-row class="ma-0">
                            <v-col class="pa-0" :cols="12">
                                <div class="d-inline-block mr-1">
                                    <a
                                        href="https://creativecommons.org/licenses/by/4.0/"
                                        rel="license"><img
                                            alt="Creative Commons License"
                                            class="inline-image"
                                            src="/img/80x15.png"></a>
                                </div>

                                <div class="d-inline mr-1">
                                    Copyright © 1999-2019
                                </div>

                                <div class="d-inline">
                                    Страхиња Радић (Strahinya Radich)
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
import ProfileMenu from '~/components/ProfileMenu';
import CookieDisclaimer from '~/components/CookieDisclaimer';
import Strahinjaorg from '~/assets/svg/strahinjaorg.svg?inline';
import { mixin as clickaway } from 'vue-clickaway';
import fourOhFour from '~/mixins/four-oh-four';

export default {
    name: 'App',
    middleware: ['set-page-id', 'cookie-consent'],
    components: { CookieDisclaimer, Strahinjaorg, ProfileMenu },
    mixins: [clickaway, fourOhFour],
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
        showCookieConsent()
        {
            if (this && this.$store && this.$store.getters)
            {
                return this.$store.getters['pages/showCookieConsent'];
            }
            return true;
        }
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
    }
};
</script>

<style lang="sass">
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

</style>
