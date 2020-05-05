<template lang="pug">
    subpage(:splash="true",
    :source-url="true",
    :source-url-light="true")
        template(#header)
            h1.display-1 Портфолио
        v-progress-linear.my-5(v-if="portfolioLoading",
        indeterminate=true,
        :active="portfolioLoading")
        template(#outside-content)
            fancy-grid(:items="portfolio")
</template>

<script>
import Subpage from '~/components/Subpage';
import FancyGrid from '~/components/FancyGrid';

export default {
    name: 'Portfolio',
    components: { Subpage, FancyGrid },
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
            return this && this.$store && this.$store.getters ?
                this.$store.getters['loading/isLoading']('portfolio') :
                true;
        },
    },
    async asyncData({ store })
    {
        await store.dispatch('portfolio/loadItems');
        return {
            portfolio: store.getters['portfolio/list'],
        };
    },
};
</script>

