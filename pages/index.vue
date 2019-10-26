<template>
    <v-container fluid no-gutters ma-0 pa-0>
        <splash
            height="200px"
            :bg-color="$vuetify.theme.themes.light.secondary.base">
            <h1>
                Лична страница Страхиње Радића
            </h1>
        </splash>
        <client-only>
            <v-toolbar
                flat
                class="main-toolbar">
                <v-spacer />
                <v-tooltip
                    v-for="(page, pageIndexHome) in
                        $store.state.pages.pages.filter(page =>
                            page.includedInMainToolbar)"
                    :key="pageIndexHome"
                    bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            :to="page.url.path"
                            :x-large="$breakpoint.is.smAndUp"
                            :large="$breakpoint.is.xsOnly"
                            :rounded="$breakpoint.is.smAndUp"
                            :fab="$breakpoint.is.xsOnly"
                            class="black--text"
                            :class="{
                                'mx-4': $breakpoint.is.smAndUp,
                                'mx-2': $breakpoint.is.xsOnly
                            }"
                            color="accent"
                            v-on="on">
                            <v-icon>{{ page.icon }}</v-icon>
                            <span v-if="$breakpoint.is.smAndUp">
                                {{ page.title }}
                            </span>
                        </v-btn>
                    </template>
                    <span>{{ page.text }}</span>
                </v-tooltip>
                <v-spacer />
            </v-toolbar>
        </client-only>
        <v-col class="filler text-center mt-10">
            <v-container class="pa-0">
                <v-row class="ma-0">
                    <v-col :cols="10" :lg="8" class="offset-1 offset-lg-2">
                        <h2>Добродошли!</h2>
                        <p class="text-left">
                            Овај сајт је замишљен као колекција мојих радова, презентација
                            моје радне биографије и пословни портфолио. Сајт је још увек у
                            изградњи, па неке могућности још нису додате или нису функционалне.
                            Молим за стрпљење, јер је време које могу да посветим изради овог
                            сајта веома ограничено.
                        </p>
                        <h2 class="mt-10">
                            Коришћене технологије
                        </h2>
                        <ul class="tech-list my-10">
                            <li
                                :class="{
                                    'sm-and-up': $breakpoint.is.smAndUp,
                                    'xs-only': $breakpoint.is.xsOnly,
                                    'mr-10': $breakpoint.is.smAndUp,
                                    'mb-10': $breakpoint.is.xsOnly
                                }">
                                <made-with
                                    title="Nuxt.js"
                                    :height="madewithHeight"
                                    url="https://nuxtjs.org">
                                    <LogoNuxt class="madewith-icon" />
                                </made-with>
                            </li>
                            <li
                                :class="{
                                    'sm-and-up': $breakpoint.is.smAndUp,
                                    'xs-only': $breakpoint.is.xsOnly,
                                    'mr-10': $breakpoint.is.smAndUp,
                                    'mb-10': $breakpoint.is.xsOnly
                                }">
                                <made-with
                                    title="Vue.js"
                                    :height="madewithHeight"
                                    url="https://vuejs.org">
                                    <LogoVue class="madewith-icon" />
                                </made-with>
                            </li>
                            <li
                                :class="{
                                    'sm-and-up': $breakpoint.is.smAndUp,
                                    'xs-only': $breakpoint.is.xsOnly
                                }">
                                <made-with
                                    title="Vuetify"
                                    :height="madewithHeight"
                                    url="https://vuetifyjs.com">
                                    <LogoVuetify class="madewith-icon" />
                                </made-with>
                            </li>
                        </ul>
                    </v-col>
                </v-row>
            </v-container>
        </v-col>
    </v-container>
</template>

<script>
//import axios from 'axios';
import Splash from '~/components/Splash.vue';
import MadeWith from '~/components/MadeWith.vue';
import LogoVue from '~/assets/svg/logo-vue.svg?inline';
import LogoVuetify from '~/assets/svg/logo-vuetify.svg?inline';
import LogoNuxt from '~/assets/svg/logo-nuxt.svg?inline';

export default {
    name: 'Home',
    components: { Splash, LogoVue, LogoVuetify, LogoNuxt, MadeWith },
    head ()
    {
        return {
            link: [
                { hid: 'canonical', rel: 'canonical', href: 'http://strahinja.org' }
            ]
        };
    },
    data()
    {
        return {
            madewithHeight: 75,
            twitterApiUrl: '//api.twitter.com/1.1/statuses/user_timeline.json',
            loading: false,
            // twitterStatuses: []
        };
    },
    created()
    {
        this.loading = true;
        // this.loadTwitterStatuses();
    },
    methods: {
        /*loadTwitterStatuses () {
      axios.get(this.twitterApiUrl, {
        params: {
          screen_name: 'strahinja_radic'
        }
      })
        .then((response) => {
          console.log('loadTwitterStatuses: then: response = ',
            response);
        })
        .catch((response) => {
          console.log('loadTwitterStatuses: catch: response = ',
            response);
        });
    }*/
    },
};
</script>

<style lang="sass" scoped>
$filler-height: 10em
$filler-margin-top: 5em

.card-clickable
    cursor: pointer

.main-toolbar
    margin-top: -28px !important
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
</style>
