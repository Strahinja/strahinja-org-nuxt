<template>
    <v-container fluid>
        <v-row
            class="mt-3 mb-7"
            no-gutters
            wrap>
            <v-col
                v-if="showBackButton"
                :sm="1"
                align="center"
                class="text-center hidden-xs-only"
                style="min-width: 60px;">
                <v-tooltip
                    v-if="showBackButton"
                    class="hidden-xs-only"
                    bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-if="showBackButton"
                            fab depressed dark small
                            :to="'/'"
                            color="secondary"
                            class="hidden-xs-only text-center align-center mr-3
                               mt-1"
                            v-on="on">
                            <v-icon dark class="align-center">
                                mdi-arrow-left
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Назад на почетну</span>
                </v-tooltip>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <h3 class="display-1">
                    Код {{ code }}: {{ messages[code] }}
                </h3>
                <p>{{ messageDescriptions[code] }}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
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
                { hid: 'og:image:alt', name: 'og:image:alt', property: 'og:image:alt', content: this.imageAlt },
                { hid: 'twitter:url', name: 'twitter:url', content: this.url },
                { hid: 'twitter:title', name: 'twitter:title', content: this.title },
                { hid: 'twitter:description', name: 'twitter:description',
                    content: this.messageDescriptions[this.code] },
                { hid: 'twitter:image', name: 'twitter:image', content:
                    this.image},
                { hid: 'name', name: 'name', itemprop: 'name', content: this.title },
                { hid: 'description', name: 'description', itemprop: 'description', content: this.description },
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
            title: 'Грешка',
            messages: {
                0: '',
                200: 'Успешно',
                401: 'Уклоњено',
                404: 'Није пронађено'
            },
            messageDescriptions: {
                0: '',
                401: 'Ова страница је премештена или уклоњена.',
                404: 'Страница тренутно није доступна или је'
                    + ' УРЛ који сте унели погрешан. Проверите'
                    + ' УРЛ или покушајте поново касније.'
            }
        };
    },
    computed: {
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
    async asyncData({ /*app,*/ route/*, store, error */})
    {
        return {
            url: route.path,
            code: route.params.code,
            title: 'Код ' + route.params.code,
        };
    },
};
</script>

<style scoped></style>
