<template lang="pug">
    div
        splash(height="8rem",
        :bg-color="splashBgColor",
        fg-color="#000",
        align="left",
        :vcentered="false")
            subpage(:source-url="true",
            :source-url-light="true")
                template(#header)
                    h1.display-1 Портфолио

                v-progress-linear.my-5(v-if="portfolioLoading",
                indeterminate=true,
                :active="portfolioLoading")

        v-container.py-0.col-12.col-lg-10.grid-container(fluid,
        :class=`{
            sm: $breakpoint.is.smAndDown,
        }`)
            portfolio-grid(:items="portfolio")
</template>

<script>
import Splash from '~/components/Splash';
import Subpage from '~/components/Subpage';
import PortfolioGrid from '~/components/PortfolioGrid';

export default {
    name: 'Portfolio',
    components: { Splash, Subpage, PortfolioGrid },
    computed:
    {
        portfolio()
        {
            if (this && this.$store)
            {
                return this.$store.getters['portfolio/list'];
            }
            return [];
        },
        portfolioLoading()
        {
            return this && this.$store && this.$store.getters ?
                this.$store.getters['loading/isLoading']('portfolio') :
                true;
        },
        splashBgColor()
        {
            if (this && this.$store && this.$vuetify && this.$vuetify.theme
                && this.$vuetify.theme.themes
                && this.$vuetify.theme.themes[this.$store.getters['pages/theme']]
                && this.$vuetify.theme.themes[this.$store.getters['pages/theme'].secondary])
            {
                return this.$vuetify.theme.themes[this.$store.getters['pages/theme']].secondary.lighten1;
            }
            return '#fff';
        }
    },
    fetch({ store })
    {
        store.dispatch('portfolio/loadItems');
    },
    created()
    {
        this.$store.dispatch('portfolio/loadItems');
    },
};
</script>

<style lang="sass" scoped>
.grid-container
    margin-top: -3rem

.grid-container.sm
    margin-top: 0
    padding: 0
</style>
