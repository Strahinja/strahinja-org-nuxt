<template lang="pug">
    subpage(splash,
    source-url,
    source-url-light)
        template(#header)
            h1.display-1 Портфолио
        v-progress-linear.my-5(v-if="portfolioLoading",
        indeterminate,
        :active="portfolioLoading")
        template(#outside-content)
            fancy-grid(:items="portfolio")
</template>

<script>
//import Subpage from '~/components/Subpage';
//import FancyGrid from '~/components/FancyGrid';

export default {
    name: 'Portfolio',
    //components: { Subpage, FancyGrid },
    data()
    {
        return {
            portfolio: [],
        };
    },
    computed:
    {
        portfolioLoading()
        {
            return this && this.$store && this.$store.getters
                ? this.$store.getters['loading/isLoading']('portfolio')
                : true;
        },
    },
    async asyncData({ store })
    {
        await store.dispatch('portfolio/loadItems',
                             null, { root: true });
        return {
            portfolio: store.getters['portfolio/list'],
        };
    },
};
</script>

