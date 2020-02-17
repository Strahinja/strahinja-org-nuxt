<template lang="pug">
    v-container(fluid=true)
        v-row.mt-3.mb-7(no-gutters=true)
            v-col.text-center.hidden-xs-only(v-if="showBackButton",
            :sm="1",
            align="center",
            style="min-width: 60px;")
                v-tooltip.hidden-xs-only(v-if="showBackButton",
                bottom=true)
                    template(v-slot:activator="{ on }")
                        v-btn.hidden-xs-only.text-center.align-center.mr-3.mt-1(
                        v-if="showBackButton",
                        fab=true,
                        depressed=true,
                        dark=true,
                        small=true,
                        :to="parentUrl",
                        color="secondary",
                        v-on="on")
                            v-icon.align-center(dark=true) mdi-arrow-left
                    span Назад на {{ parentName }}
            v-col(:cols="12",
            :sm="10")
                v-container.pa-0.ma-0(fluid=true,
                no-gutters=true)
                    v-row.mb-4(no-gutters=true,
                    justify-left=true)
                        v-col(:cols="6")
                            h3.display-1 Профил
                        v-col.text-right(:cols="6")
                            v-tooltip(bottom=true)
                                template(v-slot:activator="{ on }")
                                    v-btn.black--text(color="accent",
                                    v-on="on")
                                        a.button-link(href="/doku/cv-strahinja-radic.pdf",
                                        target="_blank")
                                            v-icon mdi-file-pdf-box
                                            span.hidden-xs-only Преузми&nbsp;
                                            | PDF
                                span Преузми PDF фајл

                v-card.profile-card
                    v-toolbar(flat=true,
                    :elevation="0",
                    color="secondary lighten-1")
                        h3.title Страхиња Радић
                        v-avatar(v-if="$breakpoint.is.mdAndUp",
                        size="96",
                        :class=`{
                            'center-avatar-100': true
                        }`)
                            v-img(src="/img/avatar-2017.jpg",
                            alt="Аватар")
                        v-avatar(v-else=true,
                        size="60",
                        :class=`{
                            'center-avatar-64': true,
                            'right-avatar-64': $breakpoint.is.xsOnly
                        }`)
                            v-img(src="/img/avatar-2017.jpg",
                            alt="Аватар")
                    .py-7.mt-4
                        p.
                            #[em Full-stack developer] са широким опсегом
                            програмерских вештина. Почео сам да кодирам у
                            #[em Basic]-у деведесетих и научио низ програмских
                            језика и фрејмворка, укључујући најновије
                            технологије, као што су
                            #[em Nuxt.js, Vue.js, Angular 2, Typescript, JavaScript, PHP]
                            и #[em MySQL.] Мој циљ је да радим на занимљивим и
                            захтевним пројектима уз употребу постојећих и нових
                            технологија. Текући фокус: #[em Nuxt.js.]

                        // Full-stack developer with a wide programming skill set.
                            Started coding with Basic in the 1990s and learned a
                            number of programming languages and frameworks, up to
                            and including modern technologies, like Nuxt.js, Vue.js,
                            Angular 2, Typescript, JavaScript, PHP and MySQL. My
                            goal is to work on interesting and challenging projects
                            using the  existing and/or new technologies. Current
                            focus: Nuxt.js.

                        v-divider.my-8/

                        h5(:class=`{
                            title: true,
                            'px-10': $breakpoint.is.smAndUp,
                            'px-4': $breakpoint.is.xsOnly
                        }`) Вештине

                        v-divider.my-8/

                        skills-category(title="Програмирање",
                        :items-left="skillsLeftSide",
                        :items-right="skillsRightSide",
                        :two-col="true")

                        v-divider.my-8/

                        skills-category(title="Језици",
                        :items-left="languages",
                        :two-col="false")
</template>

<script>
import SkillsCategory from '~/components/SkillsCategory';

export default {
    name: 'Profile',
    components: { SkillsCategory },
    data()
    {
        return {
            skillsLeftSide: [
                { name: 'Nuxt.js', color: 'blue lighten-1', percent: 80 },
                { name: 'Vue.js', color: 'blue lighten-1', percent: 90 },
                { name: 'Angular 2', color: 'purple lighten-1', percent: 70 },
                { name: 'JavaScript', color: 'red lighten-1', percent: 100 },
                { name: 'PHP', color: 'green lighten-1', percent: 95 }
            ],
            skillsRightSide: [
                { name: 'C', color: 'pink lighten-1', percent: 90 },
                { name: 'C++', color: 'pink darken-1', percent: 90 },
                { name: 'Pascal', color: 'blue darken-1', percent: 90 },
                { name: 'GNU/Linux', color: 'lime darken-1', percent: 90 }
            ],
            languages: [
                { name: 'Енглески', color: 'red', percent: 100 },
                { name: 'Руски', color: 'blue', percent: 80 },
                { name: 'Шпански', color: 'green', percent: 60 }
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
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
    head()
    {
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

<style lang="sass">
.v-avatar .v-image
    z-index: auto

.center-avatar-100
    position: absolute
    width: 96px
    height: 96px
    margin-bottom: -50px
    bottom: 0
    left: 50%
    margin-left: -50px

.center-avatar-100:before
    display: block
    content: ' '
    width: 100px
    height: 100px
    min-width: 100px
    left: -2px
    position: absolute
    border: 5px solid #fff
    border-radius: 50%
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, .4)

.center-avatar-64
    position: absolute
    width: 60px
    height: 60px
    margin-bottom: -32px
    bottom: 0
    left: 50%
    margin-left: -32px

.center-avatar-64:before
    display: block
    content: ' '
    width: 64px
    height: 64px
    min-width: 64px
    left: -2px
    position: absolute
    border: 5px solid #fff
    border-radius: 50%
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, .4)

.right-avatar-100
    margin-left: -110px
    left: 100%

.right-avatar-64
    margin-left: -70px
    left: 100%

.floating-button
    position: absolute
    bottom: 0
    margin-bottom: -50px

.floating-button-icon
    left: 50%
    top: 50%
    margin-left: -12px
    margin-top: -12px

.v-application .profile-card p
    margin: 1em 2em
</style>
