<template>
    <v-container fluid>
        <v-row
            class="mt-3 mb-7"
            no-gutters>
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
                            :to="$store.state.pages.list[$store.state.pages.pageIndex].parentUrl"
                            color="secondary"
                            class="hidden-xs-only text-center align-center mr-3
                               mt-1"
                            v-on="on">
                            <v-icon dark class="align-center">
                                mdi-arrow-left
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Назад на
                        {{
                            $store.state.pages.list[
                                $store.state.pages.pageIndex
                            ].parentName
                        }}
                    </span>
                </v-tooltip>
            </v-col>
            <v-col
                :cols="12"
                :sm="10">
                <h3 class="display-1">
                    Портфолио
                </h3>

                <v-progress-linear
                    indeterminate
                    class="my-5"
                    :active="loading" />

                <v-container class="px-0 mx-0" fluid>
                    <v-row
                        :class="{'breakout-row': $breakpoint.is.smAndDown}">
                        <v-col
                            v-for="(item, itemIndex) in portfolio"
                            :key="itemIndex"
                            :cols="12" :sm="6" :md="4" class="mb-2">
                            <portfolio-item :item="item" :item-index="itemIndex" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import PortfolioItem from '~/components/PortfolioItem';

export default {
    name: 'Portfolio',
    components: { PortfolioItem },
    middleware ({store})
    {
        store.commit('pages/setPageIndex', { newIndex:
            store.state.pages.routeIds.PAGE_PORTFOLIO });
    },
    head()
    {
        let idx = this.$store.state.pages.pageIndex;
        let globals = {
            title: this.$store.state.pages.list[idx].title,
            description: this.$store.state.pages.list[idx].text,
            url: 'http://strahinja.org' + this.$store.state.pages.list[idx].url.path,
            image: this.$store.state.pages.list[idx].image,
            imageAlt: this.$store.state.pages.list[idx].imageAlt,
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
    data()
    {
        return {
            pageIndex: this.$store.state.pages.routeIds.PAGE_PORTFOLIO,
            apiPortfolio: process.env.VUE_APP_API_PATH + '/portfolio?c=12',
            portfolio: [],
            loading: false,
        };
    },
    computed: {
        showBackButton()
        {
            return this.$breakpoint.is.smAndUp;
        }
    },
    created()
    {
        // console.log('created: calling this.getPortfolio()');
        this.getPortfolio();
    },
    methods: {
        getPortfolio()
        {
            this.loading = true;
            axios
                .get(this.apiPortfolio)
                .then(data =>
                {
                    this.loading = false;
                    if (data.data)
                    {
                        if (data.data.data)
                        {
                            if (data.data.code === 200)
                            {
                                this.portfolio = data.data.data;
                            }
                        }
                    }
                })
                .catch(data =>
                {
                    console.log('error: data = ', data);
                    this.loading = false;
                });
        }
    }
};
</script>

<style lang="sass" scoped>
</style>
