<template lang="pug">
    v-container(fluid=true)
        v-row.mt-3.mb-7(no-gutters=true,
        wrap=true)
            v-col.text-center.hidden-xs-only(v-if="showBackButton",
            :sm="1",
            align="center",
            style="min-width: 60px;")
                v-tooltip.hidden-xs-only(v-if="showBackButton",
                bottom=true)
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
                    span Назад на почетну
            v-col(:cols="12",
            :sm="10")
                h3.display-1.
                    Код {{ code }}: {{ messages[code] }}
                p {{ messageDescriptions[code] }}
                p Назад на #[nuxt-link(:to="'/'") почетну страницу]
</template>

<script>
var getProp = require('dotprop');
export default {
    name: 'Error',
    head()
    {
        return {
            meta: [
                { hid: 'og:url', name: 'og:url', property: 'og:url', content: this.url },
                { hid: 'og:title', name: 'og:title', property: 'og:title', content: this.title },
                { hid: 'og:description', name: 'og:description', property: 'og:description', content:
                    this.messageDescriptions[this.code] },
                { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.image},
                { hid: 'og:image:alt', name: 'og:image:alt', property:
                    'og:image:alt', content: this.imageAlt },
                { hid: 'twitter:url', name: 'twitter:url', content: this.url },
                { hid: 'twitter:title', name: 'twitter:title', content: this.title },
                { hid: 'twitter:description', name: 'twitter:description',
                    content: this.messageDescriptions[this.code] },
                { hid: 'twitter:image', name: 'twitter:image', content:
                    this.image},
                { hid: 'name', name: 'name', itemprop: 'name', content: this.title },
                { hid: 'description', name: 'description', itemprop:
                    'description', content: this.description },
                { hid: 'image', name: 'image', itemprop: 'image', content: this.image},
                { name: 'robots', content: 'noindex' }
            ],
            link: [
                { hid: 'canonical', rel: 'canonical', href: 'http://strahinja.org' }
            ],
            title: this.title,
            description: this.description,
        };
    },
    data()
    {
        return {
            image: 'http://strahinja.org/img/preview-home-strahinja-org.png',
            imageAlt: 'Иницијали СР и текст //strahinja.org',
            messages: {
                0: '',
                200: 'Успешно',
                404: 'Није пронађено',
                410: 'Уклоњено',
            },
            messageDescriptions: {
                0: '',
                404: 'Страница тренутно није доступна или је'
                    + ' УРЛ који сте унели погрешан. Проверите'
                    + ' УРЛ или покушајте поново касније.',
                410: 'Ова страница је премештена или уклоњена.',
            },
            parentUrl: '/',
        };
    },
    computed: {
        code()
        {
            return getProp(this, '$route.params.code') || 0;
        },
        url()
        {
            return getProp(this, '$route.path') || '';
        },
        title()
        {
            return `Код ${this.code}`;
        },
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
};
</script>

<style scoped></style>
