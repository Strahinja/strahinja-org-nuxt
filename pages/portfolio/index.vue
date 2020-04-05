<template lang="pug">
    subpage(:source-url="true")
        h1.display-1 Портфолио

        v-progress-linear.my-5(indeterminate=true,
        :active="portfolioLoading")

        v-container.px-0.mx-0(fluid=true)
            v-row(:class="{'breakout-row': $breakpoint.is.smOnly}")
                v-col.mb-2(v-for="(item, itemIndex) in portfolio",
                :key="itemIndex"
                :cols="12",
                :sm="6",
                :md="4")
                    portfolio-item(:item="item",
                    :item-index="itemIndex")
</template>

<script>
import Subpage from '~/components/Subpage';
import PortfolioItem from '~/components/PortfolioItem';

export default {
    name: 'Portfolio',
    components: { PortfolioItem, Subpage },
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
        portfolioLoading()
        {
            return this && this.$store && this.$store.getters ?
                this.$store.getters['loading/isLoading']('portfolio') :
                true;
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

