<template lang="pug">
    subpage(:source-url="true")
        h1.display-1 Портфолио

        v-progress-linear.my-5(indeterminate=true,
        :active="portfolioLoading")

        v-container
            portfolio-grid(:items="portfolio")
</template>

<script>
import Subpage from '~/components/Subpage';
import PortfolioGrid from '~/components/PortfolioGrid';

export default {
    name: 'Portfolio',
    components: { Subpage, PortfolioGrid },
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

