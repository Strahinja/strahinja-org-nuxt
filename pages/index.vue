<template lang="pug">
    v-container.ma-0.pa-0(fluid,
    no-gutters)
        splash(height="200px",
        :bg-color="secondaryBaseColor")
            h1 Лична страница Страхиње Радића
        v-toolbar.main-toolbar(flat)
            v-spacer/
            v-tooltip(v-for=`(mainToolbarPage, mainToolbarPageIndex) in
            mainToolbarPages`,
            :key="mainToolbarPageIndex",
            bottom)
                template(v-slot:activator="{ on }")
                    v-btn.black--text(:to="mainToolbarPage.url.path",
                    :x-large="$breakpoint.is.smAndUp",
                    :large="$breakpoint.is.xsOnly",
                    :rounded="$breakpoint.is.smAndUp",
                    :fab="$breakpoint.is.xsOnly",
                    :class=`{
                    'mx-4': $breakpoint.is.smAndUp,
                    'mx-2': $breakpoint.is.xsOnly
                    }`,
                    color="accent",
                    v-on="on")
                        v-icon {{ mainToolbarPage.icon }}
                        span(v-if="$breakpoint.is.smAndUp").
                            {{ mainToolbarPage.title }}
                span {{ mainToolbarPage.text }}
            v-spacer/
        v-col.filler.text-center.mt-10
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
                                    LogoNuxt.madewith-icon
                            li(:class=`{
                            'sm-and-up': $breakpoint.is.smAndUp,
                            'xs-only': $breakpoint.is.xsOnly,
                            'mr-10': $breakpoint.is.smAndUp,
                            'mb-10': $breakpoint.is.xsOnly
                            }`)
                                made-with(title="Vue.js",
                                :height="madewithHeight",
                                url="https://vuejs.org")
                                    LogoVue.madewith-icon
                            li(:class=`{
                            'sm-and-up': $breakpoint.is.smAndUp,
                            'xs-only': $breakpoint.is.xsOnly
                            }`)
                                made-with(title="Vuetify",
                                :height="madewithHeight",
                                url="https://vuetifyjs.com")
                                    LogoVuetify.madewith-icon
</template>

<script>
import Splash from '~/components/Splash.vue';
import MadeWith from '~/components/MadeWith.vue';
import LogoVue from '~/assets/svg/logo-vue.svg?inline';
import LogoVuetify from '~/assets/svg/logo-vuetify.svg?inline';
import LogoNuxt from '~/assets/svg/logo-nuxt.svg?inline';

/*function randomString(len)
{
    let s = '';
    for (let i = 0; i < len; i++)
    {
        s += String.fromCharCode('A'.charCodeAt(0) +
            Math.round(Math.random() * 26));
    }
    return s;
}*/

export default {
    name: 'Home',
    components: { Splash, LogoVue, LogoVuetify, LogoNuxt, MadeWith },
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
        };
    },
    computed: {
        secondaryBaseColor()
        {
            return this.$vuetify.theme.dark
                ? this.$vuetify.theme.themes.dark.secondary.base
                : this.$vuetify.theme.themes.light.secondary.base;
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
    },
    mounted()
    {
        this.$nextTick(() =>
        {
            this.$forceUpdate();
        });
    }
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

.tech-list.xs-only
    margin-bottom: 80px !important

.tech-list > li
    display: inline-block

.tech-list > li.xs-only
    display: block
    width: 100%
</style>
