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
                            :to="parentUrl"
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
                        {{ parentName }}
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
                    :active="portfolioLoading" />

                <v-container class="px-0 mx-0" fluid>
                    <v-row
                        :class="{'breakout-row': $breakpoint.is.smOnly}">
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
import PortfolioItem from '~/components/PortfolioItem';

export default {
    name: 'Portfolio',
    components: { PortfolioItem },
    computed:
    {
        portfolio()
        {
            if (this && this.$store)
            {
                return this.$store.state.portfolio.list;
            }
            return [];
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
        },
        portfolioLoading()
        {
            return this && this.$store && this.$store.getters ?
                this.$store.getters['loading/isLoading']('portfolio') :
                true;
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
    fetch({ store })
    {
        store.dispatch('portfolio/loadPortfolio');
    },
    created()
    {
        this.$store.dispatch('portfolio/loadPortfolio');
    },
};
</script>

<style lang="sass" scoped>
</style>
